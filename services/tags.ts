import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  writeBatch,
  getDocs,
  query,
  collection,
} from "firebase/firestore";
import { db } from "../libs/firebase";

const COLLECTION_NAME = "tags";

export interface ITag {
  id?: string;
  title: string;
  color: string;
  background: string;
}

export const getTags = async (): Promise<ITag[]> => {
  try {
    const d = query(collection(db, COLLECTION_NAME));

    const tagDoc = await getDocs(d);

    if (tagDoc.empty) {
      return [];
    }

    return tagDoc.docs.map((doc) => {
      const tagData = doc.data() as ITag;
      return {
        id: doc.id,
        title: tagData.title,
        color: tagData.color,
        background: tagData.background,
      };
    });
  } catch (error) {
    return [];
  }
};
