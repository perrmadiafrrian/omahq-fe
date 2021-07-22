import { useGoogleLogout } from "react-google-login";
import PersistorPurge from "../utils/PersistorPurge";

const CLIENT_ID = `2615891792-9iab23mglp6sch2dn81p3ugmfvjgfakc.apps.googleusercontent.com`;

const GoogleSignout = (props) => {
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
