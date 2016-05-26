import React, { Component } from 'react';
import cx from 'classnames';

import {
  createMenuItemEnter,
  createMenuItemLeave
} from '../menu-actions';

export default class MenuSystem extends Component {

  recursiveRender (items, highlighted, checked) {
    const { dispatch } = this.props;

    const listStyle = {
      position: 'absolute',
      top: '0px',
      left: '100%',
      width: '20vw',
      listStyleType: 'none',
      paddingLeft: '0px',
    };

    const itemStyle = {
      position: 'relative',
    }

    return (
      <ul style={listStyle}>
        {items.map(item => {
          const foundHighlight = highlighted[0] === item.id;
          const foundChecked = checked.indexOf(item.id) > -1;
          const classes = cx({ highlighted: foundHighlight });
          return (
            <li
              className={classes}
              style={itemStyle}
              onClick={e => { e.stopPropagation(); console.log(item.name) }}
              onMouseEnter={e => dispatch(createMenuItemEnter(item))}
              onMouseLeave={e => dispatch(createMenuItemLeave(item))}
              data-item-id={item.id}
              key={item.id}
            >
              <span className='check-slot'>
              {item.checkable && <input type='checkbox' checked={foundChecked} />}
              </span>
              {item.name} {item.items && <span>&#10097;</span>}
              {item.items && foundHighlight
                && this.recursiveRender(
                  item.items,
                  highlighted.slice(1),
                  checked)}
            </li>
          );
        })}
      </ul>
    )
  }

  render () {
    const {
      items, highlighted, checked
    } = this.props.menu;

    const style = {
      position: 'relative',
      width: '0%',
    };

    return (
      <div style={style}>
        {this.recursiveRender(items, highlighted.slice(1), checked)}
      </div>
    );
  }
}