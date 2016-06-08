import test from 'tape';
import reducer, { linkify } from '../src/menu-reducer';

let itemIndex = 0;

const state = {

  renderWidth: 1000,
  renderHeight: 800,
  rects: {},
  layouts: [],
  panes: [],
  highlighted: [],
  checked: [],
  items: [

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
              ]
            },
          ]
        }
      ]
    }
  ]
};

state.items.forEach(linkify);

test('MENU_ITEM_ENTER', t => {

  let next = state;

  // Prime reducer
  next = reducer(next, {});

  next = reducer(next, {
    type: 'MENU_ITEM_ENTER',
    item: state.items[0],
    rect: { width: 100, top: 0, left: 10 },
  });

  next = reducer(next, {
    type: 'MENU_ITEM_ENTER',
    item: state.items[0].items[0],
    rect: { width: 100, top: 0 },
  });

  next = reducer(next, {
    type: 'MENU_ITEM_ENTER',
    item: state.items[0].items[0].items[0],
    rect: { width: 100, top: 0 },
  });

  next = reducer(next, {
    type: 'MENU_ITEM_ENTER',
    item: state.items[0].items[0].items[0].items[0],
    rect: { width: 100, top: 0 },
  });

  t.deepEqual(next.highlighted, [
    state.items[0].id,
    state.items[0].items[0].id,
    state.items[0].items[0].items[0].id,
    state.items[0].items[0].items[0].items[0].id,
  ], 'all higlighted ids are listed');

  t.deepEqual(next.panes, [
    state.items[0],
    state.items[0].items[0],
    state.items[0].items[0].items[0],
  ], 'parent panes are listed');

  t.deepEqual(next.layouts, [
    { id: state.items[0].id, left: 10, top: 0, },
    { id: state.items[0].items[0].id, left: 110, top: 0, },
    { id: state.items[0].items[0].items[0].id, left: 210, top: 0, },
  ], 'layouts tell parents where to render children');

  t.end();

});
