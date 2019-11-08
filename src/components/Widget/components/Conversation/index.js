import React from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import Messages from './components/Messages';
import Sender from './components/Sender';
import QuickButtons from './components/QuickButtons';
import './style.scss';

const Conversation = props =>
  <div className={`rcw-conversation-container ${window.innerWidth < 768 ? 'rcw-mobile' : ''}`}>
    <Header
      title={props.title}
      subtitle={props.subtitle}
      toggleChat={props.toggleChat}
      showCloseButton={props.showCloseButton}
      titleAvatar={props.titleAvatar}
    />
    <Messages
      profileAvatar={props.profileAvatar}
    />
    <QuickButtons onQuickButtonClicked={props.onQuickButtonClicked} />
    <Sender
      sendMessage={props.sendMessage}
      placeholder={props.senderPlaceHolder}
      disabledInput={props.disabledInput}
      autofocus={props.autofocus}
    />
    {props.advanceSetting && props.advanceSetting.brand &&
      <div className="rcw-branding">
        <span>Powered by <a href={props.advanceSetting.brand.link} target="_blank">{props.advanceSetting.brand.name}</a></span>
      </div>
    }
  </div>;

Conversation.propTypes = {
  title: PropTypes.string,
  titleAvatar: PropTypes.string,
  subtitle: PropTypes.string,
  sendMessage: PropTypes.func,
  senderPlaceHolder: PropTypes.string,
  profileAvatar: PropTypes.string,
  toggleChat: PropTypes.func,
  showCloseButton: PropTypes.bool,
  disabledInput: PropTypes.bool,
  autofocus: PropTypes.bool,
  advanceSetting: PropTypes.object,
};

export default Conversation;
