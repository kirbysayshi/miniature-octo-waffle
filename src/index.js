import { createStore } from 'redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import cx from 'classnames';

const MENU_SELECT = 'MENU_SELECT';

function createOpenMenu (id) {
  return {
    type: MENU_SELECT,
    menuId: id
  }
}

const MENU_ITEM_ENTER = 'MENU_ITEM_ENTER';
function createMenuItemEnter (item) {
  return {
    type: MENU_ITEM_ENTER,
    item: item
  }
}

const MENU_ITEM_LEAVE = 'MENU_ITEM_LEAVE';
function createMenuItemLeave (item) {
  return {
    type: MENU_ITEM_LEAVE,
    item: item
  }
}

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

function reducer (state, action) {
  switch(action.type) {

    case MENU_SELECT: {
      const selectedPath = pathTo(state.menu, i => i.highlighted === true);
      const nextMenu = state.menu.items.find(m => m.id === action.id);
      return state;
    }

    case MENU_ITEM_ENTER: {

      // find all the ancestors
      const ids = [];
      let child = action.item;
      while (child) {
        ids.unshift(child.id);
        child = child.parent;
      }

      return {
        ...state,
        menu: linkify({
          ...state.menu,
          highlighted: ids,
        })
      }
    }

    /*case MENU_ITEM_LEAVE: {

      const last = state.menu.highlighted[state.menu.highlighted.length - 1];

      console.log('last', last);

      return {
        ...state,
        menu: linkify({
          ...state.menu,
          highlighted: last === action.item.id
            ? state.menu.highlighted.slice(-1)
            : state.menu.highlighted,
        })
      }
    }*/

    default:
      linkify(state.menu);
      return state;
  }
}

// Add parent references to every child, in place
function linkify (parent) {
  if (!parent.items) return parent;
  parent.items.forEach(child => {
    child.parent = parent;
    linkify(child);
  });

  return parent;
}

function upwards (root, child, fn) {
  let current = child;
  while (current && current.parent) {
    fn(root, current);
    current = current.parent;
  }
  fn (root, current); // root === current
}

class MenuSystem extends Component {

  recursiveRender (items, highlighted, checked) {
    const { dispatch } = this.props;

    const listStyle = {
      position: 'absolute',
      top: '0px',
      left: '100%',
      width: '20vw',
      listStyleType: 'none',
      paddingLeft: '0px',
    };

    const itemStyle = {
      position: 'relative',
    }

    return (
      <ul style={listStyle}>
        {items.map(item => {
          const foundHighlight = highlighted[0] === item.id;
          const foundChecked = checked.indexOf(item.id) > -1;
          const classes = cx({ highlighted: foundHighlight });
          return (
            <li
              className={classes}
              style={itemStyle}
              onClick={e => { e.stopPropagation(); console.log(item.name) }}
              onMouseEnter={e => dispatch(createMenuItemEnter(item))}
              onMouseLeave={e => dispatch(createMenuItemLeave(item))}
              data-item-id={item.id}
              key={item.id}
            >
              <span className='check-slot'>
              {item.checkable && <input type='checkbox' checked={foundChecked} />}
              </span>
              {item.name} {item.items && <span>&#10097;</span>}
              {item.items && foundHighlight
                && this.recursiveRender(
                  item.items,
                  highlighted.slice(1),
                  checked)}
            </li>
          );
        })}
      </ul>
    )
  }

  render () {
    const {
      items, highlighted, checked
    } = this.props.menu;

    const style = {
      position: 'relative',
      width: '0%',
    };

    return (
      <div style={style}>
        {this.recursiveRender(items, highlighted.slice(1), checked)}
      </div>
    );
  }
}

let store = createStore(reducer, INITIAL_STATE/*, function (reducer) {
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

