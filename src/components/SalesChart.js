import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register required Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const SalesChart = ({ data, predictions }) => {
  // Debugging to ensure data is correct
  console.log("Data (Actual Sales):", data);
  console.log("Predictions (Raw):", predictions);

  // Safely map actual and predicted sales data
  const actualSales = data.map((d) => d.quantity_sold || 0); // Fallback for missing data
  const predictedSales = predictions.map((p) => {
    if (!p.quantity_sold) {
      console.warn("Missing quantity_sold in prediction:", p);
    }
    return p.quantity_sold || 0;
  });

  // Generate chart labels
  const labels = [
    ...data.map((d) => d.sales_date),
    ...predictions.map((p, index) => `Future-${index + 1}`), // Use index if sales_date is missing
  ];

  // Log labels and sales data for debugging
  console.log("Labels:", labels);
  console.log("Actual Sales Data:", actualSales);
  console.log("Predicted Sales Data:", predictedSales);

  // Define chart data structure
  const chartData = {
    labels,
    datasets: [
      {
        label: "Actual Sales",
        data: actualSales,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        fill: true, // Enable filling under the line
        tension: 0.4, // Smooth curve
        pointStyle: "circle",
        pointBorderColor: "blue",
        pointBackgroundColor: "white",
      },
      {
        label: "Predicted Sales",
        data: predictedSales,
        borderColor: "orange",
        backgroundColor: "rgba(255, 165, 0, 0.2)",
        fill: true, // Enable filling under the line
        tension: 0.4, // Smooth curve
        pointStyle: "circle",
        pointBorderColor: "orange",
        pointBackgroundColor: "white",
      },
    ],
  };

  console.log("Final Chart Data:", chartData); // Debugging chart data

  // Chart rendering
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default SalesChart;
