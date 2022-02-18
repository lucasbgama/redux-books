import { Token, User } from "../../api";
import { ActionTypes } from "../action-types";
import { Action } from "../actions";

const tokenStorageKey = "token-ioasys";
interface UserState {
  user?: User;
  token?: Token;
  isFetching: boolean;
  error: boolean;
}

const localStorageData = localStorage.getItem(tokenStorageKey);
const userFromStorage: { user?: User; token?: Token } = localStorageData
  ? JSON.parse(localStorageData)
  : {};

const initialState: UserState = {
  isFetching: false,
  error: false,
  ...userFromStorage,
};

const reducer = (
  state: UserState = initialState,
  action: Action
): UserState => {
  switch (action.type) {
    case ActionTypes.FETCH:
      return { ...state, error: false, isFetching: true };
    case ActionTypes.FETCHED:
      return { ...state, isFetching: false };
    case ActionTypes.ERROR:
      return { ...state, error: true, isFetching: false };
    case ActionTypes.LOGIN:
      localStorage.setItem(tokenStorageKey, JSON.stringify(action.payload));
      return { ...state, isFetching: false, error: false, ...action.payload };
    case ActionTypes.LOGOUT:
      localStorage.removeItem(tokenStorageKey);
      return { isFetching: false, error: false };
    case ActionTypes.REFRESH_TOKEN:
      return { ...state, error: false, isFetching: false, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
