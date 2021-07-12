import React from "react";
import { Skeleton as SSkeleton } from "@components/atoms";
import { useMediaScreen } from "@temp/@next/globalStyles";

export const Skeleton = () => {
    const { isMaxLargeScreen } = useMediaScreen();
    return (
        <>
            <div className="footer-nav__section">
                <SSkeleton height={2} width={10} />
                <SSkeleton height={1} width={10} />
                <SSkeleton height={1} width={10} />
                <SSkeleton height={1} width={10} />
                <SSkeleton height={1} width={10} />
                <SSkeleton height={isMaxLargeScreen ? 1 : 1.5625} width={10} />
            </div>
            <div className="footer-nav__section">
                <SSkeleton height={isMaxLargeScreen ? 2 : 1} width={10} />
                <SSkeleton height={isMaxLargeScreen ? 2 : 1.625} width={10} />
            </div>
        </>
    );
}
