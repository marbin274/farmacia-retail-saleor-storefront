import React from 'react';
import { Attribute, Tile } from '@components/atoms';
import * as S from './styles';
import { Button } from '@farmacia-retail/farmauna-components';
import { accountCategoriesUrl } from '@temp/@next/pages/AccountPage/paths';
import { useCategories, useUserDetails } from '@temp/@sdk/react';
import { useRouter } from 'next/router';

export const CategoryTile: React.FC = () => {
  const { data: user } = useUserDetails();
  const { data: categories } = useCategories();
  const router = useRouter();

  return (
    <S.TileWrapper>
      <Tile className="rounded-md">
        <S.Wrapper className="fa-flex fa-pt-8 fa-px-2 fa-pb-2">
          <S.Content>
            <S.HeaderSmall className="personal_data fa-justify-center">
              Mis categorías
            </S.HeaderSmall>

            {user?.favoriteCategories?.length > 0 ? (
              <>
                <S.AttributeWrapper>
                  <Attribute
                    description="Tus categorias preferidas"
                    attributeValue={''}
                  />
                </S.AttributeWrapper>

                <S.AttributeWrapper>
                  <div className="fa-flex fa-flex-row fa-flex-wrap fa-mx-auto fa-justify-center">
                    {user?.favoriteCategories?.map((category, index) => (
                      <S.Chip
                        key={index}
                        className="fa-text-interactive fa-bg-complementary-03 fa-px-2 fa-py-1 fa-m-1"
                      >
                        {
                          categories?.edges?.find(
                            ({ node: c }) => c.id === category
                          )?.node?.name
                        }
                      </S.Chip>
                    ))}
                  </div>
                </S.AttributeWrapper>

                <div className="fa-mt-auto fa-text-center fa-mb-2">
                  <Button
                    size="small"
                    variant="outline"
                    onClick={() => router.push(accountCategoriesUrl)}
                  >
                    Editar categorias
                  </Button>
                </div>
              </>
            ) : (
              <>
                <S.AttributeWrapper>
                  <S.Image src="/assets/category.svg" alt="category" />
                </S.AttributeWrapper>

                <S.AttributeWrapper>
                  <Attribute
                    description="Elige las categorías que prefieras y te recomendaremos los productos que te podrán interesar. "
                    attributeValue={''}
                  />
                </S.AttributeWrapper>

                <S.AttributeWrapper>
                  <Button
                    size="small"
                    variant="outline"
                    onClick={() => router.push(accountCategoriesUrl)}
                  >
                    Ir a categorias
                  </Button>
                </S.AttributeWrapper>
              </>
            )}
          </S.Content>
        </S.Wrapper>
      </Tile>
    </S.TileWrapper>
  );
};
