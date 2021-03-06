import Link from "next/link";

import React from "react";
import { useAuth } from "../hooks/useAuth";
import Img from "./Img";

export default function UserInfo() {
  const { checking, authen, displayName, photoURL, uid } = useAuth();

  return (
    <>
      {!checking && authen ? (
        <>
          <div className="flex items-center">
            <div className="inline-block h-6 w-6">
              <Img
                className="rounded-full"
                src={photoURL}
                alt={displayName}
                width={150}
                height={150}
              />
            </div>
          </div>
        </>
      ) : null}
      {checking ? (
        <div className="flex items-center h-6 w-6 bg-gray-200 rounded-full"></div>
      ) : null}
      {!checking && !authen ? (
        <div className="inline-flex justify-center h-6 w-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full">
          A
        </div>
      ) : null}
    </>
  );
}
