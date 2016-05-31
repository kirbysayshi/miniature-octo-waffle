import React, { Component, PropTypes } from 'react';

import HighlightableMenuItem from '../containers/highlightable-menu-item';

export default class MenuPane extends Component {

  render () {
    const {
      item,
      highlighted,
      checked,
    } = this.props;

    const paneStyle = {
      position: 'absolute',
      left: '100%',
      listStyleType: 'none',
      paddingLeft: 0,
    }

    return (
      <ul style={paneStyle}>
        {item.items.map(child => {

          const isHighlighted = highlighted.indexOf(child.id) > -1;
          const isChecked = checked.indexOf(item.id) > -1;

          return <HighlightableMenuItem
            key={child.id}
            item={child}
            isHighlighted={isHighlighted}
            isChecked={isChecked}
            onShouldRenderSubMenu={function () {
              return <MenuPane
                item={child}
                highlighted={highlighted.slice(1)}
                checked={checked}
              />
            }}
          />
        })}
      </ul>
    )
  }
}

MenuPane.propTypes = {
  item: PropTypes.object.isRequired,
  highlighted: PropTypes.array.isRequired,
  checked: PropTypes.array.isRequired,
}