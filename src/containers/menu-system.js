import { connect } from 'react-redux';
import React, { Component } from 'react';

import MenuBar from '../components/menu-bar';

import {
  createMenuSelect
} from '../menu-actions';

const MenuSystem = connect(

  function state (state) {
    return {
      ...state.menu
    }
  },

  function dispatches (dispatch) {
    return {
      onClick: (item) => dispatch(createMenuSelect(item))
    }
  }

)(MenuBar);

export default MenuSystem;