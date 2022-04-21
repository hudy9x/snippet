import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../libs/firebase";

const defaultAuth = {
  checking: true,
  authen: false,
  displayName: "",
  email: "",
  uid: "",
  photoURL: "",
};

export const useAuth = () => {
  const [authen, setAuthen] = useState(defaultAuth);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthen({
          checking: false,
          authen: true,
          displayName: user.displayName || "",
          email: user.email || "",
          uid: user.uid,
          photoURL: user.photoURL || "",
        });
      } else {
        setAuthen({ ...defaultAuth, ...{ authen: false, checking: false } });
      }
    });
  }, []);

  return authen;
};
