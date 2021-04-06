import inputManager from "../ts/InputManager";

export default function Final() {
  return (
    <div className="final-output">
      <b>Згенерований код для вашої програми:</b>
      <br></br>
      <br></br>
      {inputManager.compileData()}
    </div>
  );
}
