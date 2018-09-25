import * as actionType from "../action/actionItems";
import { updateObject } from "../utility";

const initialState = {
  books: null,
  loading: false,
  error: null,
  backDrop: false,
  chosenBook: null,
  deleteMsg: false,
  uploadForm: false,
  idOfBookToDelete: null,
  idOfBookToEdit: null,
  randomIdNumber: 2001,
  formActivate: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_ALL_BOOKS:
      return updateObject(state, {
        books: action.books,
        loading: false,
        backDrop: false,
        chosenBook: null
      });
    case actionType.RESET_ERROR:
      return updateObject(state, { error: null });
    case actionType.LOADING_DATA:
      return updateObject(state, { loading: true });
    case actionType.LOADING_DATA_ERROR:
      return updateObject(state, { error: action.error });
    case actionType.BACK_DROP:
      return updateObject(state, { backDrop: true, chosenBook: null });
    case actionType.CLOSE_MODEL:
      return updateObject(state, {
        backDrop: false,
        chosenBook: null,
        formActivate: false
      });
    case actionType.MSG_DELETE:
      return updateObject(state, { deleteMsg: true });

    case actionType.CLOSE_DELETE_MSG:
      return updateObject(state, {
        deleteMsg: false,
        backDrop: false,
        idOfBookToDelete: null
      });
    case actionType.ID_DELETE_HOLDER:
      return updateObject(state, {
        uploadForm: false,
        backDrop: true,
        idOfBookToDelete: action.idHolder,
        deleteMsg: true
      });

    case actionType.ADD_NEW_BOOK:
      const newBook = {
        ...action.book
      };
      return updateObject(state, {
        books: state.books.concat(newBook),
        loading: false,
        backDrop: false,
        chosenBook: null,
        error: null,
        uploadForm: false
      });
    case actionType.ACTIVE_FORM_MODE:
      return updateObject(state, {
        formActivate: true,
        backDrop: true,
        uploadForm: true
      });

    case actionType.CANCEL_EDIT:
      return updateObject(state, {
        formActivate: false,
        chosenBook: null,
        backDrop: false,
        uploadForm: true
      });
    case actionType.CHOSEN_BOOK:
      return updateObject(state, {
        chosenBook: action.chosen,
        backDrop: true,
        formActivate: true
      });
    case actionType.INCREMENT_RANDOM_ID:
      return updateObject(state, { randomIdNumber: state.randomIdNumber + 1 });
    case actionType.UPDATE_BOOK:
      return {
        ...state,
        books: {
          ...state.books,
          [action.id]: state.books[action.book]
        }
      };
    default:
      return state;
  }
};
export default reducer;
