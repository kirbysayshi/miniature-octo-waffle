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
export function createMenuItemEnter (item) {
  return {
    type: MENU_ITEM_ENTER,
    item,
  }
}

export const MENU_ITEM_LEAVE = 'MENU_ITEM_LEAVE';
export function createMenuItemLeave (item) {
  return {
    type: MENU_ITEM_LEAVE,
    item,
  }
}

export const MENU_PANES_MEASURED = 'MENU_PANES_MEASURED';
export function createMenuPanesMeasured (panes, measures) {
  return {
    type: MENU_PANES_MEASURED,
    panes,
    measures,
  }
}
