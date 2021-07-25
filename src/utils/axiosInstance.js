import axios from "axios";
import dayjs from "dayjs";
import { AUTH_SET } from "../actions";
import { store } from "../configureStore";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

instance.interceptors.request.use(async (config) => {
  const { auth } = store.getState();
  if (auth.is_auth) {
    if (dayjs(auth.data.exp * 1000).diff(dayjs()) < 1) {
      const result = await axios
        .post(
          `/auth/refresh`,
          {
            refresh_token: auth.refresh_token,
          },
          {
            baseURL: process.env.REACT_APP_BASE_API_URL,
            headers: {
              Authorization: auth.access_token,
            },
          }
        )
        .then((res) => {
          const { data } = res;
          store.dispatch({
            type: AUTH_SET,
            payload: {
              ...auth,
              access_token: data.access_token,
              token_type: data.token_type,
              data: data.data,
            },
          });
          return data;
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
      if (result)
        config.headers.Authorization = `${result.token_type} ${result.access_token}`;
    } else {
      config.headers.Authorization = auth.access_token;
    }
  }
  return config;
});

export default instance;
