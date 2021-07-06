import React from "react";
import { Skeleton as SSkeleton} from "@components/atoms";

export const SkeletonCartFooter = () => {

    return (
        <div className="cart__footer caseB">
            <SSkeleton height={1} />
            <SSkeleton height={1} />
            <SSkeleton height={1} />
            <SSkeleton height={3} />
        </div>
    );
}
