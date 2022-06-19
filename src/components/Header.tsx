import { getAuth } from "@firebase/auth";
import React from "react";
import SignIn from "./SingIn";

const Header = (props: {firebaseApp: any, auth: any}) => {
    return (
      <div className="header">
        <div className="alert alert-dismissible alert-info">
          Прочитати повну документацію, та завантажити файли бібліотек можна за{" "}
          <a className="alert-link" href="http://ar.gamehub.od.ua/docs.html">
            цим посиланням
          </a>
          .
        </div>
        <div className="language-select">
          <select
            className="form-control"
            onChange={(e) => {
              const value = e.target.value;
              if (value === 'EN') {
                window.location.href = "http://ar.gamehub.od.ua/en/index.html";
              } else if (value === 'UA') {
                window.location.href = "http://ar.gamehub.od.ua/";
              }
            }}
          >
            <option>UA</option>
            <option>EN</option>
          </select>
        </div>
        {/* <SignIn firebaseApp={props.firebaseApp} auth={props.auth}/> */}
      </div>
    );
}

export default Header;
