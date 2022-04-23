import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getCache, setCache } from "../libs/cache";
import { db } from "../libs/firebase";

const COLLECTION_NAME = "loves";

export const getLoveStatusByUser = async (snippetId: string, uid: string) => {
  try {
    const key = `${snippetId}:${uid}`;
    const d = doc(db, COLLECTION_NAME, key);

    const userDoc = await getDoc(d);
    if (!userDoc.exists()) {
      return 0;
    }

    return userDoc.data().value;
  } catch (error) {
    return 0;
  }
};

export const loveIt = async (snippetId: string, uid: string) => {
  try {
    const key = `${snippetId}:${uid}`;
    const d = doc(db, COLLECTION_NAME, key);

    const returnedDoc = await getDoc(d);

    if (returnedDoc.exists()) {
      const data = returnedDoc.data();
      updateDoc(returnedDoc.ref, {
        value: data.value === 1 ? -1 : 1, // must be -1 or 1, not 0
        done: false,
      });
      return;
    }

    const docRef = await setDoc(d, {
      value: 1,
      uid,
      snippetId,
      done: false,
    });

    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error();
  }
};
