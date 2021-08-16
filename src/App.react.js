// @flow

import React from "react";
import roundel from "./static/svg/underground.svg";
import "./App.css";

function App(): React$MixedElement {
  return (
    <div className="App">
      <header className="App-header">
        <img src={roundel} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
