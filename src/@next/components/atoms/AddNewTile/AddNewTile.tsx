import plusIcon from "images/auna/plus.svg";
import React from "react";
import ReactSVG from "react-svg";
import { Tile } from "../Tile";
import * as S from "./styles";
import { IProps } from "./types";


export const AddNewTile: React.FC<IProps> = ({ type, ...props }: IProps) => {
  return (
    <Tile tileType="addNew" {...props}>
      <S.Content>
        <p>
          <ReactSVG path={plusIcon} />
        </p>
        <S.Text>Agregar nueva {type}</S.Text>
      </S.Content>
    </Tile>
  );
};
