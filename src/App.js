import logo from './logo.svg';
import './css/App.css';
import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd'
import $ from 'jquery';
import uuid from 'uuid';
import Target from './containers/Target.js';
import Trash from './containers/Trash.js';
import Player from './components/Player.js';
import Card from './components/Card.js';
import AddPlayer from './components/AddPlayer.js';

const update = require('immutability-helper');

class App extends Component {
  constructor() {
    super();
    this.state = {
      players: [],
      cards: []
    }
  }

  getPlayers() {
    let active = [];
    let inactive = [];
    $.ajax({
      url: 'http://s3.amazonaws.com/dii-test/data.json',
      dataType: 'json',
      cache: false,
      success: function(data){
        data.forEach(function(data) {
          data.id = uuid.v4();
          if (data.status === 'ACTIVE') {
            active.push(data);
          } else {
            inactive.push(data);
          }
        });
        this.setState({players: active}, function() {
          {/*console.log(this.state.players);*/}
        });
        this.setState({cards: inactive}, function() {
          {/*console.log(this.state.cards);*/}
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }
    });
  }

  handleAddPlayer(player) {
    let players = this.state.players;
    let cards = this.state.cards;

    if (player.status === 'ACTIVE') {
      players.push(player);
      this.setState({players: players});
    } else {
      cards.push(player);
      this.setState({cards: cards});
    }
  }

  componentWillMount() {
    this.getPlayers();
  }

  componentDidMount() {
    this.getPlayers();
  }

  deleteplayer = id => {
    this.setState(prevState => {
      return {
        players: prevState.players.filter(player => player.id !== id)
      }
    })
  }

  moveCard = (dragIndex, hoverIndex) => {
    const { cards } = this.state;
    const dragCard = cards[dragIndex];

    this.setState(
      update(this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        },
      }),
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Your Player Manager</h1>
        </header>

        <div className="App-intro">
          <div className="app-container">
            <div className="player-container">
              <p className="player-container-title">Active Players</p>
              {this.state.players.map((player, index) => (
                <Player key={player.id} player={player} handleDrop={(id) => this.deleteplayer(id)} />
              ))}
            </div>
            <Target />
            <Trash />
          </div>

          <div className="card-container">
            <p>Inactive Players</p>
            {this.state.cards.map((card, i) => (
              <Card
                key={card.id}
                index={i}
                id={card.id}
                text={card.status}
                moveCard={this.moveCard}
                firstName={card.first_name}
                lastName={card.last_name}
                gender={card.gender}
                note={card.note}
              />
            ))}
          </div>

          <div className="add-player-container">
            <AddPlayer addPlayer={this.handleAddPlayer.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
