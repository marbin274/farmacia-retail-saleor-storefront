import { Tile } from "@components/atoms";
import { TaxedMoney } from "@components/containers";
import {
  OrderDetail,
  OrderDetail_lines
} from "@sdk/fragments/gqlTypes/OrderDetail";
import {
  OrderStatus,
  ShippingStatusEnum
} from "@temp/@sdk/gqlTypes/globalTypes";
import { CartTable, NotFound } from "@temp/components";
import { ILine } from "@temp/components/CartTable/ProductRow";
import { ordeEncripted } from '@temp/core/utils';
import AunaError from "@temp/images/auna/auna-error.svg";
import * as React from "react";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";
import { orderHistoryUrl } from "../../../app/routes";

const extractOrderLines = (lines: OrderDetail_lines[]): ILine[] => {
  return lines
    .map(line => ({
      quantity: line.quantity,
      totalPrice: {
        ...line.unitPrice,
        currency: line.unitPrice.currency,
        gross: {
          amount: line.quantity * line.unitPrice.gross.amount,
          ...line.unitPrice.gross,
        },
        net: {
          amount: line.quantity * line.unitPrice.net.amount,
          ...line.unitPrice.net,
        },
      },
      ...line.variant,
      name: line.productName,
    }))
    .sort((a, b) => b.id.toLowerCase().localeCompare(a.id.toLowerCase()));
};

const Page: React.FC<{
  guest: boolean;
  order: OrderDetail;
}> = ({ guest, order }) => {
  const address = order?.shippingAddress;

  const getAdressDetails = () => {
    if (address) {
      return (
        <>
          {address.companyName && (
            <>
              {address.companyName} <br />
            </>
          )}
          {address.streetAddress1}
          <br />
          {address.streetAddress2 && (
            <>
              {address.streetAddress2} <br />
            </>
          )}
          {address.city}
          {`${address.postalCode ? `, ${address.postalCode}` : ""}`}
          <br />
          {address.countryArea && (
            <>
              {address.countryArea} <br />
            </>
          )}
          {address.country.country}
          <br />
          {address.phone && (
            <>
              Celular: {address.phone} <br />
            </>
          )}
        </>
      );
    }
  };

  if (!order) {
    return <NotFound />;
  }

  return (
    <div className="order-details__container">
      {!guest && (
        <Link className="order-details__link" to={orderHistoryUrl}>
          Volver al historial de pedidos
        </Link>
      )}
      <p className="order-details__title">Detalle del pedido</p>
      <div className="order-details__info">
        <div className="order-details__tile-wrapper">
          <Tile>
            <p className="order-details__tile-title">Número de pedido</p>
            <p className="order-details__tile-description">{ordeEncripted(order.token)}</p>
            <p className="order-details__tile-title">Estado</p>
            <p>{order.customerStatusDisplay}</p>
            {order.shippingStatus === ShippingStatusEnum.DELIVERED &&
              order.status === OrderStatus.PARTIALLY_FULFILLED && (
                <p className="order-details__tile-alert-fuilfill">
                  <ReactSVG
                    path={AunaError}
                    className="order-details__tile-alert-fulfill-icon"
                  />
                  <span>Este pedido fue entregado parcialmente</span>
                </p>
              )}
          </Tile>
        </div>
        <div className="order-details__tile-wrapper-address">
          <Tile>
            <p className="order-details__tile-title">{`${address.firstName} ${address.lastName}`}</p>
            <p className="order-details__tile-address">{getAdressDetails()}</p>
          </Tile>
        </div>
      </div>
      <CartTable
        lines={extractOrderLines(order.lines)}
        totalCost={<TaxedMoney taxedMoney={order.total} />}
        deliveryCost={<TaxedMoney taxedMoney={order.shippingPrice} />}
        subtotal={<TaxedMoney taxedMoney={order.subtotal} />}
      />
    </div>
  );
};

export default Page;
