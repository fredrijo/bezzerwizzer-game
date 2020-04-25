import React from 'react';
import GifPlayer from 'react-gif-player';

export default class WinScreen extends React.Component {
    hasWinner() {
        console.log("hasWinner(): ");
        console.log(this.props.getWinner() !== undefined);
        return this.props.getWinner() !== undefined;
    }
    render() {
        return (<div>
            {
                this.hasWinner() &&
                <WinScreenChild winner={this.props.getWinner()} />
            }
        </div>
        )
    }
}

class WinScreenChild extends React.Component {
    render() {
        return (<div className="celebrate">
            <div>Vinneren er {this.props.winner}</div>
            <GifPlayer
                gif={process.env.PUBLIC_URL + "/images/celebrate-large.gif"}
                autoplay={true}>
            </GifPlayer>
        </div>
        )
    }

}