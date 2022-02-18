import { Book } from "../../api";
import { ActionTypes } from "../action-types";
import { Action } from "../actions";

interface BooksState {
  books: Book[];
  page: number;
  totalPages: number;
}

const initialState: BooksState = {
  books: [],
  page: 1,
  totalPages: 1,
};

const reducer = (
  state: BooksState = initialState,
  action: Action
): BooksState => {
  switch (action.type) {
    case ActionTypes.ADD_BOOKS:
      return { ...state, ...action.payload };
    case ActionTypes.SET_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};

export default reducer;
