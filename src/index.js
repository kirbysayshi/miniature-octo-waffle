import {
  createStore,
  combineReducers
} from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import menuReducer, { linkify } from './menu-reducer';
import { createSetRenderSize } from './actions';

import Menus from './containers/menus';

let itemIndex = 0;

const INITIAL_STATE = {

  menu: {

    renderWidth: window.innerWidth,
    renderHeight: window.innerHeight,
    layouts: [],
    panes: [],
    highlighted: [],
    checked: [],
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
        items: [],
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
              },

              {
                id: 'item-' + (++itemIndex),
                name: 'Auto-Detect 2',
                items: [
                  {
                    id: 'item-' + (++itemIndex),
                    name: '(Off) 2',
                    checkable: true,
                  },

                  {
                    id: 'item-' + (++itemIndex),
                    name: 'Russian 2',
                    checkable: true,
                  },

                  {
                    id: 'item-' + (++itemIndex),
                    name: 'Japanese 2',
                    checkable: true,
                  },

                  {
                    id: 'item-' + (++itemIndex),
                    name: 'Ukrainian 2',
                    checkable: true,
                  }
                ]
              },
            ]
          }
        ]
      },
    ]
  }
}

INITIAL_STATE.menu.items.forEach(linkify);

let store = createStore(combineReducers({ menu: menuReducer }), INITIAL_STATE);

window.addEventListener('resize', () => {
  store.dispatch(createSetRenderSize(window.innerWidth, window.innerHeight));
});

store.subscribe(() => {
  const state = store.getState();
  render();
});

function render () {
  const rootElement = document.getElementById('root');
  const state = store.getState();
  ReactDOM.render(
    <Provider store={store}>
      <Menus />
    </Provider>,
    rootElement
  );
}

render();



