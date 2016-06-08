import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

const MenuItem = ({
  item,
  isHighlighted,
  isChecked,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {

  const itemStyle = {};

  const classes = cx({ highlighted: isHighlighted });

  return (
    <li
      className={classes}
      style={itemStyle}
      onClick={e => onClick(item)}
      onMouseEnter={e => onMouseEnter(item, e.currentTarget.getBoundingClientRect())}
      onMouseLeave={e => onMouseLeave(item, e.currentTarget.getBoundingClientRect())}
      data-item-id={item.id}
      key={item.id}
    >
      <span className='check-slot'>
      {item.checkable && <input type='checkbox' checked={isChecked} />}
      </span>
      {item.name} {item.items && <span>&#10097;</span>}
    </li>
  );
}

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  isHighlighted: PropTypes.bool.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
}

export default MenuItem;
