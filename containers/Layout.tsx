import Link from "next/link";
import React from "react";
import UserInfo from "../components/UserInfo";
import { signOutNow } from "../services/sign";
import ForceSignin from "./ForceSignin";

interface ILayoutProp {
  children: JSX.Element | JSX.Element[];
}

function Layout({ children }: ILayoutProp) {
  return (
    <div className="bg-gray-50">
      <header className="bg-white shadow-md">
        <div
          style={{ maxWidth: 500 }}
          className="m-auto px-4 flex items-center justify-between"
        >
          <h2 className="logo font-semibold py-4">
            <Link href={"/"}>Snippet.dev</Link>
          </h2>
          <div className="text-md relative group py-4">
            <UserInfo />
            <div className="text-xs uppercase absolute group-hover:block hidden w-40 top-12 right-0 z-10 rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5">
              <div
                onClick={() => {
                  signOutNow();
                }}
                className="whitespace-nowrap px-4 py-2 cursor-pointer hover:bg-gray-50 rounded-md"
              >
                <span>Log out</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      {children}
      <ForceSignin />
    </div>
  );
}

export default Layout;
