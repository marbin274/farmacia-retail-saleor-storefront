import { useCart } from "@temp/@sdk/react";
import { ICheckoutModelLine, ICheckoutModelLineVariant } from "@temp/@sdk/repository";
import React from "react";
import { useDistrictSelected } from "./useDistrictSelected";

export const useUpdateCartLines = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [district] = useDistrictSelected();
    const { items, getCartLines, updateCartLines } = useCart();

    const handleUpdate = async () => {
        if (items) {
            setLoading(true);
            const { data, error } = await getCartLines(district.code);
            if (!error) {
                const itemsUpdate: ICheckoutModelLine[] = items.map(line => {
                    const variantUpdate = data?.edges.find(it => it.node.id === line.variant.id);

                    if (!variantUpdate) {
                        return { ...line };
                    }
                    const quantity: number = (
                        variantUpdate.node.quantityAvailable < 1 ? 0 : (
                            line.quantity > variantUpdate.node.quantityAvailable ? variantUpdate.node.quantityAvailable : line.quantity
                        )
                    );
                    const variant: ICheckoutModelLineVariant = {
                        ...line.variant,
                        quantityAvailable: variantUpdate.node.quantityAvailable,
                    };
                    return {
                        ...line,
                        quantity,
                        variant,
                    }
                });
                updateCartLines(itemsUpdate);
            }

            setLoading(false);
        }
    }


    return {
        loading,
        update: handleUpdate,
    }
}
