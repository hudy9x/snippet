import type { GetStaticProps } from "next";
import { getSnippets, ISnippet } from "../services/snippet";
import type { ReactElement } from "react";
import Layout from "../containers/Layout";
import ViewTracker from "../components/ViewTracker";
import SnippetList from "../containers/Snippets";
import Sidebar from "../containers/Sidebar";
import { getTags, ITag } from "../services/tags";

interface IHomeProps {
  snippets: ISnippet[];
  tags: ITag[];
}

export default function Home({ snippets, tags }: IHomeProps) {
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

export const getStaticProps: GetStaticProps = async (context) => {
  console.log(context)
  const snippets = await getSnippets();
  const tags = await getTags();
  
  return {
    props: {
      snippets,
      tags,
    },
    revalidate: 60,
  };
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
