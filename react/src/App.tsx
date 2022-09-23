import {useEffect, useState} from 'react';
import './App.css';
import WeatherChart from "./components/WeatherChart";
import DTPicker from "./components/DTPicker";
import {api} from "./api/fetch";

import {FiguresContext} from "./figuresContext";


function App() {
  const [data, setData] = useState<Weather[]>([]);
  const updateFigures = { data, setData };

  useEffect(() => {
      api<Weather[]>("/weather")
          .then((data) => {
              setData(data || []);
          });
  }, []);

  return (
      <FiguresContext.Provider value={updateFigures}>
          <div className="App">
              <header className="App-header">
                  <h2>Weather API</h2>
                  <DTPicker/>
                  <WeatherChart
                      data={data}
                      params={["humidity", "pressure", "temperature"]}
                  />
              </header>
          </div>
      </FiguresContext.Provider>
  );
}

export default App;
