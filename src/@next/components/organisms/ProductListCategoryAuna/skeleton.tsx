import React from "react";
import { SkeletonProductRow } from "@components/atoms";
import { useMediaQuery } from "react-responsive";
import { largeScreen } from "@temp/@next/globalStyles/constants";


export const Skeleton = () => {
    const isDesktopScreen = useMediaQuery({
        query: `(min-width: ${largeScreen}px)`,
      });
    return <>
        {
            [...Array(3)].map((_, row) =>
                <SkeletonProductRow count={3} height={!isDesktopScreen ? 11 : undefined} key={row} width={isDesktopScreen ? 22 : undefined} />
            )
        }
    </>;
}

