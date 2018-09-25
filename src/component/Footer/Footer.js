import React from "react";
import classes from "./Footer.css";
const ToolBar = props => {
  return (
    <div className={classes.Footer}>
      <p> Created for HEROLO by Shlomo Kashy</p>
      <p>
        <a href="mailto:shlomo.kashy@gmail.com">shlomo.kashy@gmail.com</a>
      </p>
      <p>Tel 052-8528804</p>
    </div>
  );
};

export default ToolBar;
