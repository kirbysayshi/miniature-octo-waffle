import {
  MENU_SELECT,
  MENU_ITEM_ENTER,
  MENU_ITEM_LEAVE
} from './menu-actions';

import {
  SET_RENDER_SIZE
} from './actions';

export const INITIAL_STATE = {
  renderWidth: 0,
  renderHeight: 0,
  rects: {},
  layouts: [],
  panes: [],
  highlighted: [],
  checked: [],
  items: [],
};

export default function reducer (state = INITIAL_STATE, action) {
  switch(action.type) {

    case SET_RENDER_SIZE:
      return {
        ...state,
        renderWidth: action.width,
        renderHeight: action.height,
      }

    case MENU_SELECT: {

      const highlighted = [];
      const panes = [];

      // menu is opened, ensure clicked top-level item is there
      if (state.highlighted[0] !== action.item.id) {
        highlighted.push(action.item.id);
        panes.push(action.item);
      }

      const rects = {
        ...state.rects,
        [action.item.id]: {
          left: action.rect.left,
          // make the subsequent children render below. This is somewhat a
          // hack, more like an exception for the top-level menu case.
          top: action.rect.bottom,
          right: action.rect.right,
          bottom: action.rect.bottom,
          width: action.rect.width,
          height: action.rect.height,
        }
      }

      const layouts = generateLayouts(rects, panes);

      return {
        ...state,
        panes,
        highlighted,
        rects,
        layouts,
      }
    }

    case MENU_ITEM_ENTER: {

      // find all the ancestors
      const panes = [];
      let parent = action.item.parent;
      while (parent) {
        panes.unshift(parent);
        parent = parent.parent;
      }

      // Collect IDs of highlighted items to avoid having to mutate the entire
      // items tree.
      const highlighted = panes.map(p => p.id);
      highlighted.push(action.item.id);

      // If the item has children, add the item as a pane to render
      // since only children are rendered.
      if (action.item.items) {
        panes.push(action.item);
      }

      const rects = {
        ...state.rects,
        [action.item.id]: action.rect,
      }

      const layouts = generateLayouts(rects, panes);

      return {
        ...state,
        panes,
        highlighted,
        rects,
        layouts,
      }
    }

    /*case MENU_ITEM_LEAVE: {

      const last = state.highlighted[state.highlighted.length - 1];

      console.log('last', last);

      // TODO: delete rect

      return linkify({
        ...state,
        highlighted: last === action.item.id
          ? state.highlighted.slice(-1)
          : state.highlighted,
      })
    }*/

    default:
      return state;
  }
}

// Add parent references to every child, in place
export function linkify (parent) {
  if (!parent.items) return parent;
  parent.items.forEach(child => {
    child.parent = parent;
    linkify(child);
  });

  return parent;
}

function generateLayouts(rects, panes) {
  const layouts = [];
  let x = 0;

  panes.forEach((pane, i) => {

    x += rects[pane.id].width;

    if (i === 0) {
      // start at your current left instead
      x += rects[pane.id].left
      x -= rects[pane.id].width;
    }

    layouts.push({
      id: pane.id,
      top: rects[pane.id].top,
      left: x,
    });

  });

  return layouts
}
