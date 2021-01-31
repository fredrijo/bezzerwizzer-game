
import React from 'react';

export default class Square extends React.Component {
    render() {
        var onClick = () => void 0;
        if (this.props && this.props.handleClick) {
            onClick = this.props.handleClick;
        }
        var onContextMenu = (e) => e.preventDefault();
        if (this.props && this.props.handleContextMenu) {
            onContextMenu = this.props.handleContextMenu;
        }
        return (
            <div className={this.getClassName()} onClick={onClick} onContextMenu={onContextMenu}>
                {this.getContent()}
            </div>
        );
    }
    getContent() {
        if (this.props.type && this.props.type === "game") {
            var playersOnThisSquare = this.props.colors
                .filter(color => this.props.players[color].x === this.props.x && this.props.players[color].y === this.props.y)
                .map(color => this.props.players[color]);
            if (playersOnThisSquare.length === 0) {
                return this.props.content;
            } else {
                return <div className="player-container">
                    {playersOnThisSquare
                        .map(player =>
                            <img src={process.env.PUBLIC_URL
                                + '/images/players/player-'
                                + player.color
                                + ".png"}
                                alt={playersOnThisSquare}
                                className={"player-" + player.color}
                                key={"player-" + player.color} />)
                    }
                </div>
            }
        } else {
            return this.props.content;
        }
    }
    getClassName() {
        var greenIsStuck =
            (this.props.x > 0 && this.props.x < 5) &&
            this.props.y === 0 &&
            this.props.players["green"].x === this.props.x &&
            this.props.players["green"].y === this.props.y;
        var greenIsDone =
            this.props.x === 5 &&
            this.props.y === 0 &&
            this.props.players["green"].x === this.props.x &&
            this.props.players["green"].y === this.props.y;
        if (greenIsStuck) {
            return "green-is-stuck"
        }
        else if (greenIsDone) {
            return "green-is-done"
        } else {
            return this.props.className
        }
    }
}
