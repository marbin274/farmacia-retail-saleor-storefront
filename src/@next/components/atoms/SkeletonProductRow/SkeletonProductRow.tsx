import React from "react";
import { Skeleton as SSkeleton } from "@temp/@next/components/atoms"
import * as S from "./styles";

interface IProps {
    count?: number,
    height?: number,
    width?: number,
}

export const SkeletonProductRow: React.FC<IProps> = ({
    count = 4,
    height = 31.125,
    width= 15,
})=>{

    return (
        <S.SkeletonItems height={height}>
        {
            [...Array(count)].map((_, item) =>
                <SSkeleton
                    key={item}
                    width={width}
                />
            )
        }
    </S.SkeletonItems>
    );
}

