import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ISnippet } from "../services/snippet";
import Img from "./Img";

interface IViewDetail {
  data: ISnippet;
  children: JSX.Element | JSX.Element[];
}

type IViewModal = Omit<IViewDetail, "children">;

const ViewModal = ({ data }: IViewModal) => {
  const images = data.images;
  const [index, setIndex] = useState(0);
  const { url, height, width } = images[index];
  const view = (
    <div className="fixed h-screen w-screen bg-gray-50 overflow-x-hidden overflow-y-auto z-10 top-0 left-0">
      <div className="w-full md:w-3/4 m-auto p-2 md:py-4 flex items-center">
        {images.map((img, index) => {
          const { url, height, width } = img;
          return (
            <div key={index} className="w-14 flex items-center">
              <Img
                className="md:rounded-md"
                src={url}
                alt={url}
                width={width}
                height={height}
                layout="intrinsic"
              />
            </div>
          );
        })}
      </div>
      <div className="w-full md:w-3/4 m-auto">
        <Img
          className="md:rounded-md"
          src={url}
          alt={url}
          width={width}
          height={height}
        />
      </div>
    </div>
  );
  return createPortal(view, document.querySelector("#root-modal") as Element);
};

function ViewDetail({ children, data }: IViewDetail) {
  const [visible, setVisible] = useState(false);
  const onView = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (!document.querySelector("#root-modal")) {
      const div = document.createElement("div");
      div.id = "root-modal";
      document.body.appendChild(div);
    }
  }, []);

  return (
    <>
      <div onClick={onView}>{children}</div>
      {visible ? <ViewModal data={data} /> : null}
    </>
  );
}

export default ViewDetail;
