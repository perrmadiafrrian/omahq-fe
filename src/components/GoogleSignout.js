import { useGoogleLogout } from "react-google-login";
import PersistorPurge from "../utils/PersistorPurge";
import { useLocation, useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { AUTH_INVALIDATE } from "../actions";
import { useContext } from "react";
import LoadingContext from "../contexts/LoadingContext";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GoogleSignout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { loadingProcess, loadingDone } = useContext(LoadingContext);
  const { from } = location.state || { from: { pathname: "/login" } };
  const LOADING_SIGN_OUT = "LOADING_SIGN_OUT";

  const onLogoutSuccess = () => {
    dispatch({ type: AUTH_INVALIDATE });
    PersistorPurge();
    history.replace(from);
    loadingDone(LOADING_SIGN_OUT);
  };

  const onFailure = (res) => {
    console.log(res);
  };

  const { signOut } = useGoogleLogout({
    clientId: CLIENT_ID,
    onLogoutSuccess,
    onFailure,
  });

  const handleAction = () => {
    loadingProcess(LOADING_SIGN_OUT);
    signOut();
  };

  return (
    <button
      onClick={handleAction}
      className="block w-full text-left hover:text-gray-400 text-gray-700 dark:text-gray-100 dark:hover:text-gray-300 transition-colors ease-in-out px-4 py-2 text-sm"
      tabIndex="-1"
    >
      Sign Out
    </button>
  );
};

export default GoogleSignout;
