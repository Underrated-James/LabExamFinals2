import React, { useState } from "react";
import { buildAndTrainModel, predictFutureSales } from "../services/model";
import { preprocessData } from "../services/preprocess";
import SalesChart from "./SalesChart";

const Forecast = ({ data }) => {
  const [predictions, setPredictions] = useState([]);

  const handleForecast = async () => {
    const { normalizedData, maxQuantity } = preprocessData(data);
    const model = await buildAndTrainModel(normalizedData);
    const futurePredictions = predictFutureSales(model, maxQuantity);
    setPredictions(futurePredictions);
  };

  return (
    <div>
      <button onClick={handleForecast}>Forecast Sales</button>
      <SalesChart data={data} predictions={predictions} />
    </div>
  );
};

export default Forecast;
