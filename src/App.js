import React, { Component } from "react";
import Books from "./container/Books/Books";
import { Route, Switch, withRouter } from "react-router-dom";

import Layout from "./container/Layout/Layout.js";
class App extends Component {
  render() {
    const redirect = (
      <Switch>
        <Route path="/" component={Books} />
      </Switch>
    );

    return <Layout>{redirect}</Layout>;
  }
}

export default withRouter(App);
