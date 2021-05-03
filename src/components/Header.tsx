import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="alert alert-dismissible alert-info">
          <strong>Ви можете</strong> завантажити всі необхідні бібліотеки з{" "}
          <a
            className="alert-link"
            href="https://github.com/saveniukoleg/ar-scene-libraries"
          >
            цього репозиторію
          </a>
          .<br></br>
          <strong>Щоб прочитати</strong> повну документацію, перейдіть за{" "}
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
