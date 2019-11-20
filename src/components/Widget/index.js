import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toggleChat, addUserMessage, showMsgBubble } from "@actions";
import WidgetLayout from "./layout";

class Widget extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.fullScreenMode) {
      this.props.dispatch(toggleChat());
    }
  }

  toggleConversation = () => {
    if (typeof this.props.onToggleChat === "function") {
      this.props.onToggleChat(this.props.showChat);
    }
    this.props.dispatch(toggleChat());
  };

  handleMessageSubmit = event => {
    event.preventDefault();
    const userInput = event.target.message.value;
    if (userInput.trim()) {
      this.props.dispatch(addUserMessage(userInput));
      this.props.handleNewUserMessage(userInput);
    }
    event.target.message.value = "";
  };

  handleQuickButtonClicked = (event, value) => {
    event.preventDefault();

    if (this.props.handleQuickButtonClicked) {
      this.props.handleQuickButtonClicked(value);
    }
  };

  closeMessageBubble = () => {
    this.props.dispatch(showMsgBubble());
  }

  render() {
    return (
      <WidgetLayout
        onToggleConversation={this.toggleConversation}
        onSendMessage={this.handleMessageSubmit}
        onQuickButtonClicked={this.handleQuickButtonClicked}
        title={this.props.title}
        titleAvatar={this.props.titleAvatar}
        subtitle={this.props.subtitle}
        senderPlaceHolder={this.props.senderPlaceHolder}
        profileAvatar={this.props.profileAvatar}
        showCloseButton={this.props.showCloseButton}
        fullScreenMode={this.props.fullScreenMode}
        badge={this.props.badge}
        autofocus={this.props.autofocus}
        customLauncher={this.props.customLauncher}
        advanceSetting={this.props.advanceSetting}
        onCloseMessageBubble={this.closeMessageBubble}
      />
    );
  }
}

Widget.propTypes = {
  title: PropTypes.string,
  titleAvatar: PropTypes.string,
  subtitle: PropTypes.string,
  handleNewUserMessage: PropTypes.func.isRequired,
  handleQuickButtonClicked: PropTypes.func,
  senderPlaceHolder: PropTypes.string,
  profileAvatar: PropTypes.string,
  showCloseButton: PropTypes.bool,
  fullScreenMode: PropTypes.bool,
  badge: PropTypes.number,
  autofocus: PropTypes.bool,
  customLauncher: PropTypes.func,
  onToggleChat: PropTypes.func, // called on toggle with the old showChat status
  advanceSetting: PropTypes.object
};

export default connect(store => ({
  showChat: store.behavior.get("showChat")
}))(Widget);
