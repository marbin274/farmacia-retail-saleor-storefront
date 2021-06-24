import React from "react";
import { Skeleton as SSkeleton } from "@components/atoms";
import { useMediaQuery } from "react-responsive";
import { largeScreen } from "@temp/@next/globalStyles/constants";

export const Skeleton = () => {
    const isLargeScreen = useMediaQuery({
        query: `(max-width: ${largeScreen}px)`,
      });
    return (
        <>
            <div className="footer-nav__section">
                <SSkeleton height={isLargeScreen ? 2 : 2} width={10} />
                <SSkeleton height={isLargeScreen ? 1 : 1} width={10} />
                <SSkeleton height={isLargeScreen ? 1 : 1} width={10} />
                <SSkeleton height={isLargeScreen ? 1 : 1} width={10} />
                <SSkeleton height={isLargeScreen ? 1 : 1} width={10} />
                <SSkeleton height={isLargeScreen ? 1 : 1.5625} width={10} />
            </div>
            <div className="footer-nav__section">
                <SSkeleton height={isLargeScreen ? 2 : 1} width={10} />
                <SSkeleton height={isLargeScreen ? 2 : 1.625} width={10} />
            </div>
        </>
    );
}
