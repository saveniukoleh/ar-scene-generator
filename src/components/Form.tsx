import React from "react";
import inputManager from "../ts/InputManager";
import Final from "./Final";
import Footer from "./Footer";
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
    if (!inputManager.getPatterns.length) {
      alert("Будь ласка хоча б один патерн чи баркод");
      return;
    }
    if (this.state.stage === "pattern") {
      this.setState({ stage: "table" });
    } else if (this.state.stage === "table" && inputManager.codePrepared) {
      this.setState({ stage: "final" });
    }
  }

  render() {
    return (
      <div>
        {this.state.stage === "pattern" ? (
          <div className="main-pattern-instruction">
            Add .patt file or choose a barcode:
          </div>
        ) : null}
        {this.state.stage === "table" ? (
          <Table />
        ) : this.state.stage === "pattern" ? (
          <PatternList />
        ) : (
          <Final />
        )}
        <div className="main-button" style={{ marginTop: "24px" }}>
          {this.state.stage === "final" ? null : (
            <button className="btn btn-primary" onClick={this.onClick}>
              Confirm
            </button>
          )}
        </div>

        {this.state.stage === "final" ? null : <Footer />}
      </div>
    );
  }
}

export default Form;
