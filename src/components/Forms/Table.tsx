import React, { Component } from "react";
import { inputManager } from "../../ts/InputManager";

export default class Table extends Component {
  state = {
    tableRows: Array(),
  };

  componentDidMount() {
    inputManager.getPatterns.forEach((elem) => {
      this.state.tableRows.push(
        React.createElement("tr", { className: "table-default" }, [
          <td className="table-pattern">{elem}</td>,
          <td>
            <select
              className="form-control"
              onChange={(e) => console.log(e.target.value)}
            >
              <option>Image</option>
              <option>Video</option>
              <option>Model</option>
            </select>
          </td>,
          <td>Column content</td>,
          <td>Column content</td>,
          <td>Column content</td>,
        ])
      );
    });
    this.setState({ tableRows: this.state.tableRows });
  }

  render() {
    return (
      <div className="table">
        <table className="table table-hover">
          <tbody>{this.state.tableRows}</tbody>
        </table>
      </div>
    );
  }
}
