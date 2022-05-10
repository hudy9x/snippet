import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ITag } from "../../services/tags";

interface ISidebarProps {
  tags: ITag[];
}

export default function Sidebar({ tags }: ISidebarProps) {
  const { query } = useRouter();
  console.log("router", query);
  return (
    <div className="sidebar">
      <h2 className="mb-4 text-sm  text-gray-400">
        <span className="mr-1">📚</span> Phân loại công nghệ
      </h2>
      <div className="flex gap-2 flex-wrap ">
        {tags.map((tag) => {
          return (
            <Link key={tag.id} href={`/tag/${tag.title}`}>
              <span className="cursor-pointer border inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-white text-gray-800 hover:bg-gray-100">
                # {tag.title}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="text-gray-400 text-xs mt-8">
        <ul className="flex gap-2 mb-3">
          <li className="whitespace-nowrap flex gap-2">
            <span>👻</span>Về tôi
          </li>
          <li className="whitespace-nowrap flex gap-2">
            <span>🎙</span>Liên hệ
          </li>
          <li className="whitespace-nowrap flex gap-2">
            <span>📝</span>Đăng kí
          </li>
        </ul>
      </div>
      <p className="text-gray-400 text-xs mt-5">
        ©️ 2022 Snippet.dev by Komaster
      </p>
    </div>
  );
}
