import { useGoogleLogout } from "react-google-login";

const CLIENT_ID = ``;

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

  return (
    <button
      onClick={signOut}
      className="block px-4 py-2 text-sm text-gray-700"
      tabIndex="-1"
    >
      Sign Out
    </button>
  );
};

export default GoogleSignout;
