import * as actionType from "./actionItems";
import axios from "axios";

//var _ = require("lodash");

export const loadingBooks = () => {
  return {
    type: actionType.LOADING_DATA
  };
};
export const failLoading = error => {
  return {
    type: actionType.LOADING_DATA_ERROR,
    error: error
  };
};
export const storeBooks = data => {
  return {
    type: actionType.GET_ALL_BOOKS,
    books: data
  };
};

export const fetchAllFoodBooks = () => {
  return dispatch => {
    dispatch(loadingBooks());
    axios
      .get("https://www.googleapis.com/books/v1/volumes?q=food")
      .then(response => {
        const books = response.data.items.map(book => {
          return {
            id: book.id,
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors,
            date: book.volumeInfo.publishedDate,
            subtitle: book.volumeInfo.subtitle
          };
        });
        for (let key in books) {
          let temp = books[key].date;
          if (temp !== undefined) {
            books[key].date = temp.substring(0, 4);
          }
        }

        dispatch(storeBooks(books));
      })
      .catch(error => {
        dispatch(failLoading(error));
      });
  };
};
export const activateModel = () => {
  return {
    type: actionType.BACK_DROP
  };
};
export const editBook = books => {
  return {
    type: actionType.EDIT_BOOK,
    book: books
  };
};
export const closeModel = () => {
  return {
    type: actionType.CLOSE_MODEL
  };
};
export const deleteBook = id => {
  return {
    type: actionType.DELETE_BOOK
  };
};
export const activatedMsgBeforeDelete = () => {
  return {
    type: actionType.MSG_DELETE
  };
};
export const closeMSgDelete = () => {
  return {
    type: actionType.CLOSE_DELETE_MSG
  };
};
export const holdDeleteId = id => {
  return {
    type: actionType.ID_DELETE_HOLDER,
    idHolder: id
  };
};
export const deleteBookProtocol = () => {
  return (dispatch, getState) => {
    const books = getState().books;
    const temp = books.books;

    const idOfBookToDelete = books.idOfBookToDelete;
    const updatedBooksList = temp.filter(book => {
      return book.id !== idOfBookToDelete;
    });

    dispatch(storeBooks(updatedBooksList));
    dispatch(closeMSgDelete());
  };
};
export const setEditBookProtocol = chosenBook => {
  return {
    type: actionType.CHOSEN_BOOK,
    chosen: chosenBook
  };
};
export const getChosenBookObj = id => {
  return (dispatch, getState) => {
    const books = getState().books;
    const temp = books.books;
    const chosenBook = temp.filter(book => {
      return book.id === id;
    });
    dispatch(setEditBookProtocol(chosenBook[0]));
  };
};
export const setUpNewBookForm = () => {
  return {
    type: actionType.ACTIVE_FORM_MODE
  };
};
export const cancelBookEdit = () => {
  return {
    type: actionType.CANCEL_EDIT
  };
};
export const incrementRandomId = () => {
  return {
    type: actionType.INCREMENT_RANDOM_ID
  };
};
export const addOneBookToList = book => {
  return {
    type: actionType.ADD_NEW_BOOK,
    book: book
  };
};

export const addNewBook = book => {
  return dispatch => {
    dispatch(closeModel());
    dispatch(incrementRandomId());
    dispatch(addOneBookToList(book));
  };
};

export const resetError = () => {
  return {
    type: actionType.RESET_ERROR
  };
};
export const updateList = (book, id) => {
  return (dispatch, getState) => {
    const books = getState().books;
    let holderBook = books.books;

    for (let i = 0; i < holderBook.length; i++) {
      if (holderBook[i].id === id.toString()) {
        holderBook[i].id = id.toString();
        holderBook[i].title = book.title.toString();
        holderBook[i].author = book.author.toString();
        holderBook[i].date = book.date.toString();
        holderBook[i].subtitle = undefined;
        break;
      }
    }
    dispatch(storeBooks(holderBook));
    dispatch(closeModel());
  };
};
