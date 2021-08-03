import { accountUrl as baseUrl } from "@temp/app/routes";

export const accountUrl = baseUrl;
export const accountCategoriesUrl = `${baseUrl}select-categories/`
export const addressBookUrl = `${baseUrl}address-book/`;
export const orderDetailsUrl = `${baseUrl}order/:id/`;
export const orderHistoryUrl = `${baseUrl}order-history/`;
export const paymentMethodsUrl = `${baseUrl}payment-methods/`;

export const links = [
    { url: accountUrl, label: "Mi perfil", testId:"my_account" },
    { url: accountCategoriesUrl, label: "Mis categorías", testId:"categories" },
    { url: addressBookUrl, label: "Mis direcciones", testId:"address_book" },
    { url: orderHistoryUrl, label: "Historial de pedidos", testId:"order_history" },
    { url: paymentMethodsUrl, label: "Mis medios de pago", testId:"payment_methods" },
  ];
