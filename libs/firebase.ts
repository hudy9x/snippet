import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1122Lx1oA0am9O6pSLc0skAM4ArWDN10",
  authDomain: "snippet-377eb.firebaseapp.com",
  projectId: "snippet-377eb",
  storageBucket: "snippet-377eb.appspot.com",
  messagingSenderId: "409128032305",
  appId: "1:409128032305:web:453ae73d34e335eb6a9d10",
  measurementId: "G-V3PTTN15WP",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
