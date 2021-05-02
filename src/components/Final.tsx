import inputManager from "../ts/InputManager";
import { finalOutput } from "../ts/output";

export default function Final() {
  return (
    <div className="final-output">
      <b>Згенерований код для вашої програми:</b>
      <br></br>
      <br></br>
      <div style={{ whiteSpace: "pre" }}>
        {inputManager.compileData()} {finalOutput}
      </div>
    </div>
  );
}
