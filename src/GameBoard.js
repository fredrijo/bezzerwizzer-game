import React from 'react';
import Square from './Square.js'

export default class GameBoard extends React.Component {
    getClass(x, y) {
        if (y === 5) {
            if (x === 0) {
                return "square-start";
            } else {
                return "square-brake";
            }
        } else if (x === 0 || x === 5 || y === 0) {
            return "square";
        }
        else {
            return "square-hidden";
        }
    }

    getContent(x, y) {
        if (y === 5 && x > 0) {
            return "·"
        } else {
            return ""
        }
    }
    render() {
        var rows = [];
        for (var y = 0; y < 6; y++) {
            for (var x = 0; x < 6; x++) {
                rows.push(<Square
                    handleClick={this.props.handleClick}
                    x={x}
                    y={y}
                    key={x + "_" + y}
                    type="game"
                    className={this.getClass(x, y)}
                    content={this.getContent(x, y)}
                    players={this.props.players}
                    colors={this.props.colors}
                />);
            }
        }
        return <div className="game-board">{rows}</div>;
    }
}
