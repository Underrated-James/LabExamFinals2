import * as tf from "@tensorflow/tfjs";

export const buildAndTrainModel = async (data) => {
  const inputs = data.map((d) => [d.sales_date, d.product_description]);
  const labels = data.map((d) => d.quantity_sold);

  // Convert data to tensors
  const inputTensor = tf.tensor2d(inputs);
  const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

  // Build the model
  const model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [2], units: 8, activation: "relu" }));
  model.add(tf.layers.dense({ units: 8, activation: "relu" }));
  model.add(tf.layers.dense({ units: 1 }));

  model.compile({
    optimizer: tf.train.adam(),
    loss: "meanSquaredError",
  });

  // Train the model
  await model.fit(inputTensor, labelTensor, { epochs: 50 });

  return model;
};

export const predictFutureSales = (model, maxQuantity) => {
  const futureMonths = [1, 2, 3, 4, 5, 6];
  const products = [0, 1]; // Product A (0) and Product B (1)
  const predictions = [];

  for (const month of futureMonths) {
    for (const product of products) {
      const prediction = model
        .predict(tf.tensor2d([[month, product]]))
        .dataSync()[0];
      predictions.push({
        sales_date: month,
        product_description: product,
        quantity_sold: prediction * maxQuantity, // Denormalize
      });
    }
  }
  return predictions;
};
