import React, { Component } from "react";
import ToolBar from "../../component/ToolBar/ToolBar";
import Aux from "../../hoc/Hoc";
import { connect } from "react-redux";
import * as actionItem from "../../store/action/index";
import Model from "../Model/Model";
import Footer from "../../component/Footer/Footer"
import classes from "./Layout.css";
import Form from "../Form/Form";
import DeleteConfirmation from "../../component/DeleteConfirmation/DeleteConfirmation";

class Layout extends Component {
  state = {
    refresh: true
  };
  cancelDeleteHandler = () => {
    this.props.cancelDelete();
  };
  deleteBookHandler = () => {
    this.props.deleteGranted();
  };
  componentDidUpdate() {
   
  }
  componentDidMount(){
    console.log("componentDidMount")

  }
  

  componentWillMount() {
    console.log("  componentWillMount ")
    this.props.cancelEditScreen();
  }
  addANewBookHandler = () => {
    this.props.newBookAdd();
  };

  render() {
    return (
      <Aux>
        <div className={classes.Layout}>
          <ToolBar clicked={this.addANewBookHandler} />
          <Model visible={this.props.backDrop}>
            <DeleteConfirmation
              visible={this.props.deleteMsg}
              clickedCancel={this.cancelDeleteHandler}
              clickedDelete={this.deleteBookHandler}
            />
             {this.props.formActivate?<Form/>:null}
          </Model>
        
          <main className={classes.content}>{this.props.children}</main>
          <Footer/>
        </div>
      </Aux>
    );
  }
}
const mapStateToProps = state => {
  return {
    backDrop: state.books.backDrop,
    deleteMsg: state.books.deleteMsg,
    loading: state.books.uploadForm,
    formActivate: state.books.formActivate
  };
};
const mapStateDispatchToProps = dispatch => {
  return {
    cancelEditScreen: () => dispatch(actionItem.cancelBookEdit()),
    fetchBooks: () => dispatch(actionItem.fetchAllFoodBooks()),
    cancelDelete: () => dispatch(actionItem.closeMSgDelete()),
    deleteGranted: () => dispatch(actionItem.deleteBookProtocol()),
    newBookAdd: () => dispatch(actionItem.setUpNewBookForm())
  };
};
export default connect(
  mapStateToProps,
  mapStateDispatchToProps
)(Layout);
