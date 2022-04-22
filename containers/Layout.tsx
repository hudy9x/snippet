import Link from "next/link";
import React from "react";
import UserInfo from "../components/UserInfo";

interface ILayoutProp {
  children: JSX.Element | JSX.Element[];
}

function Layout({ children }: ILayoutProp) {
  return (
    <div className="bg-gray-50">
      <header className="bg-white shadow-md">
        <div
          style={{ maxWidth: 500 }}
          className="m-auto p-4 flex items-center justify-between"
        >
          <h2 className="logo font-semibold">
            <Link href={"/"}>Snippet.dev</Link>
          </h2>
          <div className="uppercase text-xs relative group">
            <UserInfo />
            <div className="absolute group-hover:block hidden top-5 right-0 rounded-md bg-white shadow-md">
              <div className="whitespace-nowrap px-4 py-2">
                <Link href={"/signin"}>Log out</Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}

export default Layout;
