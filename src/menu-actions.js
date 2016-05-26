export const MENU_SELECT = 'MENU_SELECT';
export function createOpenMenu (id) {
  return {
    type: MENU_SELECT,
    menuId: id
  }
}

export const MENU_ITEM_ENTER = 'MENU_ITEM_ENTER';
export function createMenuItemEnter (item) {
  return {
    type: MENU_ITEM_ENTER,
    item: item
  }
}

export const MENU_ITEM_LEAVE = 'MENU_ITEM_LEAVE';
export function createMenuItemLeave (item) {
  return {
    type: MENU_ITEM_LEAVE,
    item: item
  }
}