export const MENU_SELECT = 'MENU_SELECT';
export function createMenuSelect (item) {
  return {
    type: MENU_SELECT,
    item
  }
}

export const MENU_ITEM_ENTER = 'MENU_ITEM_ENTER';
export function createMenuItemEnter (item) {
  return {
    type: MENU_ITEM_ENTER,
    item
  }
}

export const MENU_ITEM_LEAVE = 'MENU_ITEM_LEAVE';
export function createMenuItemLeave (item) {
  return {
    type: MENU_ITEM_LEAVE,
    item
  }
}