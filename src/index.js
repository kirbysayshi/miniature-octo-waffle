import {
  createStore,
  combineReducers
} from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import menuReducer from './menu-reducer';
import MenuSystem from './components/menu-system';

let itemIndex = 0;

const INITIAL_STATE = {

  menu: {
    highlighted: [],
    checked: [],
    id: 'item-' + (++itemIndex),
    items: [
      {
        id: 'item-' + (++itemIndex),
        name: 'File',
        items: [
          {
            id: 'item-' + (++itemIndex),
            name: 'New Tab',
          },

          {
            id: 'item-' + (++itemIndex),
            type: 'SEPARATOR',
          },

          {
            id: 'item-' + (++itemIndex),
            name: 'Exit',
          }
        ]
      },

      {
        id: 'item-' + (++itemIndex),
        name: 'Edit',
      },

      {
        id: 'item-' + (++itemIndex),
        name: 'View',
        items: [
          {
            id: 'item-' + (++itemIndex),
            name: 'Text Encoding',
            items: [
              {
                id: 'item-' + (++itemIndex),
                name: 'Auto-Detect',
                items: [
                  {
                    id: 'item-' + (++itemIndex),
                    name: '(Off)',
                    checkable: true,
                  },

                  {
                    id: 'item-' + (++itemIndex),
                    name: 'Russian',
                    checkable: true,
                  },

                  {
                    id: 'item-' + (++itemIndex),
                    name: 'Japanese',
                    checkable: true,
                  },

                  {
                    id: 'item-' + (++itemIndex),
                    name: 'Ukrainian',
                    checkable: true,
                  }
                ]
              },

              {
                id: 'item-' + (++itemIndex),
                name: 'Unicode',
                checkable: true,
              },

              {
                id: 'item-' + (++itemIndex),
                name: 'Western',
                checkable: true,
              }
            ]
          }
        ]
      },
    ]
  }
}

let store = createStore(menuReducer, INITIAL_STATE/*, function (reducer) {
  return function (state, action) {
    let incoming = state;
    let outgoing = reducer(state, action);
    if (incoming !== outgoing) {
      linkify(outgoing.menu);
    }
    return outgoing;
  }
}*/);

store.subscribe(() => {
  const state = store.getState();
  //console.log(state);
  render();
});

function render () {
  const rootElement = document.getElementById('root');
  const state = store.getState();
  //console.log(state);
  ReactDOM.render(<MenuSystem menu={state.menu} dispatch={store.dispatch} />, rootElement);
}

render();

