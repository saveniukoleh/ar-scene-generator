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
          <b>Файл патерну</b>
        </td>
        <td>
          <b>Тип вмісту</b>
        </td>
        <td>
          <b>Файл вмісту</b>
        </td>
        <td>
          <b>Звуковий файл</b>
        </td>
        <td>
          <b>Автоматичне повторення</b>
        </td>
      </tr>
    );
    inputManager.prepareData();
    inputManager.getPatterns.forEach((elem: string, index) => {
      let newRow;
      if (elem === "") {
        let barcode = inputManager.getBarcode(index);
        console.log(barcode, index);
        newRow = <TableRow name={`Баркод під кодом ${barcode}`} id={i} />;
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
