import React from "react";
import { Attribute, Tile } from "@components/atoms";
import * as S from "./styles";
import categories from "@temp/images/categories.png";
import { Button } from "@farmacia-retail/farmauna-components";
export const CategoryTile: React.FC = () => {

  return (
    <S.TileWrapper >
      <Tile className=" rounded-md ">
        <S.Wrapper className="fa-flex fa-pt-8 fa-px-2 fa-pb-2 ">
          <S.Content>
            <S.HeaderSmall className="personal_data fa-justify-center">
              Mis categorías
            </S.HeaderSmall>

            <S.AttributeWrapper>
              <S.Image src={categories} alt="categories" />
            </S.AttributeWrapper>

            <S.AttributeWrapper>
              <Attribute
                description="Elige las categorías que prefieras y te recomendaremos los productos que te podrán interesar. "
                attributeValue={""}
              />
            </S.AttributeWrapper>

            <S.AttributeWrapper>
              <Button size="small"
                variant="outline"
              >
                Ir a categorias
              </Button>
            </S.AttributeWrapper>

          </S.Content>
        </S.Wrapper>
      </Tile>
    </S.TileWrapper>
  );
};
