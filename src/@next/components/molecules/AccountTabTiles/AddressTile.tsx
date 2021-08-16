import React from "react";
import { Attribute, Tile } from "@components/atoms";
import * as S from "./styles";
import gps from "@temp/images/gps_icon_dash.png";
import { Button } from "@farmacia-retail/farmauna-components";


  export const MainAddressTile = () => {
    return (
      <S.TileWrapper >
        <Tile className=" rounded-md ">
          <S.Wrapper className="fa-flex fa-pt-8 fa-px-2 fa-pb-2 ">
            <S.Content>
              <S.HeaderSmall className="personal_data fa-justify-center">
              Mi dirección principal
              </S.HeaderSmall>

              <S.AttributeWrapper>
                <S.Image src={gps} alt="gps" />
              </S.AttributeWrapper>

              <S.AttributeWrapper>
                <Attribute
                  description="Agrega una dirección de envío y tu compra será más rápida. "
                  attributeValue={""}
                />
              </S.AttributeWrapper>

              <S.AttributeWrapper>
                <Button size="small"
                  variant="outline"
                >
                  Agregar dirección
                </Button>
              </S.AttributeWrapper>

            </S.Content>
          </S.Wrapper>
        </Tile>
      </S.TileWrapper>
    );
  };