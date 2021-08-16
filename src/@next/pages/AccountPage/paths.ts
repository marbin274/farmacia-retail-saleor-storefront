export const appUrl = "/";
export const baseUrl = `${appUrl}account/`;
export const accountCategoriesUrl = `${baseUrl}select-categories/`
export const addressBookUrl = `${baseUrl}address-book/`;
export const orderHistoryUrl = `${baseUrl}order-history/`;
export const orderDetailsUrl = `${orderHistoryUrl}:token/`;
export const paymentMethodsUrl = `${baseUrl}payment-methods/`;

export const links = [
    { url: baseUrl, label: "Mi cuenta", testId:"my_account" },
    { url: accountCategoriesUrl, label: "Mis categorías", testId:"categories" },
    { url: addressBookUrl, label: "Mis direcciones", testId:"address_book" },
    { url: orderHistoryUrl, label: "Historial de pedidos", testId:"order_history" },
    { url: paymentMethodsUrl, label: "Mis medios de pago", testId:"payment_methods" },
  ];
