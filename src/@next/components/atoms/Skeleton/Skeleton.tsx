import React from "react";
import * as S from "./styles";
import { ISkeletonProps } from "./types";

interface IProps extends ISkeletonProps {
    className?: string;
}

export const Skeleton: React.FC<IProps> = ({
    animation = "pulse",
    className,
    height,
    width,
}) => {

    return (<S.Wrapper
        animation={animation}
        className={className}
        height={height}
        width={width}
    />);
}

