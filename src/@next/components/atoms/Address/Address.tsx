import React from 'react';
import { IAddress } from '@types';
import { HomeIcon, GpsIcon } from '@farmacia-retail/farmauna-components';
import { Icon } from '..';

export const Address: React.FC<IAddress> = ({
  alias,
  streetAddress1,
  streetAddress2,
  city,
}: IAddress) => {
  const getIcon = () => {
    if (alias === 'Mi casa') {
      return <HomeIcon size={14} className="fa-ml-px" />;
    }

    if (alias === 'Mi trabajo') {
      return <Icon name="work" size={14} viewPort={24} />;
    }

    return <GpsIcon size={14} />;
  };

  return (
    <div>
      <div className="fa-text-highlight-medium fa-flex fa-mb-2">
        <div className="fa-rounded-full fa-bg-highlight-lightest fa-w-6 fa-h-6 fa-flex fa-items-center fa-justify-center fa-mr-2">
          {getIcon()}
        </div>
        <p>{alias || 'Mi dirección'}</p>
      </div>
      <p className="fa-text-sm fa-font-semibold fa-mb-1">{city}</p>
      <p className="fa-mb-1">{streetAddress1}</p>
      <p className="fa-text-sm fa-text-neutral-dark fa-mb-1">
        {streetAddress2}
      </p>
    </div>
  );
};
