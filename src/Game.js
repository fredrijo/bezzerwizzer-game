import React from 'react'
import Player from './Player.js'
import GameBoard from './GameBoard.js'
import PlayerBoard from './PlayerBoard.js'
import shuffle from 'shuffle-array'
import { Beforeunload } from 'react-beforeunload';
import WinScreen from './WinScreen.js';
import Music from './Music.js'
import Streaker from './Streaker.js'


// order is important here, don't change it plz
const COLORS = ["red", "green", "blue", "pink"];
const CATEGORIES = [
    "arkitektur", "design", "næringsliv", "film", "geografi",
    "historie", "kunst&scene", "litteratur", "mat&drikke", "mennesket",
    "musikk", "natur", "naturvitenskap", "politikk", "samfunn",
    "sport&spill", "språk", "teknikk", "tradisjon&tro", "tv&radio",
    "tv-serier", "fotballens-stjerner", "storbyer", "kokkekunst"
]
const STREAKER_PROBABILITY = 0.2
class NewGameButton extends React.Component {

    render() {
        return (
            <button className="button" onClick={this.props.onClick.bind(this)}>
                Start nytt spill
            </button>
        )
    }
}

class NewRoundButton extends React.Component {
    render() {
        return (
            <button className="button" onClick={this.props.onClick.bind(this)}>
                Ny runde
            </button>
        )
    }
}

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.newGameState();
        this.streaker = React.createRef();

    }
    move(direction, color) {
        this.streaker.current.toggle();
        console.log("move " + color + " " + direction);
        if (direction === "forward") {
            this.state.players[color].moveForward();
        } else if (direction === "backward") {
            this.state.players[color].moveBackward();
        } else {
            console.warn("Could not move: color=" + color + " direction=" + direction);
        }
        this.setState({ players: this.state.players });
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
    getWinner() {
        return COLORS.find(color => this.state.players[color].isWinner);
    }
    render() {
        return (
            <div>
                <Beforeunload onBeforeunload={() => "You'll lose your data!"} />

                <div className="top">
                    <h1>Bezzerwizzer</h1>
                    <NewRoundButton players={this.state.players} onClick={this.newRound.bind(this)} />
                    <Music text="Lag litt stemning" mp3="kvitt_eller_dobbelt" />
                    <Music text="Lag masse stemning" mp3="sandstorm" />
                    <Music text="Lag dårlig stemning" mp3="Exit Music" />
                    <Music text="H4U93N57U4" mp3="Haugenstua" />
                    <Music text='Rock' mp3="Vingle-Jonas" />
                </div>
                <div className="game">
                    <GameBoard
                        players={this.state.players}
                        colors={this.state.colors}
                    />
                    <PlayerBoard
                        move={this.move.bind(this)}
                        players={this.state.players}
                        colors={this.state.colors}
                        switchCategories={this.switchCategories.bind(this)}
                    />
                </div>
                <div className="bottom">
                    <NewGameButton players={this.state.players} onClick={this.newGame.bind(this)} />
                </div>
                <WinScreen players={this.state.players} onClick={this.newGame.bind(this)} getWinner={this.getWinner.bind(this)} />
                <Streaker ref={this.streaker} probability={STREAKER_PROBABILITY} />

            </div >
        );
    }
}
