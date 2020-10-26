
import React from 'react';

export default class Square extends React.Component {
    render() {
        var onClick = () => void 0;
        if (this.props && this.props.handleClick) {
            onClick = this.props.handleClick;
        }
        return (
            <div className={this.props.className} onClick={onClick}                >
                {this.getContent()}
            </div>
        );
    }
    getContent() {
        if (this.props.type && this.props.type === "game") {
            var playersOnThisSquare = this.props.colors
                .filter(color => this.props.players[color].x === this.props.x && this.props.players[color].y === this.props.y)
                .map(color => this.props.players[color]);
            if (playersOnThisSquare.length > 0) {
                let colorString = playersOnThisSquare
                    .map(player => player.color)
                    .join("-");
                let url = process.env.PUBLIC_URL
                    + '/images/players/player-'
                    + colorString
                    + ".png";
                return <img src={url} alt={playersOnThisSquare} />;
            } else {
                return this.props.content;
            }
        } else {
            return this.props.content;
        }
    }
}
