import React, { Component } from "react";
import inputManager from "../../ts/InputManager";
import TableRow from "./TableRow";

export default class Table extends Component {
  state = {
    tableRows: Array(),
  };

  componentDidMount() {
    let i = 0;
    this.state.tableRows.push(
      <tr className="table-default">
        <td>
          <b>Pattern file</b>
        </td>
        <td>
          <b>Content type</b>
        </td>
        <td>
          <b>Content file</b>
        </td>
        <td>
          <b>Audio file</b>
        </td>
        <td>
          <b>Auto repeat</b>
        </td>
      </tr>
    );
    inputManager.getPatterns.forEach((elem: string) => {
      const newRow = <TableRow name={elem} id={i} />;
      this.state.tableRows.push(newRow);
      i++;
    });
    this.setState({ tableRows: this.state.tableRows });
  }

  render() {
    return (
      <div className="table-wrapper">
        <table className="table table-hover">
          <tbody>{this.state.tableRows}</tbody>
        </table>
      </div>
    );
  }
}
