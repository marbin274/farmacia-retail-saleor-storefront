import { Button, DownIcon, UpIcon } from "@farmacia-retail/farmauna-components";
import { Checkbox, NavLink } from "@temp/@next/components/atoms";
import { CategoryList_categories_edges_node } from "@temp/@sdk/queries/gqlTypes/CategoryList";
import React from "react";
import * as S from "./styles";
import farmatheme from "@farmatheme";
import { convertCategoryToMenuItem } from "@temp/core/utils";
import classNames from "classnames";

export interface IProp {
    category: CategoryList_categories_edges_node;
    isSelected: boolean;
    loading: boolean;
    toogle: (isSelected: boolean) => void;
}

export const CategoryItem = ({
    category,
    isSelected,
    loading,
    toogle,
}) => {

    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    return (
        <div
            className={classNames(
                "fa-bg-white",
                "fa-border",
                "fa-border-solid",
                "fa-flex-col",
                "fa-items-center",
                "fa-mb-4",
                "fa-px-4",
                "fa-py-5",
                "fa-rounded-2xl",
                "hover:fa-border-interactive",
                {
                    "fa-border-interactive": isSelected,
                    "fa-border-transparent": !isSelected,
                }
            )}            
        >
            <S.CategoryItemRoot className="fa-flex">
                <Checkbox
                    className="fa-flex-1"
                    checked={isSelected}
                    data-cy="checkoutPaymentPromoCodeCheckbox"
                    disabled={loading}
                    name="termsAndConditions"
                    onChange={() => toogle(category, !isSelected)}
                />

                <S.CategoryName className="fa-capitalize fa-ml-2">{category.name?.toLowerCase()}</S.CategoryName>
                <div className="fa-flex-1 md:fa-flex-none fa-w-full">
                    {
                        isOpen ? <UpIcon size={16} color={farmatheme.theme.colors.highlight.medium} onClick={() => setIsOpen(false)} />
                            : <DownIcon size={16} color={farmatheme.theme.colors.highlight.medium} onClick={() => setIsOpen(true)} />
                    }
                </div>
            </S.CategoryItemRoot>
            {
                isOpen &&
                <div className="fa-mt-4 fa-border-t fa-border-solid fa-border-neutral-medium">
                    <ul>
                        {category.children.edges.map(({ node: child }, index) =>
                            <li key={index} className="fa-my-5 fa-text-neutral-dark fa-font-medium">{child.name}</li>
                        )}
                    </ul>
                    <NavLink
                        fullWidth
                        item={convertCategoryToMenuItem(category.id, category.name)}
                    >
                        <Button
                            className="fa-font-semibold fa-px-5"
                            type="button"
                            variant="outline"
                        >Ver todos los productos</Button>
                    </NavLink>
                </div>
            }
        </div>
    );
}
