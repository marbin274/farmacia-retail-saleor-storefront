import React from "react";
import { Skeleton as SSkeleton } from "@temp/@next/components/atoms"
import * as S from "./styles";

interface IProps {
    count?: number,
    height?: number,
    width?: number,
}

export const SkeletonProduct: React.FC<IProps> = ({
    height = 31.125,
    width = 15,
}) => {

    return (
        <S.SkeletonProduct height={height}>
            <SSkeleton
                width={width}
            />
        </S.SkeletonProduct>
    );
}

