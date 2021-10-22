import React from "react";
import ReactDom from "react-dom";
import largeNumber from "fxt-largenumber";
import Icon from "./icon.js";
import svg from "./actAdmin.svg";

function Comp() {
  return (
    <div>
      <Icon path={svg} />
    </div>
  );
}

ReactDom.render(<Comp />, document.getElementById("app"));
