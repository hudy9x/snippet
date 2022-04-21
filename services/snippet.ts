import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../libs/firebase";
import { FileData } from "./file";

const collectionSnippet = collection(db, "snippets");

export interface ISnippet {
  id?: string;
  title: string;
  tags: string[];
  uid: string;
  images: FileData[];
  like?: number;
  view?: number;
}

export const getSnippets = async (): Promise<ISnippet[]> => {
  try {
    const querySnapshot = await getDocs(collectionSnippet);
    const snippets: ISnippet[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      snippets.push({
        id: doc.id,
        title: data.title,
        images: data.images,
        tags: data.tags,
        uid: data.uid,
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
    });
    return docRef;
  } catch (e) {
    throw new Error();
  }
};
