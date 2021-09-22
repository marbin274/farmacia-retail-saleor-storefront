import { LOCAL_STORAGE_EXISTS } from '../consts';
import { NamedObservable } from '../helpers';
import { LocalStorageItems } from './types';

export class Repository extends NamedObservable<LocalStorageItems> {
  protected saveItem(name: LocalStorageItems, item: string | null): void {
    if (!LOCAL_STORAGE_EXISTS) return;
    if (item) {
      localStorage?.setItem(name, item);
    } else {
      localStorage?.removeItem(name);
    }
    this.notifyChange(name, item);
  }
  protected retrieveItem(name: LocalStorageItems): string | null {
    if (!LOCAL_STORAGE_EXISTS) return null;
    return localStorage?.getItem(name);
  }
  protected saveObject<T extends object>(
    name: LocalStorageItems,
    object: T | null
  ): void {
    if (!LOCAL_STORAGE_EXISTS) return;
    if (object) {
      localStorage?.setItem(name, JSON.stringify(object));
    } else {
      localStorage?.removeItem(name);
    }
    this.notifyChange(name, object);
  }
  protected retrieveObject<T extends object>(
    name: LocalStorageItems
  ): T | null {
    if (!LOCAL_STORAGE_EXISTS) return null;
    const item = localStorage?.getItem(name);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  }
  protected clearRepositoryStorage() {
    if (!LOCAL_STORAGE_EXISTS) return;
    localStorage.clear();
  }
}
