import React from 'react';
import PropTypes from 'prop-types';
import messageBubbleTail from '@assets/message_bubble_tail.svg';
import close from '@assets/close-button.svg';
import './style.scss';

const MessageBubble = props => (
  <div className="message-bubble-frame">
    <div className="initial-message-bubble">
      <button
        type="button"
        className="initial-message-close-button"
        tabIndex="0"
        onClick={props.onClose}
      >
        <img src={close} alt="close" style={{width: '80%'}} />
      </button>
      <div onClick={props.openChat}>
        <div className="initial-message-avatar justify-center">
          <div className="justify-center" style={{height: '48px'}}>
            <div className="chat-head" style={{width: '48px'}}>
              <img
                src={props.headAvatar}
                alt="Avatar"
                style={{width: '100%'}}
              />
            </div>
          </div>
        </div>
        <p
          className="initial-message-text"
          dangerouslySetInnerHTML={{__html: props.content}}
        />
      </div>
      <div className="initial-bubble-tail-wrapper">
        <img alt="tail" className="private-image" src={messageBubbleTail} />
      </div>
    </div>
  </div>
);

MessageBubble.propTypes = {
  openChat: PropTypes.func,
  onClose: PropTypes.func,
  headAvatar: PropTypes.string,
  content: PropTypes.string,
};

export default MessageBubble;
