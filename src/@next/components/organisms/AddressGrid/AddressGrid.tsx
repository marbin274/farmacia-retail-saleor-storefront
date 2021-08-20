import React, { FC } from 'react';
import { AddNewTile } from '@components/atoms';
import { AddressTile, Alert } from '@components/molecules';
import { IProps } from './types';
import { CheckIcon, TrashIcon } from '@farmacia-retail/farmauna-components';

export const AddressGrid: FC<IProps> = ({
  addresses,
  onClickAdd,
  onClickEdit,
  onClickDelete,
  onClickSetDefault,
  showAddEditSuccess,
  showDeleteSuccess,
}) => {
  return (
    <>
      <div className="fa-flex md:fa-hidden fa-mb-4">
        <AddNewTile
          type="dirección"
          onClick={onClickAdd}
          className="fa-w-full"
        />
      </div>
      {showAddEditSuccess && (
        <Alert
          icon={<CheckIcon size={12} />}
          message="Tarjeta guardada con éxito"
          className="fa-mb-4 fa-flex md:fa-hidden"
        />
      )}
      {showDeleteSuccess && (
        <Alert
          icon={<TrashIcon size={12} />}
          message="La tarjeta ha sido eliminada"
          className="fa-mb-4 fa-flex md:fa-hidden"
          type="error"
        />
      )}
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
