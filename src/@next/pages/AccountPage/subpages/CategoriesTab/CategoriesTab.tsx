import { Button, CheckIcon } from "@farmacia-retail/farmauna-components";
import { FavoriteCategoryInput } from "@temp/@sdk/gqlTypes/globalTypes";
import { CategoryList_categories_edges_node } from "@temp/@sdk/queries/gqlTypes/CategoryList";
import { useCategories, useSaveFavoriteCategories, useUserDetails } from "@temp/@sdk/react";
import { default as imageDesktop } from "@temp/images/auna/select-categories-desktop.png";
import { default as imageMobile } from "@temp/images/auna/select-categories-mobile.png";
import lodash from "lodash";
import React from "react";
import { CategoryItem } from "./CategoryItem";
import { ImagesTop, SaveConfirm } from "./styles";

export const CategoriesTab: React.FC = () => {
    const { data: categories } = useCategories();

    const { data: user, loading: userLoading, refetch: userRefetch } = useUserDetails();
    const favoriteCategories = user?.favoriteCategories;

    const [categoriesSelected, setCategoriesSelected] = React.useState<string[]>([]);
    const [canSave, setCanSave] = React.useState<boolean>(false);
    const [showSaveConfirm, setShowSaveConfirm] = React.useState<boolean>(false)

    const [
        saveFavoriteCategories, {
            loading: categoriesLoading,
        },
    ] = useSaveFavoriteCategories();

    const handleOnToogleCheck = (category: CategoryList_categories_edges_node, isSelected: boolean) => {
        const newCategoriesSelected = [...categoriesSelected];
        if (isSelected) {
            newCategoriesSelected.push(category.id);
        } else {
            const index = newCategoriesSelected.findIndex(it => it === category.id);
            newCategoriesSelected.splice(index, 1);
        }
        const isSame = lodash.isEqual(newCategoriesSelected.sort(), favoriteCategories.sort());
        setCanSave(!isSame);
        setCategoriesSelected(newCategoriesSelected);
    }

    const handleOnSave = async () => {
        if (canSave) {
            setCanSave(false);
            const favoriteCategoriesNotModified = lodash.intersection(favoriteCategories, categoriesSelected);
            const favoriteCategoriesUnmarked = lodash.difference(favoriteCategories, categoriesSelected);

            const categoriesToSend: FavoriteCategoryInput[] =
                categoriesSelected
                    .filter(it => !favoriteCategoriesNotModified.includes(it))
                    .map(it => ({ categoryId: it, isFavorite: true }))
                    .concat(
                        favoriteCategoriesUnmarked.map(it => ({ categoryId: it, isFavorite: false }))
                    )

            await saveFavoriteCategories({
                categories: categoriesToSend,
            });
            setShowSaveConfirm(true);
            setTimeout(() => {
                setShowSaveConfirm(false);
            }, 3000);
            userRefetch();
        }

    }

    React.useEffect(() => {
        if (categories && favoriteCategories) {
            setCategoriesSelected(favoriteCategories);
        }
    }, [categories, favoriteCategories])

    return (
        <div className="account-categories fa-relative md:fa-bg-white md:fa-p-8 md:fa-rounded-3xl">
            <ImagesTop
                imageMobile={imageMobile}
                imageDesktop={imageDesktop}
                className="fa-mb-4"
            />
            <p className="fa-text-center fa-font-medium fa-text-sm fa-mb-4">
                Elige las categorías que prefieras y te recomendaremos los productos con los mejores descuentos.
            </p>
            {
                showSaveConfirm && <SaveConfirm
                icon={<CheckIcon size={12} />}
                message="Categorías guardadas con éxito"
                className="fa-mb-4 md:fa-flex"
              />
            }
            {
                categories?.edges &&
                <div className="md:fa-bg-neutral-light md:fa-p-6 md:fa-rounded-3xl">
                    {categories.edges.map(({ node: category }, index) => {
                        const isSelected = !!categoriesSelected.find(it => it === category.id);
                        return (
                            <CategoryItem
                                key={index}
                                category={category}
                                isSelected={isSelected}
                                loading={categoriesLoading || userLoading}
                                toogle={handleOnToogleCheck}
                            />
                        );
                    })
                    }
                    <div className="md:fa-w-64 md:fa-mt-6 md:fa-mb-2">
                        <Button
                            disabled={!canSave}
                            fullWidth
                            onClick={handleOnSave}
                        >Guardar</Button>
                    </div>
                </div>
            }
        </div>
    );
}
