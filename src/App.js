import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import Forecast from "./components/Forecast";

const App = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");

  return (
    <div>
      <h1>Sales Forecasting App</h1>
      <FileUpload
        onDataLoaded={setData}
        onProductsExtracted={setProducts}
      />
      {products.length > 0 && (
        <div>
          <label htmlFor="product-select">Select a Product:</label>
          <select
            id="product-select"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value="">All Products</option>
            {products.map((product, index) => (
              <option key={index} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>
      )}
      {data.length > 0 && (
        <Forecast data={data} selectedProduct={selectedProduct} />
      )}
    </div>
  );
};

export default App;
