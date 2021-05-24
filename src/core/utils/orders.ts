import { OrderStatus } from "@temp/@sdk/gqlTypes/globalTypes";

export const translateOrderStatus = (
    status: string,
    statusDisplay = ""
  ): string => {
    switch (status) {
      case OrderStatus.UNFULFILLED:
        return "Recibido";
      case OrderStatus.PARTIALLY_FULFILLED:
        return "Pagado";
      case OrderStatus.FULFILLED:
        return "Atendido";
      case OrderStatus.CANCELED:
        return "Cancelado";
      default:
        return statusDisplay;
    }
  };
  