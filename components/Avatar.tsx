import React, { useEffect, useState } from "react";
import { getUser, IUser } from "../services/user";

interface IAvatar {
  uid: string;
}

export default function Avatar({ uid }: IAvatar) {
  const [info, setInfo] = useState<IUser>({
    displayName: "",
    email: "",
    photoURL: "",
    uid: "",
  });
  useEffect(() => {
    getUser(uid).then((res) => {
      if (!res) return;
      setInfo({
        displayName: res.displayName,
        email: res.email,
        photoURL: res.photoURL,
        uid: res.uid,
      });
    });
  }, []);

  return (
    <div className="flex items-center">
      <img
        className="inline-block h-8 w-8 rounded-full"
        src={info.photoURL}
        alt=""
      />
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
          {info.displayName}
        </p>
        {/* <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
          View profile
        </p> */}
      </div>
    </div>
  );
}