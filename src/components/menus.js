import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

class Menus extends Component {

  recursiveRender (items, highlighted, checked) {

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
              onMouseEnter={e => this.props.onMouseEnterPane(item)}
              onMouseLeave={e => this.props.onMouseLeavePane(item)}
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
    } = this.props;

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

Menus.propTypes = {
  items: PropTypes.array.isRequired,
  highlighted: PropTypes.array.isRequired,
  checked: PropTypes.array.isRequired,

  onMouseEnterPane: PropTypes.func.isRequired,
  onMouseLeavePane: PropTypes.func.isRequired
}

export default Menus;