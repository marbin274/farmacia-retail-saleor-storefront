import React from 'react';
import { Attribute, Tile } from '@components/atoms';
import * as S from './styles';
import category from '@temp/images/category.svg';
import { Button } from '@farmacia-retail/farmauna-components';
import { useHistory } from 'react-router-dom';
import { accountCategoriesUrl } from '@temp/@next/pages/AccountPage/paths';
export const CategoryTile: React.FC = () => {
  const history = useHistory();
  return (
    <S.TileWrapper>
      <Tile className="rounded-md">
        <S.Wrapper className="fa-flex fa-pt-8 fa-px-2 fa-pb-2">
          <S.Content>
            <S.HeaderSmall className="personal_data fa-justify-center">
              Mis categorías
            </S.HeaderSmall>

            <S.AttributeWrapper>
              <S.Image src={category} alt="category" />
            </S.AttributeWrapper>

            <S.AttributeWrapper>
              <Attribute
                description="Elige las categorías que prefieras y te recomendaremos los productos que te podrán interesar. "
                attributeValue=""
              />
            </S.AttributeWrapper>

            <S.AttributeWrapper>
              <Button
                size="small"
                variant="outline"
                onClick={() => history.push(accountCategoriesUrl)}
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
