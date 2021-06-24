import React from "react";
import { Skeleton as SSkeleton } from "@temp/@next/components/atoms"
import * as S from "./styles";


export const SkeletonCarousel = ()=>{

    return (
        <S.SkeletonRow>
            <S.SkeletonTitle>
                <SSkeleton
                    height={3}
                />
            </S.SkeletonTitle>
            <S.SkeletonItems>
                {
                    [...Array(4)].map((_, item) =>
                        <SSkeleton
                            key={item}
                            width={15}
                        />
                    )
                }
            </S.SkeletonItems>
        </S.SkeletonRow>
    );
}

