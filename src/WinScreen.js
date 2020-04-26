import React from 'react';
import GifPlayer from 'react-gif-player';
import shuffle from 'shuffle-array'

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
    getWinner() {
        switch (this.props.winner) {
            case "red":
                return "RØDT lag!"
            case "blue":
                return "BLÅTT lag!"
            case "green":
                return "GRØNT lag!"
            case "pink":
                return "ROSA lag!"
            default:
                return "et eller annet"
        }
    }
    randomGif() {
        var files = [
            "clapping.gif",
            "di_caprio.gif",
            "gorilla.gif",
            "grandma.gif",
            "hiphop.gif",
            // "japanese_dancer.gif",
            "rocky.gif",
            "trippping_runner.gif",
        ];
        return shuffle(files)[0];
    }
    render() {
        return (<div className="celebrate">
            <div>Vinneren er {this.getWinner()}</div>
            <GifPlayer
                gif={process.env.PUBLIC_URL + "/images/celebrations/" + this.randomGif()}
                autoplay={true}>
            </GifPlayer>
        </div>
        )
    }

}