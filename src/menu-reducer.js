import {
  MENU_SELECT,
  MENU_ITEM_ENTER,
  MENU_ITEM_LEAVE
} from './menu-actions';

export const INITIAL_STATE = {
  highlighted: [],
  checked: [],
  id: null,
  items: []
};

export default function reducer (state = INITIAL_STATE, action) {
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

      return linkify({
        ...state,
        highlighted: ids,
      })
    }

    /*case MENU_ITEM_LEAVE: {

      const last = state.highlighted[state.highlighted.length - 1];

      console.log('last', last);

      return linkify({
        ...state,
        highlighted: last === action.item.id
          ? state.highlighted.slice(-1)
          : state.highlighted,
      })
    }*/

    default:
      linkify(state);
      return state;
  }
}

// TODO: this should be in the initial generation, right?
// Add parent references to every child, in place
function linkify (parent) {
  if (!parent.items) return parent;
  parent.items.forEach(child => {
    child.parent = parent;
    linkify(child);
  });

  return parent;
}