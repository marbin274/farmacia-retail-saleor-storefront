import React from "react";
import { Skeleton as SSkeleton, SkeletonProductRow } from "@temp/@next/components/atoms"
import * as S from "./styles";


export const SkeletonCarousel = ()=>{

    return (
        <S.SkeletonRow>
            <S.SkeletonTitle>
                <SSkeleton
                    height={3}
                />
            </S.SkeletonTitle>
            <SkeletonProductRow />
        </S.SkeletonRow>
    );
}

