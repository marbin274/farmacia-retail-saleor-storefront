import { TaxedMoney } from "@components/containers";
import {
  OrderDetail,
  OrderDetail_lines,
} from "@sdk/fragments/gqlTypes/OrderDetail";
import {
  OrderStatus,
  ShippingStatusEnum,
} from "@temp/@sdk/gqlTypes/globalTypes";
import { CartTable, NotFound } from "@temp/components";
import { ILine } from "@temp/components/CartTable/ProductRow";
import AunaError from "@temp/images/auna/auna-error.svg";
import * as React from "react";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";
import { orderHistoryUrl } from "../../../app/routes";

const Title: React.FC<{ className?: string }> = ({
  children,
  className = "",
}) => (
  <span
    className={`fa-text-sm fa-text-neutral-dark fa-font-medium ${className}`}
  >
    {children}
  </span>
);
const Description: React.FC<{ className?: string }> = ({
  children,
  className,
}) => (
  <span
    className={`fa-text-sm fa-text-neutral-darkest fa-font-medium ${className}`}
  >
    {children}
  </span>
);

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

  const getAdressGeneral = () => {
    if (address) {
      return (
        <div className="fa-flex fa-flex-col">
          <Title className="fa-mb-2">Dirección</Title>
          <Description className="fa-mb-4 fa-flex fa-flex-col">
            {address.companyName && <span>{address.companyName}</span>}
            <span>{address.streetAddress1}</span>
            <span>
              {address.streetAddress2 && <>{address.streetAddress2}</>}
            </span>
          </Description>
        </div>
      );
    }
  };
  const getAdressDetails = () => {
    if (address) {
      return (
        <div className="fa-flex fa-flex-col">
          <div className="fa-flex fa-mb-4">
            <Title className="fa-mr-2">Distrito</Title>
            <Description>{address.city}</Description>
          </div>
          <div className="fa-flex fa-mb-4">
            <Title className="fa-mr-2">País</Title>
            <Description className="fa-flex fa-flex-col">
              <div>
                {`${address.postalCode ? `, ${address.postalCode}` : ""}`}
              </div>

              {address.countryArea && <div>{address.countryArea}</div>}
              <div>{address.country.country}</div>
            </Description>
          </div>
          <div className="fa-flex fa-mb-4">
            <Title className="fa-mr-2">Celular</Title>
            <Description>{address.phone}</Description>
          </div>
        </div>
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
      <div className="fa-bg-white fa-rounded-3xl fa-p-10 fa-flex fa-flex-col">
        <span className="fa-mb-6 fa-font-semibold fa-text-xl">{`${address.firstName} ${address.lastName}`}</span>
        <div className="fa-grid fa-gap-x-2 fa-grid-cols-1 md:fa-grid-cols-3 ">
          <div>
            <div className="fa-flex fa-flex-col">
              <Title className="fa-mb-2">Número de pedido</Title>
              <Description className="fa-mb-4">
                {order.sequentialCode}
              </Description>
            </div>
            <div className="fa-flex fa-flex-col">
              <Title className="fa-mb-2">Estado</Title>
              <Description className="fa-mb-4">
                {order.customerStatusDisplay}
              </Description>
            </div>
            {order.shippingStatus === ShippingStatusEnum.DELIVERED &&
              order.status === OrderStatus.PARTIALLY_FULFILLED && (
                <span>
                  <ReactSVG
                    path={AunaError}
                    className="order-details__tile-alert-fulfill-icon"
                  />
                  <span>Este pedido fue entregado parcialmente</span>
                </span>
              )}
          </div>
          <div>{getAdressGeneral()}</div>
          <div>{getAdressDetails()}</div>
        </div>
      </div>
      <div className='md:fa-px-12 fa-bg-white fa-rounded-3xl fa-px-6 fa-mt-4 fa-py-8 fa-mb-24'>
        <CartTable
          lines={extractOrderLines(order.lines)}
          totalCost={<TaxedMoney taxedMoney={order.total} />}
          deliveryCost={<TaxedMoney taxedMoney={order.shippingPrice} />}
          subtotal={<TaxedMoney taxedMoney={order.subtotal} />}
        />
      </div>
    </div>
  );
};

export default Page;
