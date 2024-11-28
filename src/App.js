import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import Forecast from "./components/Forecast";

const App = () => {
  const [data, setData] = useState([]);

  return (
    <div>
      <h1>Sales Forecasting App</h1>
      <FileUpload onDataLoaded={setData} />
      {data.length > 0 && <Forecast data={data} />}
    </div>
  );
};

export default App;
