import { Book, Token, User } from "../../api";
import { ActionTypes } from "../action-types";

interface LoginAction {
  type: ActionTypes.LOGIN;
  payload: { user: User; token: Token };
}

interface LogoutAction {
  type: ActionTypes.LOGOUT;
}

interface RefreshTokenAction {
  type: ActionTypes.REFRESH_TOKEN;
  payload: Token;
}

interface FetchAction {
  type: ActionTypes.FETCH;
}

interface FetchedAction {
  type: ActionTypes.FETCHED;
}
interface ErrorAction {
  type: ActionTypes.ERROR;
}

interface GetBooksAction {
  type: ActionTypes.ADD_BOOKS;
  payload: { books: Book[]; totalPages: number };
}

interface SetPageAction {
  type: ActionTypes.SET_PAGE;
  payload: number;
}

export type Action =
  | LoginAction
  | FetchAction
  | FetchedAction
  | LogoutAction
  | ErrorAction
  | RefreshTokenAction
  | GetBooksAction
  | SetPageAction;
