import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="alert alert-dismissible alert-info">
          <strong>You can</strong> download all of the required libraries{" "}
          <a
            className="alert-link"
            href="https://drive.google.com/u/0/uc?id=1mJgat4qDhj9fVxP9XVrlDdqTTM60itb6&export=download"
          >
            here
          </a>
          .<br></br>
          <strong>To read</strong> the documentation follow{" "}
          <a
            className="alert-link"
            href="https://github.com/saveniukoleg/ar-scene-generator/wiki"
          >
            this link
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
