// @flow

import genLocation from './genLocation';

import React, { useEffect, useState } from "react";
import Roundel from "./components/Roundel.react";
import "./App.css";
import genStations from "./genStations";
import type { Station } from "./genStations";

function App(): React$MixedElement {
  const [station, setStation] = useState<?Station>(null);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    async function loadStation() {
      setIsLoading(true);
      setStation(null);
      setError(false);
      const result = await genLocation();
      const stations = await genStations(result);
      setStation(stations[0]);
      setIsLoading(false);
    }
    try {
      loadStation();
    } catch(err) {
      setError(true);
      setIsLoading(false);
    }
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <Roundel />
        {isLoading && <p>Loading station information</p>}
        {!error && station && <p>{station.name} ({station.modes.join(', ')})</p>}
      </header>
    </div>
  );
}

export default App;
