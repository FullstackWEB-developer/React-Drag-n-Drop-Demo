import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import uuid from 'uuid';
import TrashCan from '../components/TrashCan.js';

class Trash extends Component {
  constructor() {
    super();
    this.state = {
      trashcan: {
        id: uuid.v4(),
        title: 'Trash Can'
      }
    }
  }

  render() {
    let trashcan;
    if (this.state.trashcan) {
      trashcan = this.state.trashcan;
      return (
        <TrashCan key={trashcan.id} trashcan={trashcan} />
      );
    }

    return (
      <div className="trash-container">
        <p className="trash-container-title">Trash Container</p>
        {trashcan}
      </div>
    );
  }
}

export default Trash;
