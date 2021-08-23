// Remove specific items from local storage when cart is edited in the checkout process.
import { LocalRepository } from '@temp/@sdk/repository';

export const removePaymentItems = (): void => {
  const localRepository = new LocalRepository();
  localRepository.setPurchase(null);
  localRepository.setPayment(null);
};
