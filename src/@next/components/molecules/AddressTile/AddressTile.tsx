import React from 'react';
import classNames from 'classnames';
import { Address } from '@components/atoms';
import {
  PencilIcon,
  StarFilledIcon,
  TrashIcon,
  Button,
} from '@farmacia-retail/farmauna-components';
import { IProps } from './types';

export const AddressTile: React.FC<IProps> = ({
  address,
  onClickDelete,
  onClickEdit,
  onClickSetDefault,
}) => {
  return (
    <div className="fa-bg-white fa-p-6 fa-rounded-3xl">
      <div className="fa-flex fa-items-center fa-justify-between">
        <div
          className="fa-flex fa-items-center fa-cursor-pointer"
          onClick={() => onClickSetDefault(address.id)}
          data-testid="default-address"
        >
          <div
            className={classNames('fa-mr-2 fa-p-2 fa-rounded fa-text-white', {
              'fa-bg-primary-medium': address.isDefaultShippingAddress,
              'fa-bg-neutral-medium': !address.isDefaultShippingAddress,
            })}
          >
            <StarFilledIcon size={12} />
          </div>
          <span
            className={classNames('fa-text-xs', {
              'fa-text-primary-medium': address.isDefaultShippingAddress,
              'fa-text-neutral-medium': !address.isDefaultShippingAddress,
            })}
          >
            Usar como dirección principal
          </span>
        </div>
        <div className="fa-flex fa-items-center">
          <Button
            data-testid="edit-button"
            icon={<PencilIcon />}
            size="small"
            onClick={() => onClickEdit(address)}
            iconOnly
            className="fa-mr-4"
          />
          <Button
            data-testid="delete-button"
            icon={<TrashIcon />}
            size="small"
            onClick={() => onClickDelete(address.id)}
            iconOnly
          />
        </div>
      </div>

      <div className="fa-h-px fa-bg-neutral-medium fa-mt-3 fa-mb-4" />

      <Address {...address} />
    </div>
  );
};
