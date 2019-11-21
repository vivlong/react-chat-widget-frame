import React from 'react';
import PropTypes from 'prop-types';
import close from '@assets/clear-button.svg';
import './style.scss';

const Header = props => (
  <div className="rcw-header">
    {(props.showCloseButton || window.innerWidth < 768) && (
      <button className="rcw-close-button" onClick={props.toggleChat}>
        <img src={close} className="rcw-close" alt="close" />
      </button>
    )}
    <h4 className="rcw-title">
      {props.titleAvatar && (
        <img src={props.titleAvatar} className="avatar" alt="profile" />
      )}
      {props.title}
    </h4>
    {props.subtitle && (
      <span>{props.subtitle}</span>
    )}
  </div>
);

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  toggleChat: PropTypes.func,
  showCloseButton: PropTypes.bool,
  titleAvatar: PropTypes.string,
};
export default Header;
