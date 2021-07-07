import React from "react";
import { SkeletonProductRow } from "@components/atoms";


export const Skeleton = () => {

    return <>
        {
            [...Array(3)].map((_, row) =>
                <SkeletonProductRow key={row} />
            )
        }
    </>;
}

