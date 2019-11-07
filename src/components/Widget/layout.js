import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Frame from "react-frame-component";
import Conversation from "./components/Conversation";
import Launcher from "./components/Launcher";
import "./style.scss";

class WidgetLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      convFrameDisplay: "none",
      showChat: false
    };
  }

  componentDidMount() {
    this.convFrame = document.querySelector("#rcw-conv-frame");
  }

  componentWillReceiveProps(nextProps) {
    const openingChat = nextProps.showChat && !this.props.showChat;
    const closingChat = !nextProps.showChat && this.props.showChat;
    if (openingChat) {
      clearTimeout(this.convFrameDisplayTimeout);
      this.setState({ convFrameDisplay: "block" });
      this.convFrameDisplayTimeout = setTimeout(() => {
        this.setState({ showChat: true });
      }, 50);
    } else if (closingChat) {
      clearTimeout(this.convFrameDisplayTimeout);
      this.setState({ showChat: false });
      this.convFrameDisplayTimeout = setTimeout(() => {
        this.setState({ convFrameDisplay: "none" });
      }, 300);
    }
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
    clearTimeout(this.convFrameDisplayTimeout);
  }

  render() {
    const { advanceSetting } = this.props;
    const initialFrameContent = () => {
      return `<!DOCTYPE html>
        <html>
          <head>
            <link type='text/css' rel='stylesheet' href='https://cdn.xiaocong.vip/resources/widget/frame.css'/>
            <style>
              body {
                margin: 0;
                padding: 0;
                font-family: -apple-system,BlinkMacSystemFont,"Lucida Grande","Lucida Sans Unicode","Lucida Sans",lucida,"Segoe UI",Verdana,"Helvetica Neue",Arial,sans-serif;
                overflow:hidden;
              }
              // #rcw-btn-frame {
              //   height: 100px;
              // }
              .rcw-launcher {
                background-color: ${advanceSetting.launcher.bgColor};
              }
              .rcw-conversation-container .rcw-header {
                background-color: ${advanceSetting.header.bgColor};
              }
            </style>
          </head>
          <body>
            <div></div>
          </body>
        </html>`;
    };
    return (
      <div
        className={`rcw-widget-container ${
          this.props.fullScreenMode ? "rcw-full-screen" : ""
        } ${this.props.showChat ? "rcw-opened" : ""}`}
      >
        <Frame
          initialContent={initialFrameContent()}
          id="rcw-conv-frame"
          style={{ opacity: 0, display: this.state.convFrameDisplay }}
          aria-live="polite"
        >
          <Conversation
            title={this.props.title}
            subtitle={this.props.subtitle}
            sendMessage={this.props.onSendMessage}
            senderPlaceHolder={this.props.senderPlaceHolder}
            onQuickButtonClicked={this.props.onQuickButtonClicked}
            profileAvatar={this.props.profileAvatar}
            toggleChat={this.props.onToggleConversation}
            showChat={this.props.showChat}
            showCloseButton={this.props.showCloseButton}
            disabledInput={this.props.disabledInput}
            autofocus={this.props.autofocus}
            titleAvatar={this.props.titleAvatar}
            advanceSetting={this.props.advanceSetting}
          />
        </Frame>
        <Frame
          initialContent={initialFrameContent()}
          id="rcw-btn-frame"
          aria-live="polite"
        >
          {this.props.customLauncher
            ? this.props.customLauncher(this.props.onToggleConversation)
            : !this.props.fullScreenMode && (
                <Launcher
                  toggle={this.props.onToggleConversation}
                  badge={this.props.badge}
                  advanceSetting={this.props.advanceSetting}
                />
              )}
        </Frame>
      </div>
    );
  }
}

WidgetLayout.propTypes = {
  title: PropTypes.string,
  titleAvatar: PropTypes.string,
  subtitle: PropTypes.string,
  onSendMessage: PropTypes.func,
  onToggleConversation: PropTypes.func,
  showChat: PropTypes.bool,
  senderPlaceHolder: PropTypes.string,
  onQuickButtonClicked: PropTypes.func,
  profileAvatar: PropTypes.string,
  showCloseButton: PropTypes.bool,
  disabledInput: PropTypes.bool,
  fullScreenMode: PropTypes.bool,
  badge: PropTypes.number,
  autofocus: PropTypes.bool,
  customLauncher: PropTypes.func,
  advanceSetting: PropTypes.object
};

export default connect(store => ({
  showChat: store.behavior.get("showChat"),
  disabledInput: store.behavior.get("disabledInput")
}))(WidgetLayout);
