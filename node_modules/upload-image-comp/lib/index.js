import React, { useRef } from "react";

import "./index.css";

function Upload({
  children,
  multiple = true,
  url = "",
  disabled = false,
  onCheck = () => true,
  onChange = () => {},
}) {
  const inputRef = useRef();

  const onClickInput = () => {
    const ele = inputRef.current;
    !disabled && ele.click();
  };

  const onChangeFile = (e) => {
    const list = e?.target?.files;
    const files = Array.from(list);
    if (!onCheck(files)) return false;

    files.map((o) => {
      o.status = "uploading";

      const controller = new AbortController();
      const { signal } = controller;

      o.cancel = () => controller.abort();

      onChange([...files]);

      fetch(url, { body: files, method: "POST", signal })
        .then((res) => {
          if (res.status === 200) return res.json();

          throw "error";
        })
        .then((res) => {
          o.res = res;
          o.status = "success";
          onChange([...files]);
        })
        .catch((e) => {
          if (e.message === "The user aborted a request.") {
            o.status = "cancel";
          } else {
            o.status = "error";
          }
          onChange([...files]);
        });
    });
  };

  return (
    <div
      className={`upload-images-box ${
        disabled && "disabled-upload-images-box"
      }`}
    >
      <div onClick={() => onClickInput()}>{children || "上传"}</div>
      <input
        type="file"
        multiple={multiple}
        ref={inputRef}
        onChange={onChangeFile}
        value=""
        className="input"
      />
    </div>
  );
}

export default Upload;
