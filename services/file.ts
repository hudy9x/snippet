import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../libs/firebase";

export type FileData = {
  url: string;
  fullPath: string;
};

export const upload = (path: string, file: File): Promise<FileData> => {
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
            });
          })
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
};
