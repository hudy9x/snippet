import type { GetStaticProps, NextPage } from "next";
import Avatar from "../components/Avatar";
import Carousel from "../components/Carousel";
import { HiEye, HiHeart } from "react-icons/hi";
import { getSnippets, ISnippet } from "../services/snippet";
import Link from "next/link";
import type { ReactElement } from "react";
import Layout from "../containers/Layout";
import Img from "../components/Img";
import ViewTracker from "../components/ViewTracker";
import ViewDetail from "../components/ViewDetail";
interface IHomeProps {
  snippets: ISnippet[];
}
export default function Home({ snippets }: IHomeProps) {
  return (
    <div
      style={{ maxWidth: 500 }}
      className="m-auto flex flex-col gap-4 px-4 py-10"
    >
      {snippets.map((snippet) => {
        return (
          <div
            data-sid={snippet.id}
            key={snippet.id}
            className="relative snippet-item"
          >
            {/* <ViewDetail data={snippet}> */}
            <Carousel urls={snippet.images} />
            <div className="flex items-center justify-between mt-3">
              <Avatar uid={snippet.uid} />
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <HiHeart className="w-5 h-5 text-gray-400" />
                  <span className="text-xs">200</span>
                </div>
                <div className="flex items-center gap-1">
                  <HiEye className="w-5 h-5 text-gray-400" />
                  <span className="text-xs">{snippet.view}</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-14 right-3">
              {snippet.tags.map((tag) => {
                return (
                  <span className="snippet-tag" key={tag}>
                    # {tag}
                  </span>
                );
              })}
            </div>
            {/* </ViewDetail> */}
          </div>
        );
      })}
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
    revalidate: 60
  };
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
