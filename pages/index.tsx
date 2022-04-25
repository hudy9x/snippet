import type { GetStaticProps } from "next";
import { getSnippets, ISnippet } from "../services/snippet";
import type { ReactElement } from "react";
import Layout from "../containers/Layout";
import ViewTracker from "../components/ViewTracker";
import SnippetList from "../containers/Snippets";

interface IHomeProps {
  snippets: ISnippet[];
}

export default function Home({ snippets }: IHomeProps) {
  return (
    <div
      style={{ maxWidth: 500 }}
      className="m-auto flex flex-col gap-6 px-4 pb-10 pt-20"
    >
      <SnippetList datas={snippets} />
      <ViewTracker />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const snippets = await getSnippets();
  return {
    props: {
      snippets,
    },
    revalidate: 60,
  };
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
