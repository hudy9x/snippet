import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../libs/firebase";

const COLLECTION_NAME = "users";
const collectionUser = collection(db, COLLECTION_NAME);

export interface IUser {
  displayName: string;
  email: string;
  uid: string;
  photoURL: string;
}

// export const getSnippets = async (): Promise<ISnippet[]> => {
//   try {
//     const querySnapshot = await getDocs(collectionSnippet);
//     const snippets: ISnippet[] = [];
//     querySnapshot.forEach((doc) => {
//       const data = doc.data();
//       snippets.push({
//         id: doc.id,
//         title: data.title,
//         images: data.images,
//         tags: data.tags,
//         uid: data.uid,
//       });
//     });

//     return snippets;
//   } catch (error) {
//     return [];
//   }
// };

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
    console.log("Document written with ID: ", docRef);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error();
  }
};
