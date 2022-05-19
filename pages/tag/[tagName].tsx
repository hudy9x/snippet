import type { GetStaticPaths, GetStaticProps } from "next";
import { getSnippetsByTag, ISnippet } from "../../services/snippet";
import { ReactElement } from "react";
import Layout from "../../containers/Layout";
import ViewTracker from "../../components/ViewTracker";
import SnippetList from "../../containers/Snippets";
import Sidebar from "../../containers/Sidebar";
import { getTags, ITag } from "../../services/tags";

interface ITagPageProps {
  snippets: ISnippet[];
  tags: ITag[];
}

export default function TagPage({ snippets = [], tags = [] }: ITagPageProps) {
  return (
    <>
      <div className="flex gap-4 pt-20 m-auto max-width">
        <div className="max-content-width flex-shrink-0 flex flex-col gap-6 px-4 pb-10">
          <SnippetList datas={snippets} />
        </div>
        <Sidebar tags={tags} />
      </div>
      <ViewTracker />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await getTags();
  const params = tags.map((tag) => ({ params: { tagName: tag.title } }));
  return {
    paths: params,
    fallback: true, // false or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const { tagName = "" } = params || {};

  const [snippets, tags] = await Promise.all([
    getSnippetsByTag(tagName as string),
    getTags(),
  ]);

  return {
    props: {
      snippets,
      tags,
    },
    revalidate: 60,
  };
};

TagPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
