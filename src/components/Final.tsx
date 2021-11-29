import { useEffect } from "react";
import inputManager from "../ts/InputManager";

export default function Final() {
  useEffect(() => {
    const finalOutput = document.getElementById("finalOutput");
    const code = inputManager.compileData();
    finalOutput.innerText = code;
  });

  return (
    <div className="final-output">
      <b>Generated code for your index.html:</b>
      <br></br>
      <br></br>
      {/* <button onClick={copyCode}>Copy text</button> */}
      <div id="finalOutput" style={{ whiteSpace: "pre" }}></div>
    </div>
  );
}
