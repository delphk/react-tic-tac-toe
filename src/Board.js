import React, { Component } from "react";
import Square from "./Square";
import { calculateWinner } from "./utils/utils";

class Board extends Component {
  state = {
    squares: Array(9).fill(null),
    xIsNext: true,
    turnIndex: 0
  };

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  handleClick = i => {
    const squares = [...this.state.squares];
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares,
      xIsNext: !this.state.xIsNext,
      turnIndex: this.state.turnIndex + 1
    });
  };

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) status = "Winner: " + winner;
    else if (this.state.turnIndex === 9 && !winner) status = "It's a draw!";
    else status = "Next player: " + (this.state.xIsNext ? "X" : "O");

    return (
      <div className="board">
        <div>{status} </div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;
