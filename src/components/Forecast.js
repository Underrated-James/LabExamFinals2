import React, { useState, useEffect } from "react";
import { buildAndTrainModel, predictFutureSales } from "../services/model";
import { preprocessData } from "../services/preprocess";
import SalesChart from "./SalesChart";

const Forecast = ({ data }) => {
  const [predictions, setPredictions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [isForecasted, setIsForecasted] = useState(false);

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  const generateForecast = async () => {
    if (!selectedProduct) return;

    // Filter data by selected product
    const filteredData = data.filter(
      (row) => row.product_description === selectedProduct
    );

    if (filteredData.length === 0) {
      setPredictions([]); // Reset predictions if no data matches the product
      return;
    }

    const { normalizedData, maxQuantity } = preprocessData(filteredData);
    const model = await buildAndTrainModel(normalizedData);
    const futurePredictions = predictFutureSales(model, maxQuantity);
    setPredictions(futurePredictions);
    setIsForecasted(true); // Mark as forecasted
  };

  // Trigger forecast when the selected product changes after the first forecast
  useEffect(() => {
    if (isForecasted) {
      generateForecast();
    }
  }, [selectedProduct]);

  return (
    <div>
      <div>
        <label htmlFor="product-select">Select Product:</label>
        <select
          id="product-select"
          value={selectedProduct}
          onChange={handleProductChange}
        >
          <option value="">--Select a Product--</option>
          {[...new Set(data.map((row) => row.product_description))].map(
            (product, index) => (
              <option key={index} value={product}>
                {product}
              </option>
            )
          )}
        </select>
      </div>
      <button onClick={generateForecast}>Forecast Sales</button>
      <SalesChart data={data} predictions={predictions} />
    </div>
  );
};

export default Forecast;
