import { Address, Tile } from "@components/atoms";
import { PencilIcon, StarFilledIcon, TrashIcon } from "@farmacia-retail/farmauna-components";
import farmatheme from "@farmatheme";
import React from "react";
import * as S from "./styles";
import { IProps } from "./types";

export const AddressTile: React.FC<IProps> = ({
  onEdit,
  onRemove,
  setDefault,
  removeDefault,
  address,
}: IProps) => {
  const isDefault: boolean = React.useMemo(
    () => address.isDefaultShippingAddress,
    [address]
  );
  const handleOnchangeDefaultAddress = () => {
    if (isDefault) {
      removeDefault();
      return;
    }
    setDefault("BILLING");
    setDefault("SHIPPING");
  };

  const header = (
    <S.HeaderContent role="address-tile">
      <S.SelectDefaultAddress
        role="default-address"
        isDefault={isDefault}
        onClick={handleOnchangeDefaultAddress}
      >
        <div
          role="address-status-flag"
          className={`fa-h-6 fa-w-6 fa-flex fa-items-center fa-justify-center fa-rounded ${
            isDefault ? "fa-bg-brand-01" : "fa-bg-neutral-medium"
          }`}
        >
          <StarFilledIcon
            size={12}
            color={farmatheme.theme.colors.neutral.lightest}
          />
        </div>
        <span className="fa-text-xs fa-font-semibold">
          Usar como dirección principal
        </span>
      </S.SelectDefaultAddress>
      <div className="fa-flex fa-items-center ">
        <div
          role="edit-option"
          onClick={onEdit}
          className="hover:fa-bg-primary-light fa-rounded-lg fa-cursor-pointer fa-bg-primary-lightest fa-w-6 fa-h-6 fa-flex fa-items-center fa-justify-center"
        >
          <PencilIcon size={13} color={farmatheme.theme.colors.green} />
        </div>
        <div
          role="delete-option"
          onClick={onRemove}
          className="hover:fa-bg-primary-light fa-rounded-lg fa-cursor-pointer fa-bg-primary-lightest fa-w-6 fa-h-6 fa-flex fa-items-center fa-justify-center fa-ml-2 "
        >
          <TrashIcon size={13} color={farmatheme.theme.colors.green} />
        </div>
      </div>
    </S.HeaderContent>
  );

  const content = <Address {...address} />;
  return (
    <S.Wrapper>
      <Tile header={header}>{content}</Tile>
    </S.Wrapper>
  );
};
