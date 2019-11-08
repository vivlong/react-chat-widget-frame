import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import Widget from './components/Widget';
import store from '../src/store/store';

const ConnectedWidget = props =>
  <Provider store={store}>
    <Widget {...props} />
  </Provider>;

ConnectedWidget.propTypes = {
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
  launcher: PropTypes.func,
  onToggleChat: PropTypes.func,
  advanceSetting: PropTypes.object
};

ConnectedWidget.defaultProps = {
  title: 'Welcome',
  subtitle: 'chat with us onilne',
  senderPlaceHolder: 'Type a message...',
  showCloseButton: false,
  fullScreenMode: false,
  badge: 0,
  autofocus: false,
  advanceSetting: null,
};

export default ConnectedWidget;
