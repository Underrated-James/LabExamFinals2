export const preprocessData = (data) => {
    const processedData = data.map((row) => {
      // Ensure that sales_date is a valid string and correctly formatted (e.g., "2024-01")
      let salesDateMonth = 0;
      if (row.sales_date && row.sales_date.includes("-")) {
        const dateParts = row.sales_date.split("-");
        if (dateParts.length > 1) {
          salesDateMonth = parseInt(dateParts[1], 10); // Get the month as a number
        }
      }
  
      // Handle quantity_sold, ensure it's a valid number
      const quantitySold = row.quantity_sold ? parseFloat(row.quantity_sold) : 0;
  
      return {
        sales_date: salesDateMonth,
        product_description: row.product_description === "Product A" ? 0 : 1, // Encode as numerical
        quantity_sold: quantitySold,
      };
    });
  
    const quantities = processedData.map((d) => d.quantity_sold);
    const maxQuantity = Math.max(...quantities);
    
    // Normalize quantity_sold values by dividing by maxQuantity
    const normalizedData = processedData.map((d) => ({
      ...d,
      quantity_sold: d.quantity_sold / maxQuantity, // Normalize values
    }));
  
    return { normalizedData, maxQuantity };
  };
  