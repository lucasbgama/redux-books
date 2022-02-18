import { AppDispatch } from "..";
import { Book, Token, User } from "../../api";
import { axiosInstance } from "../../api/interceptors";
import { ActionTypes } from "../action-types";

export const Login = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    const response = await axiosInstance.post("/auth/sign-in", {
      email,
      password,
    });
    const user: User = response.data;
    const token: Token = {
      accessToken: response.headers["authorization"],
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

export const GetBooks = (page: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: ActionTypes.SET_PAGE, payload: page });
    const response = await axiosInstance.get("/books", {
      params: { page, amount: 12 },
    });
    const books: Book[] = response.data.data;
    const totalPages: number = Math.ceil(response.data.totalPages);
    dispatch({ type: ActionTypes.ADD_BOOKS, payload: { books, totalPages } });
  };
};
