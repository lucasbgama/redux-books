import axios from "axios";
import { API_URL } from ".";
import { store } from "../state";
import { ActionTypes } from "../state/action-types";

export const axiosInstance = axios.create({ baseURL: API_URL });

axiosInstance.interceptors.request.use((config) => {
  const { token } = store.getState().user;
  if (token?.accessToken && config.headers) {
    config.headers["Authorization"] = `Bearer ${token.accessToken}`;
  }
  store.dispatch({ type: ActionTypes.FETCH });
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const request = error.config;
    if (
      error.response.status === 401 &&
      request.url === `${API_URL}/token/refresh/`
    ) {
      return Promise.reject(error);
    }
    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const { token } = store.getState().user;
      const refreshToken = token?.refreshToken;

      if (refreshToken) {
        try {
          const response = await axiosInstance.post("/token/refresh/", {
            refresh: refreshToken,
          });
          store.dispatch({
            type: ActionTypes.REFRESH_TOKEN,
            payload: {
              accessToken: response.headers["Authorization"],
              refreshToken: response.headers["refresh-token"],
            },
          });
          request.headers[
            "Authorization"
          ] = `Bearer ${response.headers["Authorization"]}`;
          return await axiosInstance(request);
        } catch (_err) {
          store.dispatch({ type: ActionTypes.ERROR });
        }
      } else {
        store.dispatch({ type: ActionTypes.LOGOUT });
      }
    }
    store.dispatch({ type: ActionTypes.ERROR });
    return Promise.reject(error);
  }
);
