import React, { Component } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';

class AddPlayer extends Component {
  constructor() {
    super();
    this.state = {
      newItem: {}
    }
  }

  static defaultProps = {
    statuses: ['ACTIVE', 'INACTIVE'],
    genders: ['MALE', 'FEMALE']
  }

  handleSubmit(e) {
    if (this.refs.first_name.value === '') {
      alert('First name is required');
    } else if (this.refs.last_name.value === ''){
      alert('Last name is required');
    } else {
      this.setState({newItem: {
        id: uuid.v4(),
        first_name: this.refs.first_name.value,
        last_name: this.refs.last_name.value,
        gender: this.refs.gender.value,
        note: this.refs.note.value,
        status: this.refs.status.value
      }}, function() {
        this.props.addPlayer(this.state.newItem);
      });
    }
    e.preventDefault();
  }

  render() {
    let statusOptions = this.props.statuses.map(status => {
      return <option key={status} value={status}>{status}</option>
    });

    let genderOptions = this.props.genders.map(gender => {
      return <option key={gender} value={gender}>{gender}</option>
    })
    return (
      <div className="AddPlayer">
        <h3>Add Player</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>First Name</label>
            <br />
            <input type="text" ref="first_name" />
          </div>
          <div>
            <label>Last Name</label>
            <br />
            <input type="text" ref="last_name" />
          </div>
          <div>
            <label>Gender</label>
            <br />
            <select ref="gender">
              {genderOptions}
            </select>
          </div>
          <div>
            <label>Note</label>
            <br />
            <textarea ref="note" />
          </div>
          <div>
            <label>Status</label>
            <br />
            <select ref="status">
              {statusOptions}
            </select>
          </div>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

AddPlayer.propTypes = {
    statuses: PropTypes.array,
    addPlayer: PropTypes.func
};

export default AddPlayer;
