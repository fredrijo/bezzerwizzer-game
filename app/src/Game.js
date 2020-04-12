import React from 'react'
import Player from './Player.js'
import GameBoard from './GameBoard.js'
import PlayerBoard from './PlayerBoard.js'
import shuffle from 'shuffle-array'
import { Beforeunload } from 'react-beforeunload';

// order is important here, don't change it plz
const COLORS = ["red", "green", "blue", "pink"];
const CATEGORIES = [
    "arkitektur", "design", "næringsliv", "film", "geografi",
    "historie", "kunst&scene", "litteratur", "mat&drikke", "mennesket",
    "musikk", "natur", "naturvitenskap", "politikk", "samfunn",
    "sport&spill", "språk", "teknikk", "tradisjon&tro", "tv&radio"
]
class NewGameButton extends React.Component {

    render() {
        return (
            <div className="new-game" onClick={this.props.onClick.bind(this)}>
                Start nytt spill
            </div>
        )
    }
}

class NewRoundButton extends React.Component {
    render() {
        return (
            <div className="new-game" onClick={this.props.onClick.bind(this)}>
                Ny runde
            </div>
        )
    }
}

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = this.newGameState();
    }

    handleClick = (e) => {
        console.log(e.target);
    }

    move(direction, color) {
        console.log("move " + color + " " + direction);
        if (direction === "forward") {
            this.state.players[color].moveForward();
        } else if (direction === "backward") {
            this.state.players[color].moveBackward();
        } else {
            console.warn("Could not move: color=" + color + " direction=" + direction);
        }
        this.setState({ players: this.state.players });
        if (this.state.players[color].isWinner()) {
            alert("We have a winner! It is: " + color + "!")
        }
    }
    newGame() {
        if (window.confirm("Vil du starte et nytt spill?")) {
            this.unblur();
            this.setState(this.newGameState());
        } else {
            // Do nothing
        }
    }
    unblur() {
        Array.from(document.querySelectorAll('.blurred')).map(el => el.className = "visible");
    }
    newRound() {
        if (window.confirm("Ny runde?")) {
            this.unblur();
            var players = {};
            var categories = shuffle(CATEGORIES);
            COLORS.map((color, idx) => {
                var player = this.state.players[color];
                player.drawCategories(idx, categories);
                players[color] = player;
                return void 0;
            });
            this.setState({ players: players })
        } else {
            // Do nothing
        }
    }
    newGameState() {
        var players = {};
        var categories = shuffle(CATEGORIES);
        COLORS.map((color, idx) => {
            var player = new Player(color, 0, 5);
            player.drawCategories(idx, categories);
            players[color] = player;
            return void 0;
        });
        console.log(players);
        return {
            players: players,
            colors: COLORS
        };
    }
    switchCategories(src, tgt) {
        console.log(src, tgt);
        var players = {};
        COLORS.map(color => {
            var player = this.state.players[color];
            for (var idx = 0; idx < player.categories.length; idx++) {
                if (player.categories[idx] === src) {
                    player.categories[idx] = tgt;
                } else if (player.categories[idx] === tgt) {
                    player.categories[idx] = src;
                }
            }
            players[color] = player;
            return void 0;
        });
        this.setState({ players: players })
    }
    render() {
        return (
            <div>
                <Beforeunload onBeforeunload={() => "You'll lose your data!"} />

                <div className="top">
                    <h1>Bezzerwizzer</h1>
                    <NewRoundButton players={this.state.players} onClick={this.newRound.bind(this)} />
                </div>
                <div className="game">
                    <div className="game-board">
                        <GameBoard
                            handleClick={this.handleClick}
                            players={this.state.players}
                            colors={this.state.colors}
                        />
                    </div>
                    <div className="player-board" id="player-board">
                        <PlayerBoard
                            move={this.move.bind(this)}
                            players={this.state.players}
                            colors={this.state.colors}
                            switchCategories={this.switchCategories.bind(this)}
                        />

                    </div>
                </div>
                <div className="bottom">
                    <NewGameButton players={this.state.players} onClick={this.newGame.bind(this)} />
                </div>
            </div>
        );
    }
}
