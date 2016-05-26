import {
  MENU_SELECT,
  MENU_ITEM_ENTER,
  MENU_ITEM_LEAVE
} from './menu-actions';

export default function reducer (state, action) {
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