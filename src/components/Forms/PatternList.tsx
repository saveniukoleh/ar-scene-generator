import React, { Component, useState } from "react";
import inputManager from "../../ts/InputManager";

import { useAuthState } from 'react-firebase-hooks/auth';
import { Auth } from "firebase/auth";


const PatternList = (props: { auth: Auth; }) => {
  const [ user ] = useAuthState(props.auth);

  const [ patternListValues, setPatternListValues ] = useState([]);
  const [ patternId, setPatternId] = useState(0);

  const onInput = (event: any) => {
    event.preventDefault();
    if (!event.target.files[0]) return;
    const name: string = event.target.files[0].name;
    inputManager.addPattern(name);
    const newElem = React.createElement(
      "li",
      {
        className:
          "list-group-item d-flex justify-content-between align-items-center",
        key: patternId,
      },
      name
    );
    setPatternId( patternId + 1 );
    setPatternListValues([...patternListValues, newElem]);
  }

  const onChange = (event: any) => {
    event.preventDefault();
    const code = event.target.value;
    inputManager.addPattern(code);
    const newElem = React.createElement(
      "li",
      {
        className:
          "list-group-item d-flex justify-content-between align-items-center",
        key: patternId,
      },
      "Баркод під кодом ",
      code
    );
    setPatternId( patternId + 1 );
    setPatternListValues([...patternListValues, newElem]);
  }

  const prepareOptions = () => {
    let options = [];
    for (let i = 0; i <= 63; i++) {
      options.push(<option>{i}</option>);
    }
    return (
      <div
        className="form-group"
        style={{
          marginTop: "12px",
        }}
      >
        Обрати код баркоду:
        <select
          className="form-control"
          style={{ marginTop: "12px" }}
          onChange={onChange}
        >
          {options}
        </select>
      </div>
    );
  };

    return (
      <div className="pattern-list">
        <ul className="list-group">{patternListValues}</ul>
        <div className="custom-file pattern-file-input">
          { true || user ? <><input
            type="file"
            className="custom-file-input pattern-file-input__inner"
            id="inputGroupFile02"
            onInput={onInput}
          ></input>
          <label className="custom-file-label" htmlFor="inputGroupFile02">
            Виберіть файл
          </label></> : <></>}
          {prepareOptions()}
        </div>
      </div>
    );
}

export default PatternList