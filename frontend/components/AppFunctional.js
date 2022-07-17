import React, { useState, useEffect } from "react";
import axios from "axios";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at
const initaialXY = { x: 2, y: 2 };
const URL = `http://localhost:9000/api/result`;

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [index, setIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);
  const [xy, setXY] = useState(initaialXY);

  const getXY = (gridIndex) => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    if (gridIndex === 0) {
      setXY({ x: 1, y: 1 });
    } else if (gridIndex === 1) {
      setXY({ x: 2, y: 1 });
    } else if (gridIndex === 2) {
      setXY({ x: 3, y: 1 });
    } else if (gridIndex === 3) {
      setXY({ x: 1, y: 2 });
    } else if (gridIndex === 4) {
      setXY({ x: 2, y: 2 });
    } else if (gridIndex === 5) {
      setXY({ x: 3, y: 2 });
    } else if (gridIndex === 6) {
      setXY({ x: 1, y: 3 });
    } else if (gridIndex === 7) {
      setXY({ x: 2, y: 3 });
    } else if (gridIndex === 8) {
      setXY({ x: 3, y: 3 });
    }
  };

  const reset = () => {
    // Use this helper to reset all states to their initial values.
    setMessage(initialMessage);
    setIndex(initialIndex);
    setSteps(initialSteps);
    setEmail(initialEmail);
    setXY(initaialXY);
  };

  const getNextIndex = (direction) => {
    if (direction === "left" && xy.x !== 1) {
      setIndex(index - 1);
      setMessage("");
      setSteps(steps + 1);
    } else if (direction === "left" && xy.x === 1) {
      setMessage("You can't go left");
    } else if (direction === "right" && xy.x !== 3) {
      setIndex(index + 1);
      setMessage("");
      setSteps(steps + 1);
    } else if (direction === "right" && xy.x === 3) {
      setMessage("You can't go right");
    } else if (direction === "up" && xy.y !== 1) {
      setIndex(index - 3);
      setMessage("");
      setSteps(steps + 1);
    } else if (direction === "up" && xy.y === 1) {
      setMessage("You can't go up");
    } else if (direction === "down" && xy.y !== 3) {
      setIndex(index + 3);
      setMessage("");
      setSteps(steps + 1);
    } else if (direction === "down" && xy.y === 3) {
      setMessage("You can't go down");
    }
  };

  const move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    getNextIndex(evt.target.id);
  };

  const changeHandler = (evt) => {
    // You will need this to update the value of the input.

    setEmail(evt.target.value);
  };

  const submitHandler = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    const newSubmission = {
      x: xy.x,
      y: xy.y,
      steps: steps,
      email: email,
    };

    axios
      .post(URL, newSubmission)
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      })
      .finally(() => {
        setEmail("");
      });
  };

  useEffect(() => {
    getXY(index);
  }, [index]);

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        {
          <h3 id="coordinates">
            Coordinates ({xy.x}, {xy.y})
          </h3>
        }
        <h3 id="steps">{steps === 1 ? `You moved ${steps} time` : `You moved ${steps} times`}</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
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
          value={email}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
