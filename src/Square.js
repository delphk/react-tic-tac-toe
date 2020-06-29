import React from "react";

const Square = props => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value === "Doge" && (
        <img alt="doge" src={require("./assets/doge.png")} />
      )}
      {props.value === "Cate" && (
        <img alt="cate" src={require("./assets/cate.png")} />
      )}
    </button>
  );
};

export default Square;
