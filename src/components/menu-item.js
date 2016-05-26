import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

const MenuItem = ({
  item,
  isHighlighted,
  isChecked,
  onShouldRenderSubMenu,
  onMouseEnter,
  onMouseLeave,
}) => {

  const itemStyle = {
    position: 'relative',
  }

  const classes = cx({ highlighted: isHighlighted });

  return (
    <li
      className={classes}
      style={itemStyle}
      onClick={e => { e.stopPropagation(); console.log(item.name) }}
      onMouseEnter={e => onMouseEnter(item)}
      onMouseLeave={e => onMouseLeave(item)}
      data-item-id={item.id}
      key={item.id}
    >
      <span className='check-slot'>
      {item.checkable && <input type='checkbox' checked={isChecked} />}
      </span>
      {item.name} {item.items && <span>&#10097;</span>}
      {item.items && isHighlighted && onShouldRenderSubMenu()}
    </li>
  );
}

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  isHighlighted: PropTypes.bool.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onShouldRenderSubMenu: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
}

export default MenuItem;