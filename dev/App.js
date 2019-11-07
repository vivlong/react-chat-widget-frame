import React, { Component } from "react";
import {
  Widget,
  addResponseMessage,
  toggleMsgLoader
} from "../index";

export default class App extends Component {

  componentDidMount() {
    addResponseMessage("Welcome to this awesome chat!");
  }

  handleNewUserMessage = newMessage => {
    toggleMsgLoader();
    setTimeout(() => {
      toggleMsgLoader();
      addResponseMessage(newMessage);
    }, 2000);
  };

  render() {
    return (
      <Widget
        title="Let’s chat? - We're online"
        subtitle="Welcome"
        handleNewUserMessage={this.handleNewUserMessage}
        badge={1}
        showBrand={false}
        brandName=""
        brandLink=""
      />
    );
  }
}
