import React from 'react'
import Player from './Player.js'
import GameBoard from './GameBoard.js'
import PlayerBoard from './PlayerBoard.js'
import shuffle from 'shuffle-array'
import { Beforeunload } from 'react-beforeunload'
import WinScreen from './WinScreen.js'
import Music from './Music.js'
import Streaker from './Streaker.js'
import Shock from './Shock.js'

// order is important here, don't change it plz
const COLORS = ["red", "green", "blue", "pink"];

const OLD_CATEGORIES = [
    "arkitektur", "design", "film", "geografi", "historie",
    "kunst&scene", "litteratur", "mat&drikke", "mennesket", "musikk",
    "natur", "naturvitenskap", "næringsliv", "politikk", "samfunn",
    "sport&spill", "språk", "teknikk", "tradisjon&tro", "tv&radio",
    // ekstra
    "tv-serier", "fotballens-stjerner", "storbyer", "kokkekunst"
];

const NEW_CATEGORIES = [
    "arkitektur-2020", "design-2020", "film-2020", "geografi-2020", "historie-2020",
    "kjendiser-2020", "kunst&scene-2020", "litteratur-2020", "mat&drikke-2020", "musikk-2020",
    "natur-2020", "naturvitenskap-2020", "næringsliv-2020", "politikk-2020", "samfunn-2020",
    "sport-2020", "språk-2020", "teknologi&spill-2020", "tradisjon&tro-2020", "tv&serier-2020"
];

const STREAKER_PROBABILITY = 0.3
class NewGameButton extends React.Component {
    state = {
        categories: "old"
    }
    setCategory(e) {
        this.setState({
            categories: e.target.value
        });
    }
    render() {
        return (
            <div>
                <button className="button" onClick={this.props.onClick.bind(this)}>
                    Start nytt spill
            </button>
                <select className="select" onChange={this.setCategory.bind(this)}>
                    <option value="old"
                        checked={this.state.categories === "old"}
                    >
                        Gamle kategorier
                    </option>
                    <option value="new"
                        checked={this.state.categories === "new"}
                    >
                        Nye kategorier
                    </option>
                </select>
            </div >
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
        this.shock = React.createRef();
        this.categorySelect = React.createRef();
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
    newGame(e) {
        console.log(e);
        if (window.confirm("Vil du starte et nytt spill?")) {
            this.unblur();
            this.setState(this.newGameState());
            console.log(this.newGame.state);
        } else {
            // Do nothing
        }
    }
    buzz() {
        this.shock.current.play();
    }
    unblur() {
        Array.from(document.querySelectorAll('.blurred')).map(el => el.className = "visible");
    }
    newRound() {
        if (window.confirm("Ny runde?")) {
            this.unblur();
            var players = {};
            let selectedCategories = this.categorySelect.current.state.categories;
            var categories = this.getCategories(selectedCategories);
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
    getCategories(selectedCategories) {
        if (selectedCategories === "old") {
            return shuffle(OLD_CATEGORIES);
        } else if (selectedCategories === "new") {
            return shuffle(NEW_CATEGORIES);
        } else {
            console.log("SOMETHING WENT WRONG, NO CATEGORIES!");
            console.log(this.state);
        }

    }
    newGameState() {
        var players = {};
        let selectedCategories = "old";
        if (this.categorySelect) {
            console.log(this.categorySelect);
            selectedCategories = this.categorySelect.current.state.categories;
        }
        var categories = this.getCategories(selectedCategories);
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
                    <Music text="Tenkemusikk" mp3="kvitt_eller_dobbelt" />
                    <Music text="Lag bra stemning" mp3="Smile" />
                    <Music text="Lag dårlig stemning" mp3="Karius er deppa" />
                    <Music text="H4U93N57U4" mp3="Haugenstua" />
                    <Music text='Rock' mp3="back in black" />
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
                        buzz={this.buzz.bind(this)}
                    />
                </div>
                <div className="bottom">
                    <NewGameButton ref={this.categorySelect} players={this.state.players} onClick={this.newGame.bind(this)} />
                </div>
                <WinScreen players={this.state.players} onClick={this.newGame.bind(this)} getWinner={this.getWinner.bind(this)} />
                <Streaker ref={this.streaker} probability={STREAKER_PROBABILITY} />
                <Shock ref={this.shock} mp3="electriccurrent" />
                <audio id="clap"><source src={process.env.PUBLIC_URL + "sounds/applause10.mp3"}></source></audio>

            </div >
        );
    }
}
