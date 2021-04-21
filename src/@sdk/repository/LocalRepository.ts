import { Repository } from "./Repository";
import {
  ICheckoutModel,
  ILocalRepository,
  IPaymentModel,
  LocalStorageItems,
  IUseCart,
} from "./types";

export class LocalRepository extends Repository implements ILocalRepository {
  getCheckout(): ICheckoutModel | null {
    return this.retrieveObject(LocalStorageItems.CHECKOUT);
  }
  setCheckout(checkout: ICheckoutModel | null): void {
    this.saveObject(LocalStorageItems.CHECKOUT, checkout);
  }
  getFinallCheckout():  ICheckoutModel | null {
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
    return this.retrieveItem(LocalStorageItems.RESET_PASSWORD_EMAIL)
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
}
