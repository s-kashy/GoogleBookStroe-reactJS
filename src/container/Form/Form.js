import React, { Component } from "react";
import classes from "./Form.css";
import { connect } from "react-redux";
import Button from "../../component/UI/Button/Button";
import Spinner from "../../component/UI/Spinner/Spinner";
import Input from "../../component/Input/Input";
import * as methodType from "./Method";
import { validationInit } from "../../Validation/Validation";
import * as actionType from "../../store/action/index";
var _ = require("lodash");
const arrayLabel = ["Title", "Author", "Publish Date (YYYY)"];
class Form extends Component {
  state = {
    authForm: {
      title: null,
      author: null,
      date: null
    },
    id: "",
    validForm: true,
    loading: false,
    msg: null,
    error: false
  };
  toUpperCaseStr = str => {
    return str
      .toLowerCase()
      .split(" ")
      .map(word => {
        return word[0].toUpperCase() + word.substr(1);
      })
      .join(" ");
  };
  componentWillMount() {
    let init = {
      title: null,
      author: null,
      date: null
    };

    this.setState({ authForm: init, error: false, msg: null });
  }
  removeAllNonAlpha = str => {
    let temp = str.toString().replace(/[\W_]+/g, " ");
    str = temp;
    return str;
  };
  editBookOfUser = () => {
    let book = { ...this.props.editBook };

    book = _.pick(book, ["title", "author", "date"]);
    let checkerState = { ...this.state.authForm };
    for (let key in book) {
      if (checkerState[key] == null) {
        checkerState[key] = book[key];
      }
    }
    this.setState({ authForm: checkerState });
    this.checkValidation(checkerState, methodType.EDIT_BOOK);
  };
  checkIfbookExistInList = (title, id) => {
    console.log("is exist");

    let res = this.props.allBooks.find(book => {
      if (
        book.title.toLowerCase().toString() === title.toString() &&
        book.id.toString() !== id.toString()
      ) {
        console.log("book all", book.title, "title to find", title);
        return methodType.BOOK_EXSIT;
      }

      return null;
    });
    if (res != null || res !== undefined) {
      this.setState({ error: true, msg: methodType.BOOK_EXSIT });
      return methodType.BOOK_EXSIT;
    }
    return null;
  };

  checkValidation = (book, method) => {
    let result = null;
    let id = book.id;
    if (this.props.editBook) {
      id = this.props.editBook.id;
    }
    for (let key in book) {
      result = validationInit(key, book[key]);

      if (result !== null) {
        this.setState({ error: false, msg: result });
        return;
      }
      if (key === "author") {
        book[key] = this.removeAllNonAlpha(book.author);
        book[key] = this.toUpperCaseStr(book.author);
      } else if (key === "title") {
        book[key] = this.removeAllNonAlpha(book.title);

        result = this.checkIfbookExistInList(book[key], id);

        book[key] = this.toUpperCaseStr(book.title);
        if (result === methodType.BOOK_EXSIT) {
          this.setState({ error: false, msg: result });
          return;
        }
        console.log("out of if");
      }
    }

    if (method === methodType.NEW_BOOK && result === null) {
      this.props.addNewBook(book);
    } else if (method === methodType.EDIT_BOOK && result === null) {
      let temp = { ...this.props.editBook };
      book.id = temp;
      book = _.pick(book, ["id", "title", "author", "date"]);
      this.props.editBookById(book, this.props.editBook.id);
    }
  };
  addBookToListHandler = event => {
    event.preventDefault();

    this.setState({ error: false, msg: null });
    this.props.resetError();
    let book = null;

    if (!this.props.editBook) {
      book = {
        id: this.props.idRandom,
        title: this.state.authForm.title,
        author: this.state.authForm.author,
        date: this.state.authForm.date
      };

      this.checkValidation(book, methodType.NEW_BOOK);
    } else {
      this.editBookOfUser();
    }
  };
  cancelHandler = () => {
    this.props.cancelEditScreen();
  };
  inputChangeHandler = (event, id) => {
    if (id !== "id") {
      let updateState = { ...this.state.authForm };
      let updateItem = updateState[id];
      updateItem = event.target.value;
      updateState[id] = updateItem;
      this.setState({ authForm: updateState });
    }
  };

  render() {
    let forms = null;
    let error = null;
    if (!this.state.error) {
      error = <p style={{ color: "red" }}>{this.state.msg}</p>;
    }
    let fromBook = [];

    if (this.props.editBook) {
      for (let key in this.state.authForm) {
        if (key === "author" && Array.isArray(this.props.editBook[key])) {
          let temp = this.props.editBook[key].join(" ");
          fromBook.push({ id: key, value: temp });
        } else {
     
          if (key === "title" && this.props.editBook.subtitle !== undefined) {

            fromBook.push({
              id: key,
              value: `${this.props.editBook.title}  ${
                this.props.editBook.subtitle
              }`
            });
          } else {
           
              fromBook.push({ id: key, value: this.props.editBook[key] });
          }
        }
      }
    } else {
      for (let key in this.state.authForm) {
        fromBook.push({ id: key, value: "" });
      }
    }
    forms = fromBook.map((formElement, index) => {
      return (
        <Input
          key={formElement.id}
          id={formElement.id}
          value={formElement.value}
          label={arrayLabel[index]}
          type="text"
          subtitle={formElement.subtitle}
          changedInput={event => this.inputChangeHandler(event, formElement.id)}
        />
      );
    });

    return (
      <div>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <div className={classes.contactData}>
            {this.props.editBook != null ? (
              <h3>Please Edit The Book</h3>
            ) : (
              <h3>Enter New Book</h3>
            )}
            <form onSubmit={this.addBookToListHandler}>
              {forms}
              {error}
              <Button btnType="Success" className={classes.BtnBorder}>
                Submit
              </Button>
              <Button btnType="Danger" clicked={this.cancelHandler}>
                Cancel
              </Button>
            </form>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    allBooks: state.books.books,
    activateForm: state.books.formActivate,
    editBook: state.books.chosenBook,
    loading: state.books.loading,
    idRandom: state.books.randomIdNumber,
    error: state.books.error
  };
};
const mapStateDispatchToProps = dispatch => {
  return {
    cancelEditScreen: () => dispatch(actionType.cancelBookEdit()),
    addNewBook: book => dispatch(actionType.addNewBook(book)),
    closeModel: () => dispatch(actionType.closeModel()),
    resetError: () => dispatch(actionType.resetError()),
    editBookById: (book, id) => dispatch(actionType.updateList(book, id))
  };
};

export default connect(
  mapStateToProps,
  mapStateDispatchToProps
)(Form);
