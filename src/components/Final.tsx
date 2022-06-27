import { useEffect } from "react";
import inputManager from "../ts/InputManager";

import { doc, getDoc, setDoc, getFirestore, collection } from "firebase/firestore";

export default function Final(props: {db: any}) {

  const db = props.db;
  const markersR = collection(db, 'markers');

  useEffect(() => {
    const finalOutput = document.getElementById("finalOutput");
    const code = inputManager.compileData(markersR);
    finalOutput.innerText = code;
  });

  return (
    <div className="final-output">
      <b>Згенерований код для вашої програми:</b>
      <br></br>
      <br></br>
      {/* <button onClick={copyCode}>Copy text</button> */}
      <div id="finalOutput" style={{ whiteSpace: "pre" }}></div>
    </div>
  );
}
