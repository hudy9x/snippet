import Link from "next/link";
import React from "react";
import { HiOutlinePlus } from "react-icons/hi";
import ForceSignin from "./ForceSignin";
import UserNav from "./UserNav";

interface ILayoutProp {
  children: JSX.Element | JSX.Element[];
}

function Layout({ children }: ILayoutProp) {
  return (
    <div className="bg-gray-50">
      <header className="bg-white shadow-md fixed w-full z-10">
        <div className="max-width m-auto flex items-center justify-between">
          <div className="max-content-width px-4 flex-shrink-0 flex justify-between gap-6 items-center">
            <h2 className="logo font-semibold py-4">
              <Link href={"/"}>Snippet.dev</Link>
            </h2>
            <div id="search">
              <input
                type="text"
                name="email"
                id="email"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Tìm kiếm ..."
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href={"/admin/snippet"}>
              <button className="inline-flex items-center p-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <HiOutlinePlus className="text-gray-600 h-4 w-4" />
              </button>
            </Link>
            <UserNav />
          </div>
        </div>
      </header>
      {children}
      <ForceSignin />
    </div>
  );
}

export default Layout;
