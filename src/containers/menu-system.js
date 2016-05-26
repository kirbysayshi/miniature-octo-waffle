import { connect } from 'react-redux';
import React, { Component } from 'react';

import Menus from '../components/menus';

import {
  createMenuItemEnter,
  createMenuItemLeave,
} from '../menu-actions';

const MenuSystem = connect(

  function state (state) {
    return {
      ...state.menu
    }
  },

  function dispatches (dispatch) {
    return {
      onMouseEnterPane: (item) => dispatch(createMenuItemEnter(item)),
      onMouseLeavePane: (item) => dispatch(createMenuItemLeave(item)),
    }
  }

)(Menus);

export default MenuSystem;