import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="alert alert-dismissible alert-info">
          To read full documentation and download required libraries use{" "}
          <a className="alert-link" href="http://ar.gamehub.od.ua/en/docs.html">
            this link
          </a>
          .
        </div>
        <div className="language-select">
          <select
            className="form-control"
            onChange={(e) => {
              const value = e.target.value;
              if (value === 'EN') {
                window.location.href = "https://ar.gamehub.od.ua/en/index.html";
              } else if (value === 'UA') {
                window.location.href = "https://ar.gamehub.od.ua/";
              }
            }}
          >
            <option>EN</option>
            <option>UA</option>
          </select>
        </div>
      </div>
    );
  }
}

export default Header;
