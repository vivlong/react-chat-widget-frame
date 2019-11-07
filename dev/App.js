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
    const advanceSetting = {
      brand: {
        name: 'waimao.tools',
        link: 'https://waimao.tools',
      },
      launcher: {
        bgColor: '#3021EC',
        img: {
          src: 'https://static-v.tawk.to/a-v3/images/bubbles/168-r-br.svg',
          style: {
            width: '124px',
            height: '79px',
            position: 'absolute',
            right: 0,
          }
        },
      },
      header: {
        bgColor: '#3021EC',
      }
    }
    return (
      <Widget
        title="Let’s chat? - We're online"
        subtitle="Welcome"
        handleNewUserMessage={this.handleNewUserMessage}
        badge={0}
        advanceSetting={advanceSetting}
      />
    );
  }
}
