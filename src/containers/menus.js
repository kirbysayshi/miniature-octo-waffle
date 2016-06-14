import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

const barItemStyle = {
  position: 'relative',
  float: 'left',
  minWidth: '5vw',
}

const basePaneStyle = {
  position: 'absolute',
  listStyleType: 'none',
  margin: 0,
  padding: 0,
}

class Menus extends Component {

  constructor (props) {
    super(props);
    this.paneNodesToMeasure = [];
  }

  componentDidUpdate (prevProps, prevState) {

    const { onPanesMeasured, panes } = this.props;

    if (this.paneNodesToMeasure.length) {
      // need to measure everything and rerender
      const measures = this.paneNodesToMeasure.map(node => {
        return node.getBoundingClientRect()
      });

      this.paneNodesToMeasure.length = 0;
      onPanesMeasured(panes, measures);
    }
  }

  render () {

    const { layouts, panes, checked, highlighted } = this.props;

    const topLevel = this.props.items.map(item => (
      <div
        key={item.id}
        style={barItemStyle}
        onClick={(e) => {
          this.props.onItemClick(item);
        }}
        ref={n => {
          if (
            highlighted.indexOf(item.id) > -1
            && !layouts.find(l => l.id === item.id)
            && n
          ) {
            this.paneNodesToMeasure.push(n);
          }
        }}
      >
      {item.name}
      </div>
    ));

    const renderPanes = panes.map((pane, i) => {
      let layout = layouts[i];

      const paneStyle = {
        ...basePaneStyle,
        left: layout ? layout.left + 'px' : 0,
        top: layout ? layout.top + 'px' : 0,
      };

      return (
        <ul
          style={paneStyle}
        >
        {pane.items.map(item => {
          const isChecked = checked.indexOf(item.id) > -1;
          const isHighlighted = highlighted.indexOf(item.id) > -1;
          return (
            <li
              onMouseEnter={() => this.props.onItemMouseEnter(item)}
              onMouseLeave={() => this.props.onItemMouseLeave(item)}
              ref={n => {
                if (!layout && isHighlighted && n) this.paneNodesToMeasure.push(n);
              }}
            >
              <span className='check-slot'>
              {item.checkable && <input type='checkbox' checked={isChecked} />}
              </span>
              {item.name} {item.items && <span>&#10097;</span>}
            </li>
          )
        })}
        </ul>
      )
    });

    return (
      <div>
        {topLevel}
        {renderPanes}
      </div>
    )

  }

}

Menus.propTypes = {
  items: PropTypes.array.isRequired,
  panes: PropTypes.array.isRequired,
  layouts: PropTypes.array.isRequired,

  onPanesMeasured: PropTypes.func.isRequired,
  onItemClicked: PropTypes.func.isRequired,
  onItemMouseEnter: PropTypes.func.isRequired,
  onItemMouseLeave: PropTypes.func.isRequired,
};

import {
  createMenuSelect,
  createMenuItemEnter,
  createMenuItemLeave,
  createMenuPanesMeasured,
} from '../menu-actions';

export default connect(

function state (state) {
  return {
    ...state.menu
  }
}, function dispatches (dispatch) {
  return {
    onPanesMeasured: (panes, measures) => dispatch(createMenuPanesMeasured(panes, measures)),
    onItemClick: (item) => dispatch(createMenuSelect(item)),
    onItemMouseEnter: (item) => dispatch(createMenuItemEnter(item)),
    onItemMouseLeave: (item) => dispatch(createMenuItemLeave(item)),
  }
})(Menus);
