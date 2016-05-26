import React, { Component, PropTypes } from 'react';

import MenuPane from './menu-pane';

class Menus extends Component {

  render () {
    const {
      items, highlighted, checked, onClick
    } = this.props;

    const style = {
      position: 'relative',
    };

    // TODO: throw some flex box in here

    return (
      <div style={style}>
        {items.map(child => {
          const isHighlighted = highlighted.indexOf(child.id) > -1;
          return (
            <div style={{
              position: 'relative',
              float: 'left',
            }}
            onClick={e => onClick(child)}
            key={child.id}
            >
            {child.name}
            {isHighlighted && <MenuPane item={child} highlighted={highlighted.slice(1)} checked={checked} />}
            </div>
          )
        })}
      </div>
    );
  }
}

Menus.propTypes = {
  items: PropTypes.array.isRequired,
  highlighted: PropTypes.array.isRequired,
  checked: PropTypes.array.isRequired,

  onClick: PropTypes.func.isRequired,
}

export default Menus;