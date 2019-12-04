import { Map } from 'immutable';

import { createReducer } from '@utils/store';

import * as actionTypes from '../actions/actionTypes';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';

const initialState = Map({ showChat: false, disabledInput: false, msgLoader: false, showBubble: false, bubbleObj: null });

const behaviorReducer = {
  [actionTypes.TOGGLE_CHAT]: state =>
    state.update('showChat', showChat => !showChat),

  [actionTypes.TOGGLE_INPUT_DISABLED]: state =>
    state.update('disabledInput', disabledInput => !disabledInput),

  [actionTypes.TOGGLE_MSG_LOADER]: state =>
    state.update('msgLoader', msgLoader => !msgLoader),

  [actionTypes.SHOW_MSG_BUBBLE]: state =>
    state.update('showBubble', showBubble => !showBubble),

  [actionTypes.SET_MSG_BUBBLE]: (state, { object }) =>
    state.update('bubbleObj', bubbleObj => object ),
};

export default (state = initialState, action) => createReducer(behaviorReducer, state, action);
