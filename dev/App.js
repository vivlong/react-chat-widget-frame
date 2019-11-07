import React, { Component } from "react";
import {
  Widget,
  addResponseMessage,
  setQuickButtons,
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
      if (newMessage === "fruits") {
        setQuickButtons([
          { label: "Apple", value: "apple" },
          { label: "Orange", value: "orange" },
          { label: "Pear", value: "pear" },
          { label: "Banana", value: "banana" }
        ]);
      } else {
        addResponseMessage(newMessage);
      }
    }, 2000);
  };

  handleQuickButtonClicked = e => {
    addResponseMessage("Selected " + e);
    setQuickButtons([]);
  };

  render() {
    return (
      <Widget
        title="Let’s chat? - We're online"
        subtitle="Asistente virtual"
        // senderPlaceHolder=""
        handleNewUserMessage={this.handleNewUserMessage}
        // handleQuickButtonClicked={this.handleQuickButtonClicked}
        badge={1}
      />
    );
  }
}
