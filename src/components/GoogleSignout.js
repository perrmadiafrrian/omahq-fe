import { useGoogleLogout } from "react-google-login";
import PersistorPurge from "../utils/PersistorPurge";
import { useLocation, useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { AUTH_INVALIDATE } from "../actions";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GoogleSignout = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { from } = location.state || { from: { pathname: "/login" } };

  const onLogoutSuccess = () => {
    dispatch({ type: AUTH_INVALIDATE });
    PersistorPurge();
    history.replace(from);
  };

  const onFailure = (res) => {
    console.log(res);
  };

  const { signOut } = useGoogleLogout({
    clientId: CLIENT_ID,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <button
      onClick={signOut}
      className="block w-full text-left hover:text-gray-400 transition-colors ease-in-out px-4 py-2 text-sm text-gray-700"
      tabIndex="-1"
    >
      Sign Out
    </button>
  );
};

export default GoogleSignout;
