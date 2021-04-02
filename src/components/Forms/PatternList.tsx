import React, { Component } from "react";
import { inputManager } from "../../ts/InputManager";

export default class PatternList extends Component {
  state = {
    patternListValues: Array(),
    patternId: 0,
  };

  constructor(props: {}) {
    super(props);
    this.onInput = this.onInput.bind(this);
  }

  onInput(event: any) {
    event.preventDefault();
    if (!event.target.files[0]) return;
    const name: string = event.target.files[0].name;
    inputManager.addPattern(name);
    const newElem = React.createElement(
      "li",
      {
        className:
          "list-group-item d-flex justify-content-between align-items-center",
        key: this.state.patternId,
      },
      name
    );
    this.state.patternId++;
    this.state.patternListValues.push(newElem);
    this.setState({ patternListValues: this.state.patternListValues });
  }

  render() {
    return (
      <div className="pattern-list">
        <ul className="list-group">{this.state.patternListValues}</ul>
        <div className="custom-file pattern-file-input">
          <input
            type="file"
            className="custom-file-input"
            id="inputGroupFile02"
            onInput={this.onInput}
          ></input>
          <label className="custom-file-label" htmlFor="inputGroupFile02">
            Choose file
          </label>
        </div>
      </div>
    );
  }
}
