import React from 'react'
import axios from "axios";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at
const initaialXY = { x: 2, y: 2 };
const initialDirection = "";

const URL = `http://localhost:9000/api/result`;

export default class AppClass extends React.Component {
  state = {
    message: initialMessage,
    email: initialEmail,
    index: initialIndex,
    steps: initialSteps,
    xy: initaialXY,
    direction: initialDirection,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.index !== this.state.index) {
      this.getXY(this.state.index);
    }
  }

  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  getXY = (gridIndex) => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    if (gridIndex === 0) {
      this.setState({ ...this.state, xy: { x: 1, y: 1 } });
    } else if (gridIndex === 1) {
      this.setState({ ...this.state, xy: { x: 2, y: 1 } });
    } else if (gridIndex === 2) {
      this.setState({ ...this.state, xy: { x: 3, y: 1 } });
    } else if (gridIndex === 3) {
      this.setState({ ...this.state, xy: { x: 1, y: 2 } });
    } else if (gridIndex === 4) {
      this.setState({ ...this.state, xy: { x: 2, y: 2 } });
    } else if (gridIndex === 5) {
      this.setState({ ...this.state, xy: { x: 3, y: 2 } });
    } else if (gridIndex === 6) {
      this.setState({ ...this.state, xy: { x: 1, y: 3 } });
    } else if (gridIndex === 7) {
      this.setState({ ...this.state, xy: { x: 2, y: 3 } });
    } else if (gridIndex === 8) {
      this.setState({ ...this.state, xy: { x: 3, y: 3 } });
    }
  };

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    // if (this.state.direction === "right" && this.state.xy.x === 3) {
    //   this.setState({ message: `You can't go right` });
    // } else if (this.state.direction === "left" && this.state.xy.x === 1) {
    //   this.setState({ message: `You can't go left` });
    // } else if (this.state.direction === "up" && this.state.xy.y === 1) {
    //   this.setState({ message: `You can't go up` });
    // } else if (this.state.direction === "down" && this.state.xy.y === 3) {
    //   this.setState({ message: `You can't go down` });
    // } else {
    //   this.setState({ message: `` });
    // }
  };

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState({
      ...this.setState,
      message: initialMessage,
      index: initialIndex,
      steps: initialSteps,
    });
  };

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if (direction === "right") {
      if (this.state.index < 2 && this.state.index >= 0) {
        this.setState({
          ...this.state,
          index: this.state.index + 1,
          steps: this.state.steps + 1,
          message: initialMessage,
        });
      } else if (this.state.index < 5 && this.state.index >= 3) {
        this.setState({
          ...this.state,
          index: this.state.index + 1,
          steps: this.state.steps + 1,
          message: initialMessage,
        });
      } else if (this.state.index < 8 && this.state.index >= 6) {
        this.setState({
          ...this.state,
          index: this.state.index + 1,
          steps: this.state.steps + 1,
          message: initialMessage,
        });
      }
    } else if (direction === "left") {
      if (this.state.index > 0 && this.state.index <= 2) {
        this.setState({
          ...this.state,
          index: this.state.index - 1,
          steps: this.state.steps + 1,
          message: initialMessage,
        });
      } else if (this.state.index > 3 && this.state.index <= 5) {
        this.setState({
          ...this.state,
          index: this.state.index - 1,
          steps: this.state.steps + 1,
          message: initialMessage,
        });
      } else if (this.state.index > 6 && this.state.index <= 8) {
        this.setState({
          ...this.state,
          index: this.state.index - 1,
          steps: this.state.steps + 1,
          message: initialMessage,
        });
      }
    } else if (direction === "down") {
      if (this.state.index >= 0 && this.state.index <= 5) {
        this.setState({
          ...this.state,
          index: this.state.index + 3,
          steps: this.state.steps + 1,
          message: initialMessage,
        });
      }
    } else if (direction === "up") {
      if (this.state.index <= 8 && this.state.index > 2) {
        this.setState({
          ...this.state,
          index: this.state.index - 3,
          steps: this.state.steps + 1,
          message: initialMessage,
        });
      }
    }
  };

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    this.getNextIndex(evt.target.id);
    this.setState({ message: initialMessage });
    this.setState({ direction: evt.target.id });
    this.getXYMessage();
  };

  changeHandler = (evt) => {
    // You will need this to update the value of the input.

    this.setState({ ...this.state, email: evt.target.value });
  };

  submitHandler = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    const newSubmission = {
      x: this.state.xy.x,
      y: this.state.xy.y,
      steps: this.state.steps,
      email: this.state.email,
    };
    axios
      .post(URL, newSubmission)
      .then((res) => {
        this.setState({ ...this.state, message: res.data.message });
      })
      .catch((err) => {
        this.setState({ ...this.state, message: err.response.data.message });
      });
    this.reset();
  };

  render() {
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates (${this.state.xy.x}, ${this.state.xy.y})`}</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <div key={idx} className={`square${idx === this.state.index ? " active" : ""}`}>
              {idx === this.state.index ? "B" : null}
            </div>
          ))}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>
            LEFT
          </button>
          <button id="up" onClick={this.move}>
            UP
          </button>
          <button id="right" onClick={this.move}>
            RIGHT
          </button>
          <button id="down" onClick={this.move}>
            DOWN
          </button>
          <button id="reset" onClick={this.reset}>
            reset
          </button>
        </div>
        <form onSubmit={this.submitHandler}>
          <input
            id="email"
            type="email"
            placeholder="type email"
            onChange={this.changeHandler}
            value={this.state.email}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
