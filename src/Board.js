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
    squares[i] = this.state.xIsNext ? "Doge" : "Cate";

    this.setState(
      {
        squares,
        xIsNext: !this.state.xIsNext,
        turnIndex: this.state.turnIndex + 1
      },
      () => {
        if (this.getWinner(this.state.squares)) {
          this.props.setGameOver();
        } else if (this.props.noOfPlayers === 1) this.makeAImove();
      }
    );
  };

  makeAImove = () => {
    const squares = [...this.state.squares];
    let bestScore = -Infinity;
    let bestMove;
    for (let square in squares) {
      if (!squares[square]) {
        squares[square] = "Cate";
        let score = this.minimax(squares, false);
        squares[square] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = square;
        }
      }
    }
    squares[bestMove] = "Cate";
    return this.setState(
      {
        squares,
        xIsNext: "Doge",
        turnIndex: this.state.turnIndex + 1
      },
      () => {
        if (this.getWinner(this.state.squares)) {
          this.props.setGameOver();
        }
      }
    );
  };

  minimax(squares, isMaximizing) {
    const scores = {
      Doge: -1,
      Cate: 1,
      Tie: 0
    };
    let winner = this.getWinner(squares);
    if (winner) {
      let score = scores[winner];
      return score;
    }
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let square in squares) {
        if (!squares[square]) {
          squares[square] = "Cate";
          let score = this.minimax(squares, false);
          squares[square] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let square in squares) {
        if (!squares[square]) {
          squares[square] = "Doge";
          let score = this.minimax(squares, true);
          squares[square] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  getWinner(squares) {
    const winner = calculateWinner(squares);
    if (winner) return winner;
    if (squares.every(square => square) && !winner) return "Tie";
    return false;
  }

  render() {
    const winner = this.getWinner(this.state.squares);
    let status;
    if (winner) {
      if (winner === "Tie") status = "It's a draw!";
      else status = "Winner: " + winner;
    } else status = "Next player: " + (this.state.xIsNext ? "Doge" : "Cate");

    return (
      <div>
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
