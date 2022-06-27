import React, { Component, useState } from "react";
import inputManager from "../../ts/InputManager";

import { useAuthState } from 'react-firebase-hooks/auth';
import { Auth } from "firebase/auth";
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { doc, getDoc, setDoc, getFirestore, collection } from "firebase/firestore";

const createID = () => {
  let id = 0;
  return () => {
    id++;
    return id;
  }
}
const generateID = createID();

const PatternList = (props: { db: any, auth: Auth; }) => {
  const [ user ] = useAuthState(props.auth);

  const [ patternListValues, setPatternListValues ] = useState([]);
  const [ patternId, setPatternId] = useState(0);

  const db = props.db;
  const markersR = collection(db, 'markers');

  const onInput = (event: any) => {
    event.preventDefault();
    if (!event.target.files[0]) return;
    const name: string = event.target.files[0].name;
    if (name.split('.').pop() !== 'patt') {
      alert('Невірний формат файлу');
      return;
    };
    inputManager.addPattern(name);
    sendData(-1, name);
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

  const sendData = async (code: number = -1, pattern: string = '') => {
    await setDoc(doc(markersR), {id: generateID(), barcode: code, pattern: pattern});
  }

  const onChange = (event: any) => {
    event.preventDefault();
    const code = event.target.value;
    inputManager.addPattern(code);
    sendData(code, '');
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
          { user ? <><input
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