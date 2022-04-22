import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { setView } from "../services/view";

interface IViewTracker {
  children?: JSX.Element | JSX.Element[];
}

function ViewTracker({ children }: IViewTracker) {
  const { uid } = useAuth();

  useEffect(() => {
    const markAsViewed = (snippetItem: Element) => {
      const snippetId = snippetItem.getAttribute("data-sid");

      if (snippetId && uid) {
        setView(snippetId, uid);
      } else {
        console.log('can not setting view')
      }
    };

    let id: NodeJS.Timeout;

    const mouseEventHandler = (ev: MouseEvent) => {
      const target = ev.target as HTMLElement;
      if (!target || target.nodeName === "#document") return;
      const snippetItem = target.closest(".snippet-item");
      if (!snippetItem) return;

      id && clearTimeout(id);
      id = setTimeout(() => markAsViewed(snippetItem), 50);
    };

    const scrollHandler = (ev: Event) => {
      // console.log("scrolling");
    };

    document.addEventListener("mouseover", mouseEventHandler);
    document.addEventListener("mouseenter", mouseEventHandler);
    document.addEventListener("scroll", scrollHandler);

    return () => {
      document.removeEventListener("mouseover", mouseEventHandler);
      document.removeEventListener("mouseenter", mouseEventHandler);
      document.removeEventListener("scroll", scrollHandler);
    };
  }, [uid]);

  const onMouseEnter = () => {
    console.log("onMouseEnter:", uid);
  };

  const onMouseOver = () => {
    console.log("onMouseOver:", uid);
  };

  return (
    <div onMouseEnter={onMouseEnter} onMouseOver={onMouseOver}>
      {children}
    </div>
  );
}

export default ViewTracker;
