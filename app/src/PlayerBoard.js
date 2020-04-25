import React from 'react'
import Square from './Square.js'
import Row from './Row.js'

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
        let cls = "square-" + color;
        var span = <span className="visible" onClick={this.hide.bind(this)}>{content}</span>
        return <Square
            type="player"
            key={key}
            className={cls}
            content={span}
            players={this.props.players}
            colors={this.props.colors}

        />;
    }
    hide(e) {
        console.log(e);
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
            + '/images/'
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
    categorySquare(key, color, points, category) {
        return <Square key={key}
            type="category"
            className="square"
            content={this.categoryImage(category)}
            player={color}
            points={points}
            handleClick={this.hide}
            players={this.props.players}
            colors={this.props.colors}
        />;
    }
    moveBackwardSquare(key, color) {
        return <Square key={key}
            className={"square-" + color}
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
            className={"square-" + color}
            content="⇨"
            handleClick={this.props.move.bind(this, "forward", color)}
            players={this.props.players}
            colors={this.props.colors}
            type="moveForward"
        />;
    }
    render() {
        let rows = [];

        var top_row = [];
        top_row.push(this.hiddenSquare(1));
        top_row.push(this.hiddenSquare(2));
        top_row.push(this.hiddenSquare(3));
        top_row.push(this.dotSquare(4, 1));
        top_row.push(this.dotSquare(5, 2));
        top_row.push(this.dotSquare(6, 3));
        top_row.push(this.dotSquare(7, 4));
        top_row.push(this.hiddenSquare(8));
        top_row.push(this.hiddenSquare(9));
        rows.push(top_row)

        this.props.colors.map((color) => {
            var categories = this.props.players[color].categories;
            var row = [];
            row.push(this.playerSquare(1, color, "B"));
            row.push(this.playerSquare(2, color, "B"));
            row.push(this.playerSquare(3, color, "Z"));
            row.push(this.categorySquare(4, color, 1, categories[0]));
            row.push(this.categorySquare(5, color, 2, categories[1]));
            row.push(this.categorySquare(6, color, 3, categories[2]));
            row.push(this.categorySquare(7, color, 4, categories[3]));
            row.push(this.moveBackwardSquare(8, color));
            row.push(this.moveForwardSquare(9, color));

            return rows.push(<Row cells={row} key={color} />);
        }
        )
        return (
            <div>
                <div>
                    {rows}
                </div>
            </div>
        );
    }
}
