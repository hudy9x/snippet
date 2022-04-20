import type { GetStaticProps, NextPage } from "next";
import Avatar from "../components/Avatar";
import Carousel from "../components/Carousel";
import { HiEye, HiHeart } from "react-icons/hi";
import { getSnippets, ISnippet } from "../services/snippet";

interface IHomeProps {
  snippets: ISnippet[];
}

const Home: NextPage<IHomeProps> = ({ snippets }) => {
  console.log(snippets);
  return (
    <div className="bg-gray-50 py-10">
      <div
        style={{ maxWidth: 500 }}
        className="m-auto flex flex-col gap-4 px-4"
      >
        {snippets.map((snippet) => {
          return (
            <div key={snippet.id} className="flex flex-col gap-3">
              <Carousel urls={snippet.images.map((img) => img.url)} />
              <div className="flex items-center justify-between">
                <Avatar uid={snippet.uid} />
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <HiHeart className="w-5 h-5 text-gray-400" />
                    <span className="text-xs">200</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <HiEye className="w-5 h-5 text-gray-400" />
                    <span className="text-xs">23</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const snippets = await getSnippets();
  return {
    props: {
      snippets,
    },
  };
};

export default Home;
