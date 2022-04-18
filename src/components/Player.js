import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import '../css/Player.css';

const playerSource = {
  beginDrag(props) {
    console.log('dragging');
    return props.player;
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    return props.handleDrop(props.player.id);
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}

class player extends Component {
  render() {
    const { isDragging, connectDragSource, player } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(
      <div className="player" style={{ opacity }}>
        <span>ID: {player.id}</span>
        <span>Name: {player.last_name}, {player.first_name}</span>
        <span>Status: {player.status} | Gender: {player.gender} | Note: {player.note}</span>
      </div>
    );
  }
}

export default DragSource('player', playerSource, collect)(player);
