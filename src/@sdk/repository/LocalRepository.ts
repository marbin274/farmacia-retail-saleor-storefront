import { Repository } from './Repository';
import {
  ICheckoutModel,
  ILocalRepository,
  IPaymentModel,
  LocalStorageItems,
  IUseCart,
  IDistrictSelected,
} from './types';

export class LocalRepository extends Repository implements ILocalRepository {
  getCheckout(): ICheckoutModel | null {
    return this.retrieveObject(LocalStorageItems.CHECKOUT);
  }
  setCheckout(checkout: ICheckoutModel | null): void {
    this.saveObject(LocalStorageItems.CHECKOUT, checkout);
  }
  getDistrict(): IDistrictSelected | null {
    return this.retrieveObject(LocalStorageItems.DISTRICT_SELECTED);
  }
  setDistrict(district: IDistrictSelected): void {
    this.saveObject(LocalStorageItems.DISTRICT_SELECTED, district);
  }
  getDistrictChanged(): string | null {
    return this.retrieveItem(LocalStorageItems.DISTRICT_CHANGED);
  }
  setDistrictChanged(district: string): void {
    this.saveItem(LocalStorageItems.DISTRICT_CHANGED, district);
  }
  getFinallCheckout(): ICheckoutModel | null {
    return this.retrieveObject(LocalStorageItems.FINAL_CHECKOUT);
  }
  setFinallCheckout(checkout: ICheckoutModel | null): void {
    this.saveObject(LocalStorageItems.FINAL_CHECKOUT, checkout);
  }
  getFinallUseCart(): IUseCart | null {
    return this.retrieveObject(LocalStorageItems.FINAL_USECART);
  }
  setFinallUseCart(checkout: IUseCart | null): void {
    this.saveObject(LocalStorageItems.FINAL_USECART, checkout);
  }
  getResetPasswordEmail(): string | null {
    return this.retrieveItem(LocalStorageItems.RESET_PASSWORD_EMAIL);
  }
  setResetPasswordEmail(email: string): void {
    this.saveItem(LocalStorageItems.RESET_PASSWORD_EMAIL, email);
  }
  getPayment(): IPaymentModel | null {
    return this.retrieveObject(LocalStorageItems.PAYMENT);
  }
  setPayment(payment: IPaymentModel | null): void {
    this.saveObject(LocalStorageItems.PAYMENT, payment);
  }
  getJobs(): {
    [key: string]: { [key: string]: boolean };
  } | null {
    return this.retrieveObject(LocalStorageItems.JOB_QUEUE_CHECKOUT);
  }
  setJobs(jobs: { [key: string]: { [key: string]: boolean } } | null): void {
    return this.saveObject(LocalStorageItems.JOB_QUEUE_CHECKOUT, jobs);
  }
  getPurchase(): string | null {
    return (
      this.retrieveItem(LocalStorageItems.PURCHASE_NUMBER)?.toString() || null
    );
  }
  setPurchase(purchase: string | null): void {
    this.saveItem(LocalStorageItems.PURCHASE_NUMBER, purchase);
  }
  getToken(): string | null {
    return this.retrieveItem(LocalStorageItems.TOKEN)?.toString() || null;
  }
  setToken(token: string | null): void {
    this.saveItem(LocalStorageItems.TOKEN, token);
  }
  getUserId(): string | null {
    return (
      this.retrieveItem(LocalStorageItems.OPTIMIZELY_USER_ID_KEY)?.toString() ||
      null
    );
  }
  setUserId(userId: string | null): void {
    this.saveItem(LocalStorageItems.OPTIMIZELY_USER_ID_KEY, userId);
  }
  getGaUserId(): string | null {
    return (
      this.retrieveItem(LocalStorageItems.GA_USER_ID_KEY)?.toString() || null
    );
  }
  setGaUserId(userId: string | null): void {
    this.saveItem(LocalStorageItems.GA_USER_ID_KEY, userId);
  }
  clearStorage(): void {
    this.clearRepositoryStorage();
  }
}
