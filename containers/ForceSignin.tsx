import { User } from "firebase/auth";
import { signInGoogle } from "../services/sign";
import { addUser, getUser } from "../services/user";

function ForceSignin() {
  const signIn = () => {
    signInGoogle().then(({ displayName, email, uid, photoURL }: User) => {
      getUser(uid).then((userInfo) => {
        if (userInfo) return;

        // ONLY UPDATE IF USER INFOR NOT EXIST
        addUser({
          displayName: displayName || "",
          email: email || "",
          photoURL: photoURL || "",
          uid,
        });
      });
      alert("Signed in");
    });
  };

  return (
    <div className="fixed top-0 left-0 bg-gray-50 z-20 h-screen w-screen flex items-center justify-center">
      <img src="./sapiens.svg" />
      <div className="rounded-lg shadow-lg bg-white w-72 md:w-96 py-10 md:py-12 px-8 md:px-14 flex flex-col justify-center text-center gap-4">
        <h2 className="font-bold text-xl md:text-2xl pb-2 md:pb-4">
          Đăng nhập để lướt
        </h2>
        <p className="text-gray-500">
          Nếu bạn hứng thú với việc chia sẻ những đoạn code ngắn thì hãy tham
          gia cùng tôi nhé 🍻
        </p>

        <div className="relative flex items-center justify-center">
          <div className="flex items-center h-5">
            <input
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
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}

export default ForceSignin;
