import React, { Component } from "react"

export default class Music extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false
        }
    }

    playAudio() {
        let playing = !this.state.playing;

        const audioEl = document.getElementById(this.props.mp3)

        if (playing) {
            audioEl.play();
        } else {
            audioEl.pause();
            audioEl.currentTime = 0;
        }

        this.setState({
            playing: playing
        });

    }

    render() {
        let url = process.env.PUBLIC_URL + "/music/" + this.props.mp3 + ".mp3";

        return (
            <span>
                <button className="button" onClick={this.playAudio.bind(this)}>
                    <span>{this.props.text}</span>
                </button>
                <audio id={this.props.mp3}>
                    <source src={url}></source>
                </audio>
            </span>
        )
    }
}
