const refreshTokenSetup = (res) => {
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const getNewAuthToken = await res.reloadAuthResponse();
    refreshTiming = (getNewAuthToken.expires_in || 3600 - 5 * 60) * 1000;
    console.log(getNewAuthToken);
    setTimeout(refreshToken, refreshTiming);
  };
  setTimeout(refreshToken, refreshTiming);
};

export default refreshTokenSetup;
