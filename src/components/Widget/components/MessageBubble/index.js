import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import messageBubbleTail from '@assets/message_bubble_tail.svg';
import close from '@assets/close-button.svg';
import './style.scss';

const MessageBubble = props =>
  <div className="message-bubble-frame">
    <div className="initial-message-bubble">
      <button type="button" className="initial-message-close-button" tabIndex="0" onClick={props.onCloseMessageBubble}>
        <img src={close} alt="react chat widget frame message bubble close" style={{width: "80%"}} />
      </button>
      <div onClick={props.toggleChat}>
        <div className="initial-message-avatar justify-center">
          <div className="justify-center" style={{height: "48px"}}>
            <div className="chat-head" style={{width: "48px"}}>
              <img src={props.titleAvatar} alt="react chat widget frame message bubble avatar" style={{width: "100%"}} />
            </div>
          </div>
        </div>
        <p className="initial-message-text" dangerouslySetInnerHTML={{ __html: props.advanceSetting.messageBubble.content }} />
      </div>
      <div className="initial-bubble-tail-wrapper">
        <img alt="react chat widget frame message bubble tail" className="private-image" src={messageBubbleTail} />
      </div>
    </div>
  </div>;

MessageBubble.propTypes = {
  toggleChat: PropTypes.func,
  onCloseMessageBubble: PropTypes.func,
  bubbleOpened: PropTypes.bool,
  titleAvatar: PropTypes.string,
  advanceSetting: PropTypes.object,
};

export default connect(store => ({
  bubbleOpened: store.behavior.get('showChat')
}))(MessageBubble);
