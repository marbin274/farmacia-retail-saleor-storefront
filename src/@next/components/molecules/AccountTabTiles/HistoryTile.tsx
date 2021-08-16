import React from "react";
import { Attribute, Tile } from "@components/atoms";
import * as S from "./styles";
import shopping from "@temp/images/shopping.png";
export const ShoppingHistoryTile: React.FC = () => {

  return (
    <S.TileWrapper >
      <Tile className=" rounded-md ">
        <S.Wrapper className="fa-flex fa-pt-8 fa-px-2 fa-pb-2 ">
          <S.Content>
            <S.HeaderSmall className="personal_data fa-justify-center">
              Mi última compra
            </S.HeaderSmall>

            <S.AttributeWrapper>
              <S.Image src={shopping} alt="categories" />
            </S.AttributeWrapper>

            <S.AttributeWrapper>
              <Attribute
                description="No tienes compras registradas"
                attributeValue={""}
              />
            </S.AttributeWrapper>

          </S.Content>
        </S.Wrapper>
      </Tile>
    </S.TileWrapper>
  );
};
