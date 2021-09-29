import React from "react";
import ReactDom from "react-dom";
import largeNumber from "fxt-largenumber";

function Comp() {
  return <div>{largeNumber("1", "400")}</div>;
}

ReactDom.render(<Comp />, document.getElementById("app"));
