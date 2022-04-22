import { User } from "firebase/auth";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  addRequest,
  ERequestStatus,
  ERequestType,
  sendedPromoteComposerAlready,
} from "../services/request";
import { signInGoogle } from "../services/sign";
import { addUser, getUser, IUser, IUserRole } from "../services/user";

function ForceSignin() {
  const [visible, setVisible] = useState(false);
  const [register, setRegister] = useState(false);
  const { authen, checking, uid } = useAuth();

  const _addRequest = async (uid: string) => {
    const isSended = await sendedPromoteComposerAlready(uid);

    setRegister(false);

    if (isSended) {
      console.log("sended promote composer request already");
      return;
    }

    addRequest({
      createdBy: uid,
      status: ERequestStatus.WAIT,
      title: "Request promoting to composer",
      type: ERequestType.PROMOTE_COMPOSER,
    });
  };

  const requestPromoteToComposer = (uid: string, userInfo: IUser | null) => {
    if (!register) return;
    if (!userInfo) {
      _addRequest(uid);
      return;
    }
    if (userInfo.role === IUserRole.COMPOSER) return;
    _addRequest(userInfo.uid);
  };

  const signIn = () => {
    signInGoogle().then(({ displayName, email, uid, photoURL }: User) => {
      getUser(uid).then((userInfo) => {
        requestPromoteToComposer(uid, userInfo);

        if (userInfo) return;

        // ONLY UPDATE IF USER INFOR NOT EXIST
        addUser({
          displayName: displayName || "",
          email: email || "",
          photoURL: photoURL || "",
          uid,
        });
      });
      // alert("Signed in");
    });
  };

  useEffect(() => {
    const cls = document.body.classList;
    if (!checking && !authen && !uid) {
      setTimeout(() => {
        cls.add("overflow-body-hidden");
        setVisible(true);
      }, 3000);
    } else {
      setVisible(false);
      cls.remove("overflow-body-hidden");
    }
  }, [authen, checking, uid]);

  return (
    <div className={`force-sign-in ${visible ? "showup" : ""}`}>
      <div className={`force-sign-in-form ${visible ? "showup" : ""}`}>
        <h2 className="font-bold text-xl md:text-2xl pb-2">
          Đăng nhập để lướt 👻
        </h2>

        <div className="w-64 m-auto">
          <Image
            src="/sapiens2.svg"
            alt="Sign in"
            width={720}
            height={640}
            layout="intrinsic"
          />
        </div>

        <p className="text-gray-500">
          Nếu hứng thú với việc share những đoạn code thì hãy tham gia cùng tôi
          nhé 🍻
        </p>

        <div className="relative flex items-center justify-center">
          <div className="flex items-center h-5">
            <input
              checked={register}
              onChange={() => setRegister(!register)}
              id="comments"
              aria-describedby="comments-description"
              name="comments"
              type="checkbox"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="comments" className="text-gray-500">
              Đăng kí làm người đăng bài
            </label>
          </div>
        </div>

        <button
          onClick={signIn}
          type="button"
          className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg
            width={20}
            height={20}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <defs>
              <path
                id="a"
                d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
              />
            </defs>
            <clipPath id="b">
              <use xlinkHref="#a" overflow="visible" />
            </clipPath>
            <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
            <path
              clipPath="url(#b)"
              fill="#EA4335"
              d="M0 11l17 13 7-6.1L48 14V0H0z"
            />
            <path
              clipPath="url(#b)"
              fill="#34A853"
              d="M0 37l30-23 7.9 1L48 0v48H0z"
            />
            <path
              clipPath="url(#b)"
              fill="#4285F4"
              d="M48 48L17 24l-4-3 35-10z"
            />
          </svg>
          <span>Đăng nhập qua Google</span>
        </button>
      </div>
    </div>
  );
}

export default ForceSignin;
