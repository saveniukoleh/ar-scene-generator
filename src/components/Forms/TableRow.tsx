import { useState } from "react";

export default function TableRow(props: { name: string; id: number }) {
  const [fileName, updateFileName] = useState("");
  const [musicfileName, updateMusicFileName] = useState("");

  const [fileEntered, updateFileEntered] = useState(false);
  const [musicfileEntered, updateMusicFileEntered] = useState(false);

  const [contentType, updateContentType] = useState("image");
  const [autoRepeat, updateToggle] = useState();

  function onInput(e: any) {
    e.preventDefault();
    updateFileName(e.target.files[0].name);
    updateFileEntered(true);
  }

  function onMusicInput(e: any) {
    e.preventDefault();
    updateMusicFileName(e.target.files[0].name);
    updateMusicFileEntered(true);
  }

  function updateCols(newContentType: string) {
    updateContentType(newContentType);
  }

  function onCheckboxToggle(e: any) {
    console.log(`Auto repeat of checkbox #${props.id}`, e.target.checked);
  }

  return (
    <tr className="table-default">
      <td>{props.name}</td>
      <td>
        <select
          className="form-control"
          onChange={(e) => updateCols(e.target.value.toLocaleLowerCase())}
        >
          <option>Image</option>
          <option>Video</option>
          <option>Model</option>
        </select>
      </td>
      <td>
        {fileEntered ? (
          fileName
        ) : (
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input content-file-input"
              id="inputGroupFile02"
              onInput={onInput}
            ></input>
            <label className="custom-file-label" htmlFor="inputGroupFile02">
              Choose file
            </label>
          </div>
        )}
      </td>
      <td>
        {musicfileEntered ? (
          musicfileName
        ) : (
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input content-file-input"
              id="inputGroupFile02"
              onInput={onMusicInput}
            ></input>
            <label className="custom-file-label" htmlFor="inputGroupFile02">
              Choose file
            </label>
          </div>
        )}
      </td>
      <td>
        <div className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            onClick={onCheckboxToggle}
            id={`customSwitch${props.id}`}
          ></input>
          <label
            className="custom-control-label"
            htmlFor={`customSwitch${props.id}`}
          >
            Toggle
          </label>
        </div>
      </td>
    </tr>
  );
}
