import React from 'react'
import Square from './Square.js'

export default class PlayerBoard extends React.Component {
    hiddenSquare(key) {
        return <Square
            type="hidden"
            key={key}
            className="square-hidden"
            handleClick={this.props.handleClick}
            players={this.props.players}
            colors={this.props.colors}
        />;
    }
    dotSquare(key, dots) {
        let content = "·".repeat(dots);
        return <Square
            type="dot"
            key={key}
            className="square"
            content={content}
            handleClick={this.props.handleClick}
            players={this.props.players}
            colors={this.props.colors}
        />;
    }
    playerSquare(key, color, content) {
        var span = <span className="visible" onClick={this.hide.bind(this)}>{content}</span>
        return <Square
            type="player"
            key={key}
            className={"square-" + color + " clickable"}
            content={span}
            players={this.props.players}
            colors={this.props.colors}

        />;
    }
    hide(e) {
        if (e.target.className === "visible") {
            e.target.className = "blurred";
        } else if (e.target.className === "blurred") {
            e.target.className = "visible";
        }
    }

    handleDrag(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ dragSource: e.target.alt });
    };
    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ dragTarget: e.target.alt });
    };
    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.switchCategories(this.state.dragSource, this.state.dragTarget)
    };
    categoryImage(category) {
        let url = process.env.PUBLIC_URL
            + '/images/tiles/'
            + category
            + ".png";
        return <img
            className="visible"
            src={url}
            alt={category}
            title={category}
            draggable="true"
            onDrop={this.handleDrop.bind(this)}
            onDragOver={this.handleDragOver.bind(this)}
            onDrag={this.handleDrag.bind(this)}
        />

    }
    buzz(e) {
        e.preventDefault();
        this.props.buzz();
        this.hide(e);
    }
    categorySquare(key, color, points, category) {
        return <Square key={key}
            type="category"
            className="square clickable"
            content={this.categoryImage(category)}
            player={color}
            points={points}
            handleClick={this.hide.bind(this)}
            handleContextMenu={this.buzz.bind(this)}
            players={this.props.players}
            colors={this.props.colors}
        />;
    }
    moveBackwardSquare(key, color) {
        return <Square key={key}
            className={"square-" + color + " clickable"}
            content="⇦"
            player={color}
            type="moveBackward"
            handleClick={this.props.move.bind(this, "backward", color)}
            players={this.props.players}
            colors={this.props.colors}
        />;
    }
    moveForwardSquare(key, color) {
        return <Square key={key}
            className={"square-" + color + " clickable"}
            content="⇨"
            handleClick={this.props.move.bind(this, "forward", color)}
            players={this.props.players}
            colors={this.props.colors}
            type="moveForward"
        />;
    }
    render() {
        let rows = [];

        rows.push(this.hiddenSquare("top" + 1));
        rows.push(this.hiddenSquare("top" + 2));
        rows.push(this.hiddenSquare("top" + 3));
        rows.push(this.dotSquare("top" + 4, 1));
        rows.push(this.dotSquare("top" + 5, 2));
        rows.push(this.dotSquare("top" + 6, 3));
        rows.push(this.dotSquare("top" + 7, 4));
        rows.push(this.hiddenSquare("top" + 8));
        rows.push(this.hiddenSquare("top" + 9));

        this.props.colors.map((color) => {
            var categories = this.props.players[color].categories;
            rows.push(this.playerSquare(color + 1, color, "B"));
            rows.push(this.playerSquare(color + 2, color, "B"));
            rows.push(this.playerSquare(color + 3, color, "Z"));
            rows.push(this.categorySquare(color + 4, color, 1, categories[0]));
            rows.push(this.categorySquare(color + 5, color, 2, categories[1]));
            rows.push(this.categorySquare(color + 6, color, 3, categories[2]));
            rows.push(this.categorySquare(color + 7, color, 4, categories[3]));
            rows.push(this.moveBackwardSquare(color + 8, color));
            rows.push(this.moveForwardSquare(color + 9, color));
            return void 0;
        }
        )
        return (
            <div className="player-board">
                {rows}
            </div>
        );
    }
}
