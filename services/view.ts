import { doc, getDoc, setDoc } from "firebase/firestore";
import { getCache, setCache } from "../libs/cache";
import { db } from "../libs/firebase";

const COLLECTION_NAME = "views";

export const setView = async (snippetId: string, uid: string) => {
  try {
    const key = `${snippetId}:${uid}`;
    const d = doc(db, COLLECTION_NAME, key);

    if (getCache(key)) {
      return;
    }

    const isViewed = await getDoc(d);

    if (isViewed) {
      setCache(key, "1");
      return;
    }

    const docRef = await setDoc(d, {
      value: 1,
      uid,
      snippetId,
      // done: false
    });

    setCache(key, "1");

    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error();
  }
};
