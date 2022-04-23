import { Timestamp } from "firebase-admin/firestore";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { nowTimeStamp } from "../helpers/date";
import { db } from "../libs/firebase";
import { FileData } from "./file";

const collectionSnippet = collection(db, "snippets");

export interface ISnippet {
  id?: string;
  title: string;
  tags: string[];
  uid: string;
  images: FileData[];
  love?: number;
  view?: number;
  createdAt?: Timestamp;
}

export const getSnippets = async (): Promise<ISnippet[]> => {
  try {
    const q = query(collectionSnippet, orderBy("createdAt", "desc"), limit(25));
    const querySnapshot = await getDocs(q);
    const snippets: ISnippet[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      snippets.push({
        id: doc.id,
        title: data.title,
        images: data.images,
        tags: data.tags,
        uid: data.uid,
        view: data.view,
        love: data.love || 0,
      });
    });

    return snippets;
  } catch (error) {
    return [];
  }
};

export const addSnippet = async ({ title, tags, uid, images }: ISnippet) => {
  try {
    const docRef = await addDoc(collectionSnippet, {
      title,
      tags: tags,
      uid,
      images,
      view: 0,
      like: 0,
      createdAt: nowTimeStamp(),
    });
    return docRef;
  } catch (e) {
    throw new Error();
  }
};
