import { doc, getDoc, setDoc } from "firebase/firestore";
import { getCache, setCache } from "../libs/cache";
import { db } from "../libs/firebase";

const COLLECTION_NAME = "users";

export enum IUserRole {
  AUDIENCE = "AUDIENCE",
  MODERATOR = "MODERATOR",
  COMPOSER = "COMPOSER",
  ADMIN = "ADMIN",
}
export interface IUser {
  displayName: string;
  email: string;
  uid: string;
  photoURL: string;
  role?: IUserRole;
}

export const getUser = async (uid: string): Promise<IUser | null> => {
  const CACHE_KEY = `${COLLECTION_NAME}:${uid}`;
  const cachedUser = getCache(CACHE_KEY);

  if (cachedUser) {
    let parsedData = JSON.parse(cachedUser);
    return typeof parsedData === "string" ? JSON.parse(parsedData) : parsedData;
  }

  const docRef = doc(db, COLLECTION_NAME, uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const useData = docSnap.data() as IUser;
    setCache(CACHE_KEY, JSON.stringify(useData));
    return useData;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return null;
  }
};

export const addUser = async ({ uid, displayName, email, photoURL }: IUser) => {
  try {
    const docRef = await setDoc(doc(db, COLLECTION_NAME, uid), {
      uid,
      displayName,
      email,
      photoURL,
      role: IUserRole.AUDIENCE,
    });
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error();
  }
};
