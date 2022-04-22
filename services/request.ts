import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../libs/firebase";
import { FileData } from "./file";

const collectionRequest = collection(db, "request");

export enum ERequestType {
  PROMOTE_MODERATOR = "PROMOTE_MODERATOR",
  PROMOTE_COMPOSER = "PROMOTE_COMPOSER",
}
export enum ERequestStatus {
  WAIT = "WAIT",
  APPROVED = "APPROVED",
  CANCEL = "CANCEL",
  PENDING = "PENDING",
}

export interface IRequest {
  createdBy: string;
  title: string;
  type: ERequestType;
  status: ERequestStatus;
}

export const sendedPromoteComposerAlready = async (uid: string) => {
  console.log("called");
  const q = query(
    collectionRequest,
    where("createdBy", "==", uid),
    where("type", "==", ERequestType.PROMOTE_COMPOSER),
    where("status", "==", ERequestStatus.WAIT),
    limit(1)
  );

  const request = await getDocs(q);
  if (request.empty) {
    return false;
  }

  return true;

  console.log(request.docs);
};

export const addRequest = async ({
  createdBy,
  title,
  type,
  status,
}: IRequest) => {
  try {
    const docRef = await addDoc(collectionRequest, {
      createdBy,
      title,
      type,
      status,
    });
    return docRef;
  } catch (e) {
    throw new Error();
  }
};
