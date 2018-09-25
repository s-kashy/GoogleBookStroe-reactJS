import React, { Component } from "react";
import Aux from "../../hoc/Hoc";
import { connect } from "react-redux";
import Book from "../../component/Book/Book";
import classes from "./Books.css";
import Spinner from "../../component/UI/Spinner/Spinner";
import * as actionItem from "../../store/action/index";
class Books extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }
  editBookHandler = id => {
    this.props.setChosenBookObj(id);
  };

  deleteBookHandler = id => {
    this.props.activateDeleteProtocol(id);
  };

  render() {
    let books = <Spinner />;

    if (this.props.books) {
    

      books = this.props.books.map((book, index) => {
   
        return (
          <Book
            key={index}
            authorName={book.author}
            id={book.id}
            title={book.title}
            subtitle={book.subtitle}
            date={book.date}
            clickedEdit={() => this.editBookHandler(book.id)}
            clickedDelete={() => this.deleteBookHandler(book.id)}
          />
        );
      });
    }

    return (
      <Aux>
        <div className={classes.Books}>{books}</div>
      </Aux>
    );
  }
}
const mapStateToProps = state => {
  return {
    books: state.books.books,
    backDrop: state.books.backDrop
  };
};
const mapStateDispatchToProps = dispatch => {
  return {
    fetchBooks: () => dispatch(actionItem.fetchAllFoodBooks()),
    activateDrop: () => dispatch(actionItem.activateModel()),
    activateDeleteProtocol: id => dispatch(actionItem.holdDeleteId(id)),
    setChosenBookObj: id => dispatch(actionItem.getChosenBookObj(id))
  };
};
export default connect(
  mapStateToProps,
  mapStateDispatchToProps
)(Books);
