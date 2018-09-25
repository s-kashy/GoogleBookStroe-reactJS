import React from "react";
import classes from "./Input.css";

const Input = props => {
  console.log("subtitle", props.subtitle);
  return (
    <div>
      <label className={classes.Label}>{props.label}</label>
      <input
        className={classes.InputElement}
        type="text"
        name={props.name}
        placeholder={props.value}
        onChange={props.changedInput}
      />
    </div>
  );
};
export default Input;
