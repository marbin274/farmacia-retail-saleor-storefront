import { LocalStorageItems } from '@temp/@sdk/repository';
import React from 'react';
import { districtShowModalService } from '../services';
import { useLocalStorage } from './useLocalStorage';

export const useAddressGeocalizationInfo = (): [
  boolean,
  (value: boolean) => void
] => {
  const { storedValue, setValue } = useLocalStorage<boolean>(
    LocalStorageItems.SHOW_ADDRESS_GEOCALIZATION_INFO,
    true
  );

  React.useEffect(() => {
    districtShowModalService.on().subscribe((payload: boolean) => {
      setValue(payload);
    });
  }, []);

  return [storedValue, districtShowModalService.show];
};
