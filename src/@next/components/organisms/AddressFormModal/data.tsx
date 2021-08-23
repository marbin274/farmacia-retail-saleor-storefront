import React from 'react';
import { HomeIcon } from '@farmacia-retail/farmauna-components';
import { ITileRadioOption } from '../../molecules';
import { Icon } from '../../atoms';

export const MY_HOME_ADDRESS_OPTION = 'Mi casa';
export const MY_WORK_ADDRESS_OPTION = 'Mi trabajo';
export const OTHERS_ADDRESS_OPTION = 'Otros';

export const getAddressTypeOptions = (): ITileRadioOption[] => {
  return [
    {
      icon: <HomeIcon />,
      label: MY_HOME_ADDRESS_OPTION,
      value: MY_HOME_ADDRESS_OPTION,
    },
    {
      icon: <Icon name="work" size={16} viewPort={24} />,
      label: MY_WORK_ADDRESS_OPTION,
      value: MY_WORK_ADDRESS_OPTION,
    },
    {
      icon: <Icon name="category2" size={16} viewPort={24} />,
      label: OTHERS_ADDRESS_OPTION,
      value: OTHERS_ADDRESS_OPTION,
      withInput: true,
    },
  ];
};
