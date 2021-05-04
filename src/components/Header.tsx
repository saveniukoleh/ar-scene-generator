import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="alert alert-dismissible alert-info">
          Прочитати повну документацію, та завантажити файли бібліотек можна за{" "}
          <a className="alert-link" href="../../docs.html">
            цим посиланням
          </a>
          .
        </div>
        <div className="language-select">
          <select
            className="form-control"
            onChange={(e) => console.log(e.target.value)}
          >
            <option>UA</option>
            <option>EU</option>
            <option>RU</option>
          </select>
        </div>
      </div>
    );
  }
}

export default Header;
