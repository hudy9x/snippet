import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore";
import { nowTimeStamp } from "../helpers/date";
import { db } from "../libs/firebase";
import { FileData } from "./file";

const LIMIT = 25;
const COLLECTION_NAME = "snippets";
const collectionSnippet = collection(db, COLLECTION_NAME);

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

export type QueryDocSnapshotData = QueryDocumentSnapshot<DocumentData>;

export interface ReturnedSnippet {
  last: QueryDocSnapshotData | null;
  snippets: ISnippet[];
}

export const getSnippets = async (): Promise<ISnippet[]> => {
  try {
    const q = query(
      collectionSnippet,
      orderBy("createdAt", "desc"),
      limit(LIMIT)
    );
    const querySnapshot = await getDocs(q);
    const snippets: ISnippet[] = [];

    if (querySnapshot.empty) {
      return [];
    }

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

export const getMoreSnippets = async (
  last: QueryDocSnapshotData
): Promise<ReturnedSnippet> => {
  try {
    const q = query(
      collectionSnippet,
      orderBy("createdAt", "desc"),
      startAfter(last),
      limit(LIMIT)
    );

    const querySnapshot = await getDocs(q);
    const snippets: ISnippet[] = [];

    if (querySnapshot.empty) {
      return { last: null, snippets: [] };
    }

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

    return {
      last: querySnapshot.docs[querySnapshot.docs.length - 1],
      snippets,
    };
  } catch (error) {
    console.log("getMoreSnippets Erorr:", error);
    return { last: null, snippets: [] };
  }
};

export const getLastDocumentSnapshot = async () => {
  try {
    const q = query(
      collectionSnippet,
      orderBy("createdAt", "desc"),
      limit(LIMIT)
    );

    const documentSnapshots = await getDocs(q);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    return lastVisible;
  } catch (error) {
    console.log(error);
    return null;
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
    console.error(e);
    throw new Error();
  }
};
