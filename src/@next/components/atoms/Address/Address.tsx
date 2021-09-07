import React, { FC } from 'react';
import { HomeIcon } from '@farmacia-retail/farmauna-components';
import { Icon } from '..';
import { IAddressProps } from './types';
import {
  MY_HOME_ADDRESS_OPTION,
  MY_WORK_ADDRESS_OPTION,
} from '../../organisms/AddressFormModal/data';

export const Address: FC<IAddressProps> = ({ address, hasError }) => {
  const getIcon = () => {
    if (address.alias === MY_HOME_ADDRESS_OPTION) {
      return <HomeIcon size={14} className="fa-ml-px" />;
    }

    if (address.alias === MY_WORK_ADDRESS_OPTION) {
      return <Icon name="work" size={14} viewPort={24} />;
    }

    return <Icon name="category2" size={14} viewPort={24} />;
  };

  const getTitle = () => {
    if (address.alias) {
      return address.alias;
    }

    if (address.firstName) {
      return `${address.firstName} ${address.lastName}`;
    }

    return 'Mi dirección';
  };

  return (
    <div>
      <div className="fa-text-highlight-medium fa-flex fa-mb-2">
        <div className="fa-rounded-full fa-bg-highlight-lightest fa-w-6 fa-h-6 fa-flex fa-items-center fa-justify-center fa-mr-2">
          {getIcon()}
        </div>
        <p data-testid="address-title">{getTitle()}</p>
      </div>
      <p className="fa-text-sm fa-font-semibold fa-mb-1">{address.city}</p>
      <p
        data-testid="address-description"
        className={`fa-mb-1 ${hasError ? 'fa-text-error-medium' : ''}`}
      >
        {address.streetAddress1}
      </p>
      <p className="fa-text-sm fa-text-neutral-dark fa-mb-1">
        {address.streetAddress2}
      </p>
    </div>
  );
};
