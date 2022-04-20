import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../libs/firebase";

export type FileData = {
  url: string;
  fullPath: string;
  width: number;
  height: number;
};

export const upload = (
  path: string,
  file: File,
  width: number,
  height: number
): Promise<FileData> => {
  return new Promise<FileData>((resolve, reject) => {
    const storageRef = ref(storage, `${path}/${file.name}`);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        getDownloadURL(storageRef)
          .then((url) => {
            const metadata = snapshot.metadata;
            resolve({
              url,
              fullPath: metadata.fullPath,
              width,
              height,
            });
          })
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
};
