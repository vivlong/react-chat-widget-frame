import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import openLauncher from '@assets/launcher_button.svg';
import close from '@assets/clear-button.svg';
import Badge from './components/Badge';
import './style.scss';

const Launcher = props => (
  <div>
    {props.advance && props.advance.img && (
      <img src={props.advance.img.src} style={props.advance.img.style} />
    )}
    <button
      type="button"
      className={props.chatOpened ? 'rcw-launcher rcw-hide-sm' : 'rcw-launcher'}
      onClick={props.toggle}
    >
      <Badge badge={props.badge} />
      {props.chatOpened ? (
        <img src={close} className="rcw-close-launcher" alt="" />
      ) : (
        <img src={openLauncher} className="rcw-open-launcher" alt="" />
      )}
    </button>
  </div>
);

Launcher.propTypes = {
  toggle: PropTypes.func,
  chatOpened: PropTypes.bool,
  badge: PropTypes.number,
  advance: PropTypes.object,
};

export default connect(store => ({
  chatOpened: store.behavior.get('showChat'),
}))(Launcher);
