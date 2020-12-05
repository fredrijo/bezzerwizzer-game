import React from 'react'

export default class Shock extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showComponent: false,
        };
    }

    getStyle() {
        if (this.state.showComponent) {
            return {
                width: "100%",
                height: "100%",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "fixed",
                zIndex: "2",
                opacity: 0.6,
            }
        }
        else {
            return {
                display: "none"
            }
        }
    }

    play() {
        let url = process.env.PUBLIC_URL + '/images/shock.gif';

        this.setState({
            showComponent: true,
            image: url
        });
        const audioEl = document.getElementById(this.props.mp3);
        audioEl.play();
        setTimeout(() => {
            this.setState({
                showComponent: false
            });
        }, 1000)

    }

    render() {
        let url = process.env.PUBLIC_URL + "/sounds/" + this.props.mp3 + ".mp3";
        return (
            <div>
                <img src={this.state.image} alt="Shock!" style={this.getStyle()} />
                <audio id={this.props.mp3}>
                    <source src={url}></source>
                </audio>
            </div>

        )

    }
}