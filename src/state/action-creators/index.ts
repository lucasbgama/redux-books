import { AppDispatch } from "..";
import { Token, User } from "../../api";
import { axiosInstance } from "../../api/interceptors";
import { ActionTypes } from "../action-types";

export const Login = (username: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: ActionTypes.FETCH });
    const response = await axiosInstance.post("/auth/sign-in", {
      username,
      password,
    });
    const user: User = response.data;
    const token: Token = {
      accessToken: response.headers["Authorization"],
      refreshToken: response.headers["refresh-token"],
    };
    dispatch({ type: ActionTypes.LOGIN, payload: { user, token } });
  };
};

export const Logout = () => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: ActionTypes.LOGOUT });
  };
};
