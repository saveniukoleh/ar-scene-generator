import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="alert alert-dismissible alert-info">
          <strong>Ви можете</strong> завантажити всі необхідні бібліотеки{" "}
          <a
            className="alert-link"
            href="https://drive.google.com/u/0/uc?id=1mJgat4qDhj9fVxP9XVrlDdqTTM60itb6&export=download"
          >
            тут
          </a>
          .<br></br>
          <strong>Щоб прочитати</strong> документацію, перейдіть за{" "}
          <a
            className="alert-link"
            href="https://github.com/saveniukoleg/ar-scene-generator/"
          >
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
