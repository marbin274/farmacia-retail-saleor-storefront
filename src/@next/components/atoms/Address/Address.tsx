import React, { FC } from 'react';
import { HomeIcon, GpsIcon } from '@farmacia-retail/farmauna-components';
import { Icon } from '..';
import { IAddressProps } from './types';

export const Address: FC<IAddressProps> = ({ address, hasError }) => {
  const getIcon = () => {
    if (address.alias === 'Mi casa') {
      return <HomeIcon size={14} className="fa-ml-px" />;
    }

    if (address.alias === 'Mi trabajo') {
      return <Icon name="work" size={14} viewPort={24} />;
    }

    return <GpsIcon size={14} />;
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
        <p>{getTitle()}</p>
      </div>
      <p className="fa-text-sm fa-font-semibold fa-mb-1">{address.city}</p>
      <p className={`fa-mb-1 ${hasError ? 'fa-text-error-medium' : ''}`}>
        {address.streetAddress1}
      </p>
      <p className="fa-text-sm fa-text-neutral-dark fa-mb-1">
        {address.streetAddress2}
      </p>
    </div>
  );
};
