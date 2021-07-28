import { useGoogleLogin } from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { IconContext } from "react-icons";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { AUTH_SET } from "../actions";
import { useLocation, useHistory } from "react-router";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

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
      <IconContext.Provider value={{ className: `w-8 h-8 left-4 absolute` }}>
        <FcGoogle />
      </IconContext.Provider>
      <span>Sign In</span>
    </button>
  );
}

export default GoogleSignin;
