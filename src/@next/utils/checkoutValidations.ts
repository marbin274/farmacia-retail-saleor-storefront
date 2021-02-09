// Remove specific items from local storage when cart is edited in the checkout process.
export const removePaymentItems = (): void => {
  localStorage.removeItem("purchase_number");
  localStorage.removeItem("data_payment");
};
