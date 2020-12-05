import React from 'react'
import {
    bounceIn, flipInX, rotateIn, rollIn, slideInUp, rotateInDownRight, fadeInRightBig,
    zoomInDown, lightSpeedIn, hinge, rotateInUpLeft, pulse, rubberBand, shake
} from 'react-animations';
import Radium, { StyleRoot } from 'radium';

const STYLES = [
    bounceIn, flipInX, rotateIn, rollIn, slideInUp, rotateInDownRight, fadeInRightBig,
    zoomInDown, lightSpeedIn, hinge, rotateInUpLeft, pulse, rubberBand, shake
];
const STREAKERS = ["homer.jpg", "ooh.jpg", "asian.jpg", "beard.jpg", "jump.jpg", "jagland.jpg",
    "carrier.jpg", "lady.jpg", "mobile.jpg", "tackle.jpg", "cops.jpg", "blackandwhite.jpg"];
export default class Streaker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showComponent: false,
        };
        this.hideStreaker = this.hideStreaker.bind(this);
    }
    toggle() {
        if (Math.random() < this.props.probability) {
            this.showStreaker();
        }
    }

    getStyle() {
        if (this.state.showComponent) {
            return this.randomStyle();
        } else {
            return this.hiddenStyle();
        }
    }
    hiddenStyle() {
        return {
            display: "none"
        }
    }
    randomStyle() {
        var time = 1 + Math.ceil(Math.random() * 2);
        var style = STYLES[Math.floor(Math.random() * STYLES.length)];

        return {
            animation: 'x ' + time + 's',
            animationName: Radium.keyframes(style),
            width: 600,
            height: 600,
            top: '20%',
            bottom: '20%',
            left: "50%",
            right: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            zIndex: "2",
        }
    }
    showStreaker() {
        let image = STREAKERS[Math.floor(Math.random() * STREAKERS.length)];
        let url = process.env.PUBLIC_URL
            + '/images/streakers/' + image;

        this.setState({
            showComponent: true,
            image: url
        });
        console.log(this.state)

    }

    hideStreaker() {
        this.setState({
            showComponent: false
        })
    }

    render() {
        return (
            <StyleRoot>
                <div style={this.getStyle()}>
                    <img src={this.state.image} alt="Streaker" className="streaker" />
                    <div className="button" onClick={this.hideStreaker}>Fang meg!</div>
                </div>
            </StyleRoot>

        )


    }
}