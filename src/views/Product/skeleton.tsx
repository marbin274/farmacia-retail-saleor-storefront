import { Skeleton as SSkeleton } from "@temp/@next/components/atoms";
import React from "react";
import * as S from "./styles";

export const Skeleton: React.FC = () => {

    return (<div className="container">
        <S.SkeletonProduct>
            <div>
                <SSkeleton
                />
            </div>
            <S.SkeletonDescription>
                <SSkeleton
                    height={2}
                />
                <SSkeleton
                    height={2}
                />
                <SSkeleton
                    height={2}
                />

                <SSkeleton
                    height={10}
                />
            </S.SkeletonDescription>
        </S.SkeletonProduct>
    </div>

    );
}
