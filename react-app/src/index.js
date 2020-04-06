import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  
  state = {
    cssClass: this.getClass()
  };

  render() {
    return (
      <button className={this.state.cssClass} onClick={this.updateSquare}>
        {this.getContent()}
      </button>
    );
  }
  isStart() {
    return this.props.y === 5 && this.props.x === 0;
  }
  isSlowDown() {
    return this.props.y === 5 && this.props.x > 0;
  }
  getContent() {
    if (this.isStart()) {
      return "🚩";
    } else if (this.isSlowDown()) {
      return "•";
    } else {
      return this.props.x + ", " + this.props.y
    }
  }
  getClass() {
    let x = this.props.y;
    let y = this.props.x;
    if (x === 0 || x === 5 || y === 0 || y === 5) {
      return "square";
    } else {
      return "square-hidden"; 
    }
  }
  updateSquare = () => {
    this.setState({
      x: "A",
      y: "B"
    });
  }
}

class DotSquare extends React.Component {
  
  state = {
    cssClass: this.getClass()
  };

  render() {
    return (
      <button className={this.state.cssClass} onClick={this.updateSquare}>
        {this.props.x}, {this.props.y}
      </button>
    );
  }
  getClass() {
    return "square";
  }
  updateSquare = () => {
    this.setState({
      x: "A",
      y: "B"
    });
  }
}

class BZSquare extends React.Component {
  
  render() {
    return (
      <button className={this.getClass()} onClick={this.updateSquare}>
        {this.props.letter}
      </button>
    );
  }
  getClass() {
    return "player-square-" + this.props.color;
  }
  updateSquare = () => {
    this.setState({
      x: "A",
      y: "B"
    });
  }
}

class Row extends React.Component {
  render() {
    return (
      <div className="board-row">
        {this.props.cells}
      </div>
    );
  }
}

class GameBoard extends React.Component {
  
  renderSquare(x, y) {
    let key = y * 10 + x
    return <Square x={x} y={y} key={key}/>;
  }
  
  renderRow(cells, key) {
    return <Row cells={cells} key={key}/>;
  }

  render() {
    var rows = [];
    for (var y=0; y < 6; y++) {
      var row = [];
      for (var x=0; x < 6; x++) {
        row.push(this.renderSquare(x, y));    
      }
      rows.push(this.renderRow(row, y));
    }
    return (
      <div>
        {rows}
      </div>
    );
  }
}

class PlayerBoard extends React.Component {
  
  renderBZSquare(x, color, letter) {
    let key = (color, x);
    return <BZSquare x={x} color={color} key={key} letter={letter}/>;
  }
  
  renderDotSquare(x, dots) {
    let key = x * 10 + dots
    return <DotSquare x={x} y={dots} key={key}/>;
  }

  renderRow(cells, key) {
    return <Row cells={cells} key={key}/>;
  }

  render() {
    let players = [];
    let colors = ["red", "blue", "pink", "green"]
    colors.map((color) => {
      var player = [];
      player.push(this.renderBZSquare(0, color, "B"));
      player.push(this.renderBZSquare(1, color, "B"));
      player.push(this.renderBZSquare(2, color, "Z"));
      player.push(this.renderDotSquare(3, 1));
      player.push(this.renderDotSquare(4, 2));
      player.push(this.renderDotSquare(5, 3));
      player.push(this.renderDotSquare(6, 4));
      return players.push(this.renderRow(player, color));    
    }
    )
    return (
      <div>
        {players}
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <GameBoard />
        </div>
        <div className="player-board">
          <PlayerBoard />
        </div>

        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
