import Link from "next/link";
import React from "react";
import ForceSignin from "./ForceSignin";
import UserNav from "./UserNav";

interface ILayoutProp {
  children: JSX.Element | JSX.Element[];
}

function Layout({ children }: ILayoutProp) {
  return (
    <div className="bg-gray-50">
      <header className="bg-white shadow-md fixed w-full z-10">
        <div
          style={{ maxWidth: 500 }}
          className="m-auto px-4 flex items-center justify-between"
        >
          <h2 className="logo font-semibold py-4">
            <Link href={"/"}>Snippet.dev</Link>
          </h2>
          <UserNav />
        </div>
      </header>
      {children}
      <ForceSignin />
    </div>
  );
}

export default Layout;
