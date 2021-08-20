import React, { FC, useMemo } from 'react';
import classNames from 'classnames';
import { Address } from '@components/atoms';
import { Alert } from '@components/molecules';
import {
  PencilIcon,
  StarFilledIcon,
  TrashIcon,
  ErrorIcon,
  Button,
} from '@farmacia-retail/farmauna-components';
import { IProps } from './types';
import { useShopContext } from '@temp/components/ShopProvider/context';
import { isCoordinatesInsideBouds } from '@temp/core/utils';

export const AddressTile: FC<IProps> = ({
  address,
  onClickDelete,
  onClickEdit,
  onClickSetDefault,
}) => {
  const { availableDistricts } = useShopContext();

  const isInsideBounds = useMemo(() => {
    const district = availableDistricts.find(
      (x) => x.name.toLowerCase() === address.city.toLowerCase()
    );

    if (!district?.warehouse?.polygon) {
      return false;
    }

    const geoJson = JSON.parse(district.warehouse.polygon);

    const isInsideBounds = isCoordinatesInsideBouds(
      address.latitude,
      address.longitude,
      geoJson
    );

    return isInsideBounds;
  }, [availableDistricts, address]);

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
            onClick={() => onClickDelete(address)}
            iconOnly
          />
        </div>
      </div>

      <div className="fa-h-px fa-bg-neutral-medium fa-mt-3 fa-mb-4" />

      <Address address={address} hasError={!isInsideBounds} />

      {!isInsideBounds && (
        <Alert
          type="error"
          message="Por el momento no tenemos cobertura en esta zona"
          icon={<ErrorIcon />}
          className="fa-mt-2"
        />
      )}
    </div>
  );
};
