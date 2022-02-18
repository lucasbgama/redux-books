import { Book } from "../../api";
import { ActionTypes } from "../action-types";
import { Action } from "../actions";

interface BooksState {
  books: Book[];
  page: number;
  totalPages: number;
  bookDetails?: Book;
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
    case ActionTypes.ADD_BOOK_DETAILS:
      return { ...state, bookDetails: action.payload };
    case ActionTypes.RM_BOOK_DETAILS:
      return { ...state, bookDetails: undefined };
    default:
      return state;
  }
};

export default reducer;
