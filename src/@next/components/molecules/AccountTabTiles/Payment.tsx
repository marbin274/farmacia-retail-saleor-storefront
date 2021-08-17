import React from "react";
import { Attribute, Tile } from "@components/atoms";
import * as S from "./styles";
import card from "@temp/images/card.svg";
import { Button } from "@farmacia-retail/farmauna-components";
import { useHistory } from "react-router-dom";
export const MainCardTile: React.FC = () => {
  const history = useHistory();
  return (
    <S.TileWrapper >
      <Tile className="rounded-md ">
        <S.Wrapper className="fa-flex fa-pt-8 fa-px-2 fa-pb-2 ">
          <S.Content>
            <S.HeaderSmall className="personal_data fa-justify-center">
            Mi tarjeta principal
            </S.HeaderSmall>

            <S.AttributeWrapper>
              <S.Image src={card} alt="card" />
            </S.AttributeWrapper>

            <S.AttributeWrapper>
              <Attribute
                description="Agrega tu tarjeta de  débito/crédito y tu compra será más rápida."
                attributeValue={""}
              />
            </S.AttributeWrapper>

            <S.AttributeWrapper>
              <Button size="small"
                variant="outline"
                onClick={() => history.push("/account/payment-methods/")}
              >
                Agregar tarjeta
              </Button>
            </S.AttributeWrapper>

          </S.Content>
        </S.Wrapper>
      </Tile>
    </S.TileWrapper>
  );
};
