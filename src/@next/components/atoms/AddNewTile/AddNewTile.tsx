import React from 'react';
import { PlusIcon } from '@farmacia-retail/farmauna-components';
import { Tile } from '../Tile';
import * as S from './styles';
import { IProps } from './types';

export const AddNewTile: React.FC<IProps> = ({ type, ...props }: IProps) => {
  return (
    <Tile tileType="addNew" {...props}>
      <S.Content>
        <span className="fa-bg-primary-medium fa-p-2.5 fa-text-white fa-rounded-full fa-mr-4 md:fa-mr-0 md:fa-mb-4">
          <PlusIcon />
        </span>
        <S.Text>Agregar nueva {type}</S.Text>
      </S.Content>
    </Tile>
  );
};
