import { Token, User } from "../../api";
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

interface ErrorAction {
  type: ActionTypes.ERROR;
}

export type Action =
  | LoginAction
  | FetchAction
  | LogoutAction
  | ErrorAction
  | RefreshTokenAction;
