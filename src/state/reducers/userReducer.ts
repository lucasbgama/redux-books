import { Token, User } from "../../api";
import { ActionTypes } from "../action-types";
import { Action } from "../actions";

interface UserState {
  user?: User;
  token?: Token;
  isFetching: boolean;
  error: boolean;
}

const initialState: UserState = {
  isFetching: false,
  error: false,
};

const reducer = (
  state: UserState = initialState,
  action: Action
): UserState => {
  switch (action.type) {
    case ActionTypes.FETCH:
      return { ...state, error: false, isFetching: true };
    case ActionTypes.ERROR:
      return { ...state, error: true, isFetching: false };
    case ActionTypes.LOGIN:
      console.log(action.payload);
      return { ...state, isFetching: false, error: false, ...action.payload };
    case ActionTypes.LOGOUT:
      return { isFetching: false, error: false };
    case ActionTypes.REFRESH_TOKEN:
      return { ...state, error: false, isFetching: false, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
