import React from 'react';
import ReactDom from 'react-dom';

function Comp() {
  return <div>11</div>;
}

ReactDom.render(<Comp />, document.getElementById('app'));
