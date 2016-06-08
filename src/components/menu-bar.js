import React, { PropTypes } from 'react';

import MenuItem from '../containers/menu-item';
import MenuPane from '../containers/menu-pane';

const barStyle = {
  position: 'relative',
};

const barItemStyle = {
  position: 'relative',
  float: 'left',
  minWidth: '5vw',
}

const MenuBar = ({
  items,
  panes,
  layouts,
  onClick,
}) => {

  return (
    <div style={barStyle}>
      {items.map(item => {
        return (
          <div
            key={item.id}
            style={barItemStyle}
            onClick={e => onClick(item, e.target.getBoundingClientRect())}
          >
          {item.name}
          </div>
        )
      })}

      {panes.map((pane, idx) => {
        // AKA parents
        return <MenuPane
          key={idx}
          items={pane.items}
          layout={layouts[idx]}
        />
      })}

    </div>
  );
}

MenuBar.propTypes = {
  items: PropTypes.array.isRequired,
  panes: PropTypes.array.isRequired,
  layouts: PropTypes.array.isRequired,

  onClick: PropTypes.func.isRequired,
}

export default MenuBar;
