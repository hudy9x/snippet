import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../libs/firebase";

const COLLECTION_NAME = "users";

export interface IUser {
  displayName: string;
  email: string;
  uid: string;
  photoURL: string;
}

export const getUser = async (uid: string): Promise<IUser | null> => {
  const docRef = doc(db, COLLECTION_NAME, uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    return docSnap.data() as IUser;
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
    });
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error();
  }
};
