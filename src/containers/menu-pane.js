import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import MenuItem from '../containers/menu-item';

const baseStyle = {
  position: 'absolute',
  listStyleType: 'none',
  margin: 0,
  padding: 0,
}

export const MenuPane = ({
  items,
  layout,
  highlighted,
  checked
}) => {

  const style ={
    ...baseStyle,
    left: layout.left + 'px',
    top: layout.top + 'px',
  }

  return (
    <ul style={style}>
    {items.map(item =>
      <MenuItem {...{
        key: item.id,
        item,
        isHighlighted: highlighted.indexOf(item.id) > -1,
        isChecked: checked.indexOf(item.id) > -1,
      }} />
    )}
    </ul>
  )
}

export default connect(

  // Nice to use redux for state selection purposes, rather
  // than passing a ton down.
  function state (state) {
    return {
      highlighted: state.menu.highlighted,
      checked: state.menu.checked,
    }
  }

)(MenuPane);
