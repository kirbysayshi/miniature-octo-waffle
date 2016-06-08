import { connect } from 'react-redux';

import MenuItem from '../components/menu-item';

import {
  createMenuItemSelect,
  createMenuItemEnter,
  createMenuItemLeave,
} from '../menu-actions';

const MenuItemContainer = connect(

  function state (state, ownProps) {
    return state.menu;
  },

  function dispatches (dispatch) {
    return {
      onClick: (item, rect) => dispatch(createMenuItemSelect(item)),
      onMouseEnter: (item, rect) => dispatch(createMenuItemEnter(item, rect)),
      onMouseLeave: (item, rect) => dispatch(createMenuItemLeave(item, rect)),
    }
  }

)(MenuItem);

export default MenuItemContainer;
