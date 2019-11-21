import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Frame from 'react-frame-component';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import Conversation from './components/Conversation';
import Launcher from './components/Launcher';
import MessageBubble from './components/MessageBubble';
import './style.scss';

class WidgetLayout extends Component {
  messagesCtrRef = React.createRef();
  convFrameDisplayTimeout = null;
  msgBubbleFrameDisplayTimeout = null;

  constructor(props) {
    super(props);
    this.state = {
      convFrameDisplay: 'none',
      msgBubbleFrameDisplay: 'none',
      showChat: false,
      showBubble: false,
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    const openingChat = nextProps.showChat && !this.props.showChat;
    const closingChat = !nextProps.showChat && this.props.showChat;
    if (openingChat) {
      clearTimeout(this.msgBubbleFrameDisplayTimeout);
      clearTimeout(this.convFrameDisplayTimeout);
      this.setState({convFrameDisplay: 'block', msgBubbleFrameDisplay: 'none'});
      this.convFrameDisplayTimeout = setTimeout(() => {
        this.setState({showChat: true, showBubble: false});
      }, 50);
    } else if (closingChat) {
      clearTimeout(this.convFrameDisplayTimeout);
      this.setState({showChat: false});
      this.convFrameDisplayTimeout = setTimeout(() => {
        this.setState({convFrameDisplay: 'none'});
      }, 300);
    }
    const openingBubble = nextProps.showBubble && !this.props.showBubble;
    const closingBubble = !nextProps.showBubble && this.props.showBubble;
    if (openingBubble && !this.props.showChat) {
      clearTimeout(this.msgBubbleFrameDisplayTimeout);
      this.setState({msgBubbleFrameDisplay: 'block'});
      this.msgBubbleFrameDisplayTimeout = setTimeout(() => {
        this.setState({showBubble: true});
      }, 50);
    } else if (closingBubble && !this.props.showChat) {
      clearTimeout(this.msgBubbleFrameDisplayTimeout);
      this.setState({showBubble: false});
      this.msgBubbleFrameDisplayTimeout = setTimeout(() => {
        this.setState({msgBubbleFrameDisplay: 'none'});
      }, 300);
    }
    if (window.innerWidth < 768) {
      if (openingChat) {
        disableBodyScroll(this.messagesCtrRef.current);
      } else if (closingChat) {
        enableBodyScroll(this.messagesCtrRef.current);
      }
    }
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
    clearTimeout(this.convFrameDisplayTimeout);
    clearTimeout(this.msgBubbleFrameDisplayTimeout);
  }

  render() {
    const {advanceSetting} = this.props;
    const initialFrameContent = () => {
      return `<!DOCTYPE html>
        <html>
          <head>
            ${
              advanceSetting.styleDependencies
                ? advanceSetting.styleDependencies.map(url => {
                    return `<link rel="stylesheet" href=${url} />`;
                  })
                : document.head.innerHTML
            }
            <style>
              body {
                margin: 0;
                padding: 0;
                font-family: -apple-system,BlinkMacSystemFont,"Lucida Grande","Lucida Sans Unicode","Lucida Sans",lucida,"Segoe UI",Verdana,"Helvetica Neue",Arial,sans-serif;
                overflow:hidden;
              }
              ${advanceSetting.launcher &&
                advanceSetting.launcher.bgColor &&
                `.rcw-launcher {
                      background-color: ${advanceSetting.launcher.bgColor};
                    }`}
              ${advanceSetting.header &&
                advanceSetting.header.bgColor &&
                `.rcw-conversation-container .rcw-header {
                      background-color: ${advanceSetting.header.bgColor};
                    }
                    .rcw-conversation-container .rcw-close-button {
                      background-color: ${advanceSetting.header.bgColor};
                    }`}
            </style>
          </head>
          <body>
            <div></div>
          </body>
        </html>`;
    };
    let launcherImgStyle =
      advanceSetting.launcher && advanceSetting.launcher.img ? 0 : '-20px';
    return (
      <div
        className={`rcw-widget-container ${
          this.props.showChat ? 'rcw-opened' : ''
        } ${this.props.showBubble ? 'rcw-msg-bubble-show' : ''}`}
      >
        <Frame
          initialContent={initialFrameContent()}
          id="rcw-conv-frame"
          style={{opacity: 0, display: this.state.convFrameDisplay}}
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
            brand={this.props.advanceSetting.brand || null}
          />
        </Frame>
        <Frame
          initialContent={initialFrameContent()}
          id="rcw-msg-bubble-frame"
          style={{
            opacity: 0,
            display: this.state.msgBubbleFrameDisplay,
            marginBottom: launcherImgStyle,
          }}
          aria-live="polite"
        >
          {this.props.advanceSetting.bubble && (
            <MessageBubble
              openChat={this.props.onToggleConversation}
              onClose={this.props.onCloseMessageBubble}
              headAvatar={this.props.advanceSetting.bubble.avatar || null}
              content={this.props.advanceSetting.bubble.content || null}
            />
          )}
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
                  advance={this.props.advanceSetting.launcher || null}
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
  advanceSetting: PropTypes.object,
  onCloseMessageBubble: PropTypes.func,
};

export default connect(store => ({
  showChat: store.behavior.get('showChat'),
  showBubble: store.behavior.get('showBubble'),
  disabledInput: store.behavior.get('disabledInput'),
}))(WidgetLayout);
