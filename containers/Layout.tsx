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
          <div className="uppercase text-xs">
            <UserInfo />
            
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}

export default Layout;
