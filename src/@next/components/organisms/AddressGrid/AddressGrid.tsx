import React from 'react';

import { AddNewTile } from '@components/atoms';
import { AddressTile } from '@components/molecules';

import { IProps } from './types';

export const AddressGrid: React.FC<IProps> = ({
  addresses,
  onClickAdd,
  onClickEdit,
  onClickDelete,
  onClickSetDefault,
}: IProps) => {
  return (
    <>
      <div className="fa-flex md:fa-hidden fa-mb-4">
        <AddNewTile
          type="dirección"
          onClick={onClickAdd}
          className="fa-w-full"
        />
      </div>
      <div className="fa-grid fa-grid-cols-1 md:fa-grid-cols-2 fa-gap-4">
        <div className="fa-hidden md:fa-flex">
          <AddNewTile
            type="dirección"
            onClick={onClickAdd}
            className="fa-w-full"
          />
        </div>
        {addresses.map((address) => (
          <AddressTile
            key={address.id}
            address={address}
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
            onClickSetDefault={onClickSetDefault}
          />
        ))}
      </div>
    </>
  );
};
