import React, { useState } from "react";
import Papa from "papaparse";

const FileUpload = ({ onDataLoaded, onProductsExtracted }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const data = results.data;
          onDataLoaded(data);

          // Extract unique products
          const uniqueProducts = [
            ...new Set(data.map((row) => row.product_description)),
          ];
          onProductsExtracted(uniqueProducts);
        },
      });
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
