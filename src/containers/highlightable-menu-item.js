import { connect } from 'react-redux';

import {
  createMenuItemEnter,
  createMenuItemLeave,
} from '../menu-actions';

import MenuItem from '../components/menu-item';

const HighlightableMenuItem = connect(

  function state (state) { return {}; },

  function dispatches (dispatch) {
    return {
      onMouseEnter: (item) => dispatch(createMenuItemEnter(item)),
      onMouseLeave: (item) => dispatch(createMenuItemLeave(item)),
    }
  }

)(MenuItem);

export default HighlightableMenuItem;