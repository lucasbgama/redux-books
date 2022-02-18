import { combineReducers } from "redux";
import { store } from "..";
import userReducer from "./userReducer";
import booksReducer from "./booksReducer";

const reducers = combineReducers({
  user: userReducer,
  books: booksReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;
