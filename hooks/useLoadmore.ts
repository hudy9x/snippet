import { useEffect, useRef, useState } from "react";
import {
  getLastDocumentSnapshot,
  getMoreSnippets,
  ISnippet,
  QueryDocSnapshotData,
} from "../services/snippet";

export const useLoadmore = () => {
  const [lastId, setLastId] = useState<QueryDocSnapshotData | null>(null);
  const [datas, setDatas] = useState<ISnippet[]>([]);
  const [end, setEnd] = useState(false);
  const timeout = useRef(0);

  useEffect(() => {
    getLastDocumentSnapshot().then((last) => {
      setLastId(last);
    });
  }, []);

  const loadMore = () => {
    if (!lastId) return;

    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      getMoreSnippets(lastId).then(({ last, snippets }) => {
        const len = snippets.length;
        if (!len) {
          setEnd(true);
          return;
        }
        console.log(snippets);
        setLastId(last);
        setDatas((oldDatas) => [...oldDatas, ...snippets]);
      });
    }, 250) as unknown as number;
  };

  return {
    end,
    loadMore,
    datas,
  };
};
