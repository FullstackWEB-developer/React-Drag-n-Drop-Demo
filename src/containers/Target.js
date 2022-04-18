import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import TargetItem from '../components/TargetItem.js';
import uuid from 'uuid';

class Target extends Component {
  constructor() {
    super();
    this.state = {
      targets: [
        {
          id: uuid.v4(),
          title: 'Team 1'
        },
        {
          id: uuid.v4(),
          title: 'Team 2'
        },
        {
          id: uuid.v4(),
          title: 'Team 3'
        }
      ]
    }
  }
  render() {
    let targetItems;
    if (this.state.targets) {
      targetItems = this.state.targets.map(target => {
        {/*console.log(target);*/}
        return (
          <TargetItem key={target.id} target={target} />
        );
      })
    }

    return (
      <div className="target-container">
        <p className="target-container-title">Team Roster</p>
        {targetItems}
      </div>
    );
  }
}

export default Target;
