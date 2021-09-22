import { WINDOW_EXISTS } from '@temp/@sdk/consts';
import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue?: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = WINDOW_EXISTS
        ? window.localStorage?.getItem(key)
        : undefined;
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window?.localStorage?.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return { storedValue, setValue };
}
