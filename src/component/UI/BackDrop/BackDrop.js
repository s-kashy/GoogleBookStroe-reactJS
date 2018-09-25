import React from "react";
import classes from "./BackDrop.css";

const BackDrop = props => {
  return props.visible ? (
    <div className={classes.Backdrop} onClick={props.modalClosed} />
  ) : null;
};
export default BackDrop;
