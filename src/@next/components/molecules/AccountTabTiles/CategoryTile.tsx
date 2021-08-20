import React from 'react';
import { Attribute, Tile } from '@components/atoms';
import * as S from './styles';
import category from '@temp/images/category.svg';
import { Button } from '@farmacia-retail/farmauna-components';
import { useHistory } from 'react-router-dom';
import { accountCategoriesUrl } from '@temp/@next/pages/AccountPage/paths';
import { useUserDetails } from '@temp/@sdk/react';

export const CategoryTile: React.FC = () => {
  const { data: user } = useUserDetails();
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

            {user?.favoriteCategories?.length > 0 ? (<>
              <S.AttributeWrapper>
                <Attribute
                  description="Tus categorias preferidas"
                  attributeValue={""}
                />
              </S.AttributeWrapper>

              <S.AttributeWrapper>
                <div  className="fa-flex fa-flex-row fa-flex-wrap fa-mx-auto fa-justify-center">
                  {
                    user?.favoriteCategories?.map((category, index) =>
                    (<S.Chip key={index} style={{  color: '#452FBA ',backgroundColor: '#EDEBFA'}}
                        >{category}</S.Chip>))
                  }
                </div>
              </S.AttributeWrapper>

              <S.AttributeWrapper>
                <Button
                  size="small"
                  variant="outline"
                  onClick={() => history.push(accountCategoriesUrl)}
                >
                  Editar categorias
                </Button>
              </S.AttributeWrapper>
            </>) : (<>
              <S.AttributeWrapper>
                <Attribute
                  description="Elige las categorías que prefieras y te recomendaremos los productos que te podrán interesar. "
                  attributeValue={""}
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
            </>)}

          </S.Content>
        </S.Wrapper>
      </Tile>
    </S.TileWrapper>
  );
};
