import React from "react";
import Aux from "../../hoc/Hoc";
import classes from "./Book.css";
import Buttom from "../UI/Button/Button";
const Book = props => {
  let authors = null;
  if (Array.isArray(props.authorName)) {
    authors = props.authorName.map((author, index) => {
      return <p key={index + 1}>{author}</p>;
    });
  } else {
    authors = <p>{props.authorName}</p>;
  }

  return (
    <Aux>
      <article className={classes.Book} onClick={props.clicked}>
        <p>
          <strong>{props.title}</strong>
        </p>
        <p>
          <strong>{props.subtitle}</strong>
        </p>
        <div>By {authors}</div>
        {props.date ? (
          <p className={classes.Author}>{props.date}</p>
        ) : (
          <p className={classes.Author}>No Date Available</p>
        )}
        <Buttom btnType="Success" clicked={props.clickedEdit}>
          Edit
        </Buttom>
        <Buttom btnType="Danger" clicked={props.clickedDelete}>
          Delete
        </Buttom>
      </article>
    </Aux>
  );
};

export default Book;
