import React from "react";
import { HiEye } from "react-icons/hi";
import Avatar from "../../components/Avatar";
import Carousel from "../../components/Carousel";
import Love from "../../components/Love";
import { ISnippet } from "../../services/snippet";

interface ISnippetItemProps {
  data: ISnippet;
}

export default function SnippetItem({ data }: ISnippetItemProps) {
  const snippet = data;
  return (
    <div
      data-sid={snippet.id}
      key={snippet.id}
      className="relative snippet-item"
    >
      <Carousel urls={snippet.images} />
      <div className="flex items-center justify-between mt-3">
        <Avatar uid={snippet.uid} />
        <div className="flex items-center gap-3">
          <Love id={snippet.id || ""} amount={snippet.love || 0} />
          <div className="flex items-center gap-1">
            <HiEye className="w-5 h-5 p-0.5 text-gray-400" />
            <span className="text-xs text-gray-400">{snippet.view}</span>
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
    </div>
  );
}
