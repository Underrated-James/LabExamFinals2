export const preprocessData = (data) => {
  const processedData = data.map((row) => {
    const salesDateMonth = row.sales_date
      ? parseInt(row.sales_date.split("-")[1], 10)
      : 0;
    const quantitySold = row.quantity_sold ? parseFloat(row.quantity_sold) : 0;

    return {
      sales_date: salesDateMonth,
      product_description: row.product_description === "Product A" ? 0 : 1,
      quantity_sold: quantitySold,
    };
  });

  const quantities = processedData.map((d) => d.quantity_sold);
  const maxQuantity = Math.max(...quantities);

  const normalizedData = processedData.map((d) => ({
    ...d,
    quantity_sold: d.quantity_sold / maxQuantity,
  }));

  return { normalizedData, maxQuantity };
};
