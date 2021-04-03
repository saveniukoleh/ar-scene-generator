import outputHTMLConfig from "../ts/output";

export default function Final() {
  function compileOutput() {
    let str: string = "";
    outputHTMLConfig.forEach((el) => {
      str += el;
    });
    return str;
  }

  return (
    <div className="final-output">
      <b>Згенерований код для вашої програми:</b>
      <br></br>
      <br></br>
      {outputHTMLConfig.join("\n")}
    </div>
  );
}
