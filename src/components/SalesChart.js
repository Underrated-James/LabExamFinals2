import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register required Chart.js components for the bar chart
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SalesChart = ({ data, predictions }) => {
  const actualSales = data.map((d) => d.quantity_sold || 0); // Fallback for missing data
  const predictedSales = predictions.map((p) => p.quantity_sold || 0);

  const labels = [
    ...data.map((d) => d.sales_date),
    ...predictions.map((p, index) => `Future-${index + 1}`),
  ];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Actual Sales",
        data: actualSales,
        backgroundColor: "rgba(0, 123, 255, 0.6)", // Blue with opacity
        borderColor: "rgba(0, 123, 255, 1)",
        borderWidth: 1,
      },
      {
        label: "Predicted Sales",
        data: predictedSales,
        backgroundColor: "rgba(255, 165, 0, 0.6)", // Orange with opacity
        borderColor: "rgba(255, 165, 0, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "400px", marginTop: "30px" }}>
      <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default SalesChart;
