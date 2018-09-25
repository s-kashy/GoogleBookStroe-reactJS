import React from "react";
import classes from "./ToolBar.css";
import Title from "./Title/Title";
import Button from "../UI/Button/Button";

const ToolBar = props => {
  return (
    <div className={classes.Toolbar}>
      <div className={classes.Title}>
        <Title />
      </div>
      <Button clicked={props.clicked} className={classes.Button}>
        Add New Book
      </Button>
    </div>
  );
};

export default ToolBar;
