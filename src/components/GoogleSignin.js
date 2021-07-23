import { useGoogleLogin } from "react-google-login";
import googleIcon from "../icons/google.svg";
import axiosInstance from "../utils/axiosInstance";
// import refreshTokenSetup from "../utils/refreshTokenHandler";

const CLIENT_ID = `2615891792-9iab23mglp6sch2dn81p3ugmfvjgfakc.apps.googleusercontent.com`;

function GoogleSignin() {
  console.log(axiosInstance);

  const onSuccess = async (res) => {
    console.log(res.profileObj);
    await axiosInstance
      .post("/auth/google", {
        id_token: "abc",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        // alert(err.response.data);
      });
  };

  const onFailure = (res) => {
    console.log(res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: CLIENT_ID,
    isSignedIn: true,
    accessType: "offline",
  });

  return (
    <button
      onClick={signIn}
      className="w-full text-blue-600 bg-white border-0 py-2 px-8 shadow-lg hover:bg-gray-300 active:bg-gray-100 focus:outline-none font-medium rounded text-xl relative"
    >
      <img src={googleIcon} alt="Google Icon" className="w-8 left-4 absolute" />
      <span>Sign In</span>
    </button>
  );
}

export default GoogleSignin;
