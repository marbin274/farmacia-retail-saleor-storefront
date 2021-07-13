import { Address, Tile } from "@components/atoms";
import { PencilIcon, StarFilledIcon, TrashIcon, Button } from "@farmacia-retail/farmauna-components";
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
          className={`fa-flex-shrink-0 fa-h-6 fa-w-6 fa-flex fa-items-center fa-justify-center fa-rounded ${
            isDefault ? "fa-bg-brand-01" : "fa-bg-neutral-dark"
          }`}
        >
          <StarFilledIcon
            size={12}
            color={farmatheme.theme.colors.neutral.lightest}
          />
        </div>
        <span className={`fa-pl-2 fa-text-xs fa-font-semibold ${isDefault ? 'fa-text-primary-medium' : 'fa-text-neutral-dark'}`}>
          Usar como dirección principal
        </span>
      </S.SelectDefaultAddress>
      <div className="fa-flex fa-items-center ">
        <Button
          role="edit-option"
          className='fa-mr-4'
          onClick={onEdit}
          size="small"
          iconOnly
          icon={<PencilIcon size={13} color={farmatheme.theme.colors.white} />} 
        />
        <Button
          role="delete-option"
          onClick={onRemove}
          size="small"
          iconOnly
          icon={<TrashIcon size={13} color={farmatheme.theme.colors.white} />} 
        />
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
