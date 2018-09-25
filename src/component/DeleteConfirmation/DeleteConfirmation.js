import React from "react";

import Button from "../UI/Button/Button";
import classes from "./DeleteConfirmation.css";
const DeleteConfirmation = props => {

  let visibilityState = props.visible ? "block" : "none";

  return (
    <div
      style={{ display: visibilityState }}
      className={classes.DeleteConfirmation}
    >
      <p>Are you Sure You Want To Delete</p>
      <Button clicked={props.clickedDelete}>Ok</Button>
      <Button clicked={props.clickedCancel}>Cancel</Button>
    </div>
  );
};
export default DeleteConfirmation;
