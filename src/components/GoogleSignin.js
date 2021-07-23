import { useGoogleLogin } from "react-google-login";
import googleIcon from "../icons/google.svg";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { AUTH_SET } from "../actions";
import { useLocation, useHistory } from "react-router";
// import refreshTokenSetup from "../utils/refreshTokenHandler";

const CLIENT_ID = `2615891792-9iab23mglp6sch2dn81p3ugmfvjgfakc.apps.googleusercontent.com`;

function GoogleSignin() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { from } = location.state || { from: { pathname: "/" } };

  const onSuccess = async (res) => {
    const { email, imageUrl, name } = res.profileObj;
    await axiosInstance
      .post("/auth/google", {
        id_token: res.tokenId,
        email,
        image: imageUrl,
        name,
        username: email,
      })
      .then((res) => {
        const { status, ...data } = res.data;
        dispatch({
          type: AUTH_SET,
          payload: { is_auth: status === "success", ...data },
        });
        if (status === "success") {
          history.replace(from);
        }
      })
      .catch((err) => {
        console.log(err);
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
