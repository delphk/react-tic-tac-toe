import React, { Component } from "react";
import "./App.css";
import Game from "./Game";

class App extends Component {
  render() {
    return (
      <div className="game">
        <Game />
      </div>
    );
  }
}

export default App;
