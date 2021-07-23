import { useGoogleLogout } from "react-google-login";
import PersistorPurge from "../utils/PersistorPurge";
import { useLocation, useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { AUTH_INVALIDATE } from "../actions";

const CLIENT_ID = `2615891792-9iab23mglp6sch2dn81p3ugmfvjgfakc.apps.googleusercontent.com`;

const GoogleSignout = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { from } = location.state || { from: { pathname: "/login" } };

  const onLogoutSuccess = (res) => {
    console.log(res);
  };

  const onFailure = (res) => {
    console.log(res);
  };

  const { signOut } = useGoogleLogout({
    clientId: CLIENT_ID,
    onLogoutSuccess,
    onFailure,
  });

  const handleSignout = () => {
    PersistorPurge();
    signOut();
    dispatch({ type: AUTH_INVALIDATE });
    history.replace(from);
  };

  return (
    <button
      onClick={handleSignout}
      className="block w-full text-left hover:text-gray-400 transition-colors ease-in-out px-4 py-2 text-sm text-gray-700"
      tabIndex="-1"
    >
      Sign Out
    </button>
  );
};

export default GoogleSignout;
