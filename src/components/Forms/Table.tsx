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
          <b>.patt file</b>
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
          <b>Autoplay</b>
        </td>
      </tr>
    );
    inputManager.prepareData();
    inputManager.getPatterns.forEach((elem: string, index) => {
      let newRow;
      if (elem === "") {
        let barcode = inputManager.getBarcode(index);
        newRow = <TableRow name={`Barcode ${barcode}`} id={i} />;
      } else {
        newRow = <TableRow name={elem} id={i} />;
      }
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
