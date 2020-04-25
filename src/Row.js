
import React from 'react'
export default class Row extends React.Component {
    render() {
        return (
            <div className="board-row">
                {this.props.cells}
            </div>
        );
    }
}
