import { Address, IconButton, Tile } from "@components/atoms";
import starIcon from "images/auna/star.svg";
import starActiveIcon from "images/auna/starActive.svg";
import React from "react";
import ReactSVG from "react-svg";
import * as S from "./styles";
import { IProps } from "./types";



export const AddressTile: React.FC<IProps> = ({
  onEdit,
  onRemove,
  setDefault,
  removeDefault,
  address,
}: IProps) => {


  const isDefault: boolean = React.useMemo(() => address.isDefaultShippingAddress, [address]);
  const handleOnchangeDefaultAddress = () => {
    if (isDefault) { 
      removeDefault();
      return; 
    }
    setDefault("BILLING");
    setDefault("SHIPPING");
  }


  const header = (
    <S.HeaderContent>
      <S.SelectDefaultAddress
        role="default-address"
        isDefault={isDefault}
        onClick={handleOnchangeDefaultAddress}>
        <S.SelectIcon>
          <ReactSVG path={isDefault ? starActiveIcon : starIcon} />
        </S.SelectIcon>
        <span>Usar como dirección principal</span>
      </S.SelectDefaultAddress>
    </S.HeaderContent>
  );
  const footer = (
    <S.FooterContent>
      <div>
        <IconButton name="edit" onClick={onEdit} size={22} />
      </div>
      <div>
        <IconButton name="trash" onClick={onRemove} size={22} />
      </div>
    </S.FooterContent>
  );

  const content = <Address {...address} />;
  return (
    <S.Wrapper>
      <Tile
        footer={footer}
        header={header}
      >{content}</Tile>
    </S.Wrapper>
  );
};
