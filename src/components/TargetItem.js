import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import {moveItem} from '../MoveItem.js';
import '../css/TargetItem.css';

let itemTarget = {
  drop: function(props, mointor) {
    console.log('Moving Called');
    console.log(props.itemPosition);
    moveItem(props.itemPosition);
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    player: monitor.getItem(),
  }
}

class TargetItem extends Component {
  render() {
    const { connectDropTarget, hovered, player } = this.props;
    const background = hovered ? 'lightgreen' : 'rgb(53, 117, 211, 0.85)';

    return connectDropTarget(
      <div className="targetItem" style={{background}}>
        <p className="targetTitle">{this.props.target.title}</p>
      </div>
    );
  }
}

TargetItem.propTypes = {
  target: PropTypes.object
};

export default DropTarget('player', itemTarget, collect)(TargetItem);
