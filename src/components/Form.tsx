import React from "react";
import { inputManager } from "../ts/InputManager";
import PatternList from "./Forms/PatternList";
import Table from "./Forms/Table";

class Form extends React.Component {
  state = {
    stage: "pattern",
  };

  constructor(props: {}) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (!inputManager.getPatterns.length) return;
    if (this.state.stage === "pattern") {
      this.setState({ stage: "table" });
    } else if (this.state.stage === "table" && inputManager.codePrepared) {
    }
  }

  render() {
    return (
      <div className="form-main">
        {this.state.stage === "table" ? <Table /> : <PatternList />}
        <button className="btn btn-primary btn" onClick={this.onClick}>
          Submit
        </button>
      </div>
    );
  }
}

export default Form;
