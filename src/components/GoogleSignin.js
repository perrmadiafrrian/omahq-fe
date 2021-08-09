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
import LoadingContext from "../contexts/LoadingContext";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function GoogleSignin() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { showAlert } = useContext(AlertContext);
  const { loadingProcess, loadingDone } = useContext(LoadingContext);
  const { from } = location.state || { from: { pathname: "/" } };
  const LOADING_GOOGLE_SIGNIN = "LOADING_GOOGLE_SIGNIN";

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
    loadingDone(LOADING_GOOGLE_SIGNIN);
  };

  const onFailure = (res) => {
    loadingDone(LOADING_GOOGLE_SIGNIN);
    alert(JSON.stringify(res));
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: CLIENT_ID,
    isSignedIn: true,
    accessType: "offline",
  });

  const handleAction = () => {
    loadingProcess(LOADING_GOOGLE_SIGNIN);
    signIn();
  };

  return (
    <button
      onClick={handleAction}
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
