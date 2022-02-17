import { combineReducers } from "redux";
import { store } from "..";
import userReducer from "./userReducer";

const reducers = combineReducers({
  user: userReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;
