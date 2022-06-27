import { Auth } from "@firebase/auth";
import React, { useState } from "react";
import inputManager from "../ts/InputManager";
import Final from "./Final";
import Footer from "./Footer";
import PatternList from "./Forms/PatternList";
import Table from "./Forms/Table";

const Form = (props: {db: any, auth: Auth}) => {
  const [ stage, setStage ] = useState('pattern');

  const onClick = () => {
    if (!inputManager.getPatterns.length) {
      alert("Будь ласка хоча б один патерн чи баркод");
      return;
    }
    if (stage === "pattern") {
      setStage('table');
    } else if (stage === "table" && inputManager.codePrepared) {
      setStage("final");
    }
  }

  return (
      <div>
        {stage === "pattern" ? (
          <div className="main-pattern-instruction">
            Додайте файл патерну чи баркоду та підтвердіть:
          </div>
        ) : null}
        {stage === "table" ? (
          <Table />
        ) : stage === "pattern" ? (
          <PatternList db={props.db} auth={props.auth} />
        ) : (
          <Final db={props.db}/>
        )}
        <div className="main-button" style={{ marginTop: "24px" }}>
          {stage === "final" ? null : (
            <button className="btn btn-primary" onClick={onClick}>
              Підтвердити
            </button>
          )}
        </div>

        {stage === "final" ? null : <Footer />}
      </div>
    );
}

export default Form;
