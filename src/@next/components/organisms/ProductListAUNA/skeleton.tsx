import React from "react";
import { SkeletonProduct } from "@components/atoms";
import { useMediaScreen } from "@temp/@next/globalStyles";
import { List } from "./styles";


export const Skeleton = ({ columns }: { columns: number }) => {
    const { isDesktopScreen } = useMediaScreen();
    return (
        <List columns={columns}>
            {
                [...Array(12)].map((_, item) =>
                    <SkeletonProduct key={item} height={!isDesktopScreen ? 11 : undefined} width={isDesktopScreen ? 22 : undefined} />
                )
            }
        </List>
    );
}

