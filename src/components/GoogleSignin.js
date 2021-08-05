import { useGoogleLogin } from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { IconContext } from "react-icons";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { AUTH_SET } from "../actions";
import { useLocation, useHistory } from "react-router";
import errorResponseHandler from "../utils/errorResponseHandler";
import { useContext } from "react";
import AlertContext from "../contexts/AlertContext";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function GoogleSignin() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { showAlert } = useContext(AlertContext);
  const { from } = location.state || { from: { pathname: "/" } };

  const onSuccess = async (res) => {
    //TODO: LOADING STATE
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
        const { ...data } = res.data;
        dispatch({
          type: AUTH_SET,
          payload: { is_auth: true, ...data },
        });
        history.replace(from);
      })
      .catch(({ response }) => {
        errorResponseHandler(response, showAlert);
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
      className={`text-blue-600 bg-white hover:bg-gray-300 active:bg-gray-100
      dark:text-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:active:bg-gray-900 transition duration-300
      w-full border-0 py-2 px-8 shadow-lg focus:outline-none font-medium rounded text-xl relative`}
    >
      <IconContext.Provider value={{ className: `w-8 h-8 left-4 absolute` }}>
        <FcGoogle />
      </IconContext.Provider>
      <span>Sign In</span>
    </button>
  );
}

export default GoogleSignin;
