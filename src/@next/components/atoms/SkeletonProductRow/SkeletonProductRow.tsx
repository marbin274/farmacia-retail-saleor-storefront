import React from "react";
import { Skeleton as SSkeleton } from "@temp/@next/components/atoms"
import * as S from "./styles";

interface IProps {
    count?: number
}

export const SkeletonProductRow: React.FC<IProps> = ({
    count = 4,
})=>{

    return (
        <S.SkeletonItems>
        {
            [...Array(count)].map((_, item) =>
                <SSkeleton
                    key={item}
                    width={15}
                />
            )
        }
    </S.SkeletonItems>
    );
}

