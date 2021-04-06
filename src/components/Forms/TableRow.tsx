import { useState } from "react";
import inputManager from "../../ts/InputManager";

export default function TableRow(props: { name: string; id: number }) {
  const [fileName, updateFileName] = useState("");
  const [musicfileName, updateMusicFileName] = useState("");

  const [fileEntered, updateFileEntered] = useState(false);
  const [musicfileEntered, updateMusicFileEntered] = useState(false);

  const [contentType, updateContentType] = useState("image");

  function onInput(e: any) {
    e.preventDefault();
    const filename = e.target.files[0].name;
    updateFileName(filename);
    updateFileEntered(true);
    if (contentType === "image") {
      inputManager.updateData("image", filename, props.id);
    } else if (contentType === "video") {
      inputManager.updateData("video", filename, props.id);
    } else if (contentType === "model") {
      inputManager.updateData("model", filename, props.id);
    }
  }

  function onMusicInput(e: any) {
    e.preventDefault();
    const filename = e.target.files[0].name;
    updateMusicFileName(filename);
    updateMusicFileEntered(true);
    inputManager.updateData("sound", filename, props.id);
  }

  function updateCols(newContentType: string) {
    if (newContentType === "Зображення") {
      newContentType = "image";
    } else if (newContentType === "Відео") {
      newContentType = "video";
    } else if (newContentType === "Модель") {
      newContentType = "model";
    }
    updateContentType(newContentType);
    inputManager.updateData("mode", newContentType, props.id);
  }

  function onCheckboxToggle(e: any) {
    inputManager.updateData("repeat", `${e.target.checked}`, props.id);
  }

  return (
    <tr className="table-default">
      <td>{props.name}</td>
      <td>
        <select
          className="form-control"
          onChange={(e) => updateCols(e.target.value)}
        >
          <option>Зображення</option>
          <option>Відео</option>
          <option>Модель</option>
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
              Виберіть файл
            </label>
          </div>
        )}
      </td>
      <td>
        {contentType !== "video" ? (
          musicfileEntered ? (
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
                Виберіть файл
              </label>
            </div>
          )
        ) : null}
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
            Перемкнути
          </label>
        </div>
      </td>
    </tr>
  );
}
