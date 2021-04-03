import React from "react";
import inputManager from "../../ts/InputManager";
import Final from "../Final";
import PatternList from "./PatternList";
import Table from "./Table";

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
      this.setState({ stage: "final" });
      console.log("lol");
    }
  }

  render() {
    return (
      <div>
        {this.state.stage === "pattern" ? (
          <div className="main-pattern-instruction">
            Додайте новий файл паттерну або підтвердіть існуючі
          </div>
        ) : null}
        {this.state.stage === "table" ? (
          <Table />
        ) : this.state.stage === "pattern" ? (
          <PatternList />
        ) : (
          <Final />
        )}
        <div className="main-button">
          {this.state.stage === "final" ? null : (
            <button className="btn btn-primary" onClick={this.onClick}>
              Submit
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Form;
