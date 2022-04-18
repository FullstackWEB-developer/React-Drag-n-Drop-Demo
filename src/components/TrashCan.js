import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import '../css/TrashCan.css';

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    player: monitor.getItem(),
  }
}

class TrashCan extends Component {
  render() {
    const { connectDropTarget, hovered, player } = this.props;
    const background = hovered ? '#e60000' : 'rgb(255, 102, 102, 0.85)';

    return connectDropTarget(
      <div className="trashcan" style={{background}}>
        <p className="trashcanTitle">{this.props.trashcan.title}</p>
      </div>
    );
  }
}

TrashCan.propTypes = {
  trashcan: PropTypes.object
};

export default DropTarget('player', {}, collect)(TrashCan);
