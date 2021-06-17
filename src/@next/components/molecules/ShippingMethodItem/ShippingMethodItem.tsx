import { Radio } from "@components/atoms";
import { Money } from "@components/containers";
import { Chip } from "@farmacia-retail/farmauna-components";
import React from "react";
import * as S from "./styles";
import { IProps } from "./types";

export const ShippingMethodItem: React.FC<IProps> = ({
  id,
  index,
  isScheduled,
  name,
  selected,
  subtitle,
  price,
}) => {
  
  return (
    <S.ShippingMethodItem>
      <Radio
        readOnly
        data-cy={`checkoutShippingMethodOption${index}Input`}
        name="shippingMethod"
        value={id}
        checked={selected}
      ></Radio>
      <div className="fa-flex fa-flex-col fa-w-full">
        <S.ShippingMethodText>
          <S.ShippingMethodTitle
            data-cy={`checkoutShippingMethodOption${index}Name`}
            selected={selected}
          >
            {name}
          </S.ShippingMethodTitle>
          <S.ShippingMethodSubTitle selected={selected}>
            {isScheduled
              ? "Escoge la fecha y la hora de entrega"
              : subtitle}
          </S.ShippingMethodSubTitle>
        </S.ShippingMethodText>
        <Chip
          disabled={!selected}
          style={{
            display: "block",
            width: "4.25rem",
            textAlign: "center",
          }}
          label={
            <Money
              data-cy={`checkoutShippingMethodOption${index}Price`}
              money={price}
            />
          }
        />
      </div>
    </S.ShippingMethodItem>
  );
};
