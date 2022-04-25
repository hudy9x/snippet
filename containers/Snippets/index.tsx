import React from "react";
import { useLoadmore } from "../../hooks/useLoadmore";
import { ISnippet } from "../../services/snippet";
import SnippetItem from "./SnippetItem";

interface ISnippetProps {
  datas: ISnippet[];
}

function SnippetList({ datas }: ISnippetProps) {
  const { loadMore, end, datas: newSnippets } = useLoadmore();

  return (
    <>
      {datas.map((snippet) => {
        return <SnippetItem data={snippet} key={snippet.id} />;
      })}

      {newSnippets.map((snippet) => {
        return <SnippetItem data={snippet} key={snippet.id} />;
      })}

      {end ? null : (
        <button
          onClick={loadMore}
          type="button"
          className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span>Load more</span>
        </button>
      )}
    </>
  );
}

export default SnippetList;
