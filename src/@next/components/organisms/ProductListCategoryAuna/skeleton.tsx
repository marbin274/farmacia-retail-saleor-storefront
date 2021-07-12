import React from "react";
import { SkeletonProductRow } from "@components/atoms";
import { useMediaScreen } from "@temp/@next/globalStyles";


export const Skeleton = () => {
    const { isDesktopScreen } = useMediaScreen();
    return <>
        {
            [...Array(3)].map((_, row) =>
                <SkeletonProductRow count={3} height={!isDesktopScreen ? 11 : undefined} key={row} width={isDesktopScreen ? 22 : undefined} />
            )
        }
    </>;
}

