import React, { useState } from "react";
import axios from "axios";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at
const initaialXY = { x: 2, y: 2 };
const initialDirection = "";
const URL = `http://localhost:9000/api/result`;

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [state, setState] = useState({
    message: initialMessage,
    email: initialEmail,
    index: initialIndex,
    steps: initialSteps,
    xy: initaialXY,
    direction: initialDirection,
  });

  const getXY = (gridIndex) => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    if (gridIndex === 0) {
      setState({ ...state, xy: { x: 1, y: 1 } });
    } else if (gridIndex === 1) {
      setState({ ...state, xy: { x: 2, y: 1 } });
    } else if (gridIndex === 2) {
      setState({ ...state, xy: { x: 3, y: 1 } });
    } else if (gridIndex === 3) {
      setState({ ...state, xy: { x: 1, y: 2 } });
    } else if (gridIndex === 4) {
      setState({ ...state, xy: { x: 2, y: 2 } });
    } else if (gridIndex === 5) {
      setState({ ...state, xy: { x: 3, y: 2 } });
    } else if (gridIndex === 6) {
      setState({ ...state, xy: { x: 1, y: 3 } });
    } else if (gridIndex === 7) {
      setState({ ...state, xy: { x: 2, y: 3 } });
    } else if (gridIndex === 8) {
      setState({ ...state, xy: { x: 3, y: 3 } });
    }
  };
  const reset = () => {
    // Use this helper to reset all states to their initial values.
    setState({
      ...state,
      message: initialMessage,
      index: initialIndex,
      steps: initialSteps,
      email: initialEmail,
    });
  };

  const getNextIndex = (direction) => {
    if (direction === "left" && state.xy.x !== 1) {
      setState({ ...state, index: state.index - 1, message: "", steps: state.steps + 1 });
    } else if (direction === "left" && state.xy.x === 1) {
      setState({ ...state, message: "You can't go left" });
      // return state.index
    } else if (direction === "right" && state.xy.x !== 3) {
      setState({ ...state, index: state.index + 1, message: "", steps: state.steps + 1 });
    } else if (direction === "right" && state.xy.x === 3) {
      setState({ ...state, message: "You can't go right" });
    } else if (direction === "up" && state.xy.y !== 1) {
      setState({ ...state, index: state.index - 3, message: "", steps: state.steps + 1 });
    } else if (direction === "up" && state.xy.y === 1) {
      setState({ ...state, message: "You can't go up" });
    } else if (direction === "down" && state.xy.y !== 3) {
      setState({ ...state, index: state.index + 3, message: "", steps: state.steps + 1 });
    } else if (direction === "down" && state.xy.y === 3) {
      setState({ ...state, message: "You can't go down" });
    }
  };

  const move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    getNextIndex(evt.target.id);
    setState({ ...state, direction: evt.target.id });
    getXY(state.index);
  };

  const changeHandler = (evt) => {
    // You will need this to update the value of the input.

    setState({ ...state, email: evt.target.value });
  };

  const submitHandler = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    const newSubmission = {
      x: state.xy.x,
      y: state.xy.y,
      steps: state.steps,
      email: state.email,
    };

    axios
      .post(URL, newSubmission)
      .then((res) => {
        setState({ ...state, message: res.data.message });
      })
      .catch((err) => {
        setState({ ...state, message: err.response.data.message });
      })
      .finally(() => {
        setState({ ...state, email: "" });
      });
  };

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        {<h3 id="coordinates">{`Coordinates (${state.xy.x}, ${state.xy.y})`} </h3>}
        <h3 id="steps">
          {state.steps === 1 ? `You moved ${state.steps} time` : `You moved ${state.steps} times`}
        </h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === state.index ? " active" : ""}`}>
            {idx === state.index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{state.message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>
          LEFT
        </button>
        <button id="up" onClick={move}>
          UP
        </button>
        <button id="right" onClick={move}>
          RIGHT
        </button>
        <button id="down" onClick={move}>
          DOWN
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={submitHandler}>
        <input
          id="email"
          type="email"
          placeholder="type email"
          onChange={changeHandler}
          value={state.email}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
