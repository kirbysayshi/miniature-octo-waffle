export const MENU_SELECT = 'MENU_SELECT';
export function createMenuSelect (item, rect) {
  return {
    type: MENU_SELECT,
    item,
    rect,
  }
}

export const MENU_ITEM_SELECT = 'MENU_ITEM_SELECT';
export function createMenuItemSelect (item) {
  return {
    type: MENU_ITEM_SELECT,
    item,
  }
}

export const MENU_ITEM_ENTER = 'MENU_ITEM_ENTER';
export function createMenuItemEnter (item, rect) {
  return {
    type: MENU_ITEM_ENTER,
    item,
    rect,
  }
}

export const MENU_ITEM_LEAVE = 'MENU_ITEM_LEAVE';
export function createMenuItemLeave (item, rect) {
  return {
    type: MENU_ITEM_LEAVE,
    item,
    rect,
  }
}
