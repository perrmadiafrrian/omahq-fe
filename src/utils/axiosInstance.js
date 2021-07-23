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
      await axios
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
        })
        .catch((err) => {
          console.log(err);
        });
    }

    config.headers.Authorization = auth.access_token;
  }
  return config;
});

export default instance;
