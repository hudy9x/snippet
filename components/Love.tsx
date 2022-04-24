import React, { useEffect, useState } from "react";
import { HiHeart } from "react-icons/hi";
import { TiHeartFullOutline } from "react-icons/ti";
import { useAuth } from "../hooks/useAuth";
import { getLoveStatusByUser, loveIt } from "../services/love";

interface ILoveProps {
  id: string;
  amount: number;
}

function Love({ id, amount }: ILoveProps) {
  const [love, setLove] = useState(false);
  const [counter, setCounter] = useState(amount);
  const { uid } = useAuth();

  const onClick = () => {
    if (!id || !uid) return;

    loveIt(id, uid);
    setLove(!love);
    setCounter(counter + (love ? -1 : 1));
    console.log(id, uid);
  };

  useEffect(() => {
    getLoveStatusByUser(id, uid).then((value) => {
      console.log(value);
      if (value === 1) {
        setLove(true);
      }
    });
  }, [id, uid]);

  return (
    <div className="flex items-center">
      <TiHeartFullOutline
        onClick={onClick}
        className={`w-5 h-5 p-0.5 text-gray-400 cursor-pointer hover:text-red-400 ${
          love ? "text-red-500" : ""
        }`}
      />
      <span className="text-xs text-gray-400">{counter}</span>
    </div>
  );
}

export default Love;
