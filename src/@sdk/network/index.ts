import { getAuthToken } from '@sdk/auth';
import { Checkout } from '@sdk/fragments/gqlTypes/Checkout';
import { OrderDetail } from '@sdk/fragments/gqlTypes/OrderDetail';
import { Payment } from '@sdk/fragments/gqlTypes/Payment';
import { CountryCode } from '@sdk/gqlTypes/globalTypes';
import * as CheckoutMutations from '@sdk/mutations/checkout';
import {
  AddCheckoutPromoCode,
  AddCheckoutPromoCodeVariables,
} from '@sdk/mutations/gqlTypes/AddCheckoutPromoCode';
import {
  CompleteCheckout,
  CompleteCheckoutVariables,
} from '@sdk/mutations/gqlTypes/CompleteCheckout';
import {
  CreateCheckout,
  CreateCheckoutVariables,
} from '@sdk/mutations/gqlTypes/CreateCheckout';
import {
  CreateCheckoutPayment,
  CreateCheckoutPaymentVariables,
} from '@sdk/mutations/gqlTypes/CreateCheckoutPayment';
import {
  RemoveCheckoutPromoCode,
  RemoveCheckoutPromoCodeVariables,
} from '@sdk/mutations/gqlTypes/RemoveCheckoutPromoCode';
import {
  UpdateCheckout,
  UpdateCheckoutVariables,
} from '@sdk/mutations/gqlTypes/UpdateCheckout';
import {
  UpdateCheckoutBillingAddress,
  UpdateCheckoutBillingAddressVariables,
} from '@sdk/mutations/gqlTypes/UpdateCheckoutBillingAddress';
import {
  UpdateCheckoutBillingAddressWithEmail,
  UpdateCheckoutBillingAddressWithEmailVariables,
} from '@sdk/mutations/gqlTypes/UpdateCheckoutBillingAddressWithEmail';
import {
  UpdateCheckoutLine,
  UpdateCheckoutLineVariables,
} from '@sdk/mutations/gqlTypes/UpdateCheckoutLine';
import {
  UpdateCheckoutShippingAddress,
  UpdateCheckoutShippingAddressVariables,
} from '@sdk/mutations/gqlTypes/UpdateCheckoutShippingAddress';
import { UpdateCheckoutShippingMethod } from '@sdk/mutations/gqlTypes/UpdateCheckoutShippingMethod';
import * as CheckoutQueries from '@sdk/queries/checkout';
import * as ProductQueries from '@sdk/queries/products';
import { CheckoutDetails } from '@sdk/queries/gqlTypes/CheckoutDetails';
import {
  CheckoutProductVariants,
  CheckoutProductVariantsVariables,
  CheckoutProductVariants_productVariants,
} from '@sdk/queries/gqlTypes/CheckoutProductVariants';
import {
  GetShopPaymentGateways,
  GetShopPaymentGateways_shop_availablePaymentGateways,
} from '@sdk/queries/gqlTypes/GetShopPaymentGateways';
import { UserCheckoutDetails } from '@sdk/queries/gqlTypes/UserCheckoutDetails';
import * as ShopQueries from '@sdk/queries/shop';
import {
  ICheckoutAddress,
  ICheckoutModel,
  ICheckoutModelLine,
  ICreateCheckout,
  IOrderModel,
  IPaymentModel,
  IShippingMethodUpdate,
  IUpdateCheckout,
} from '@sdk/repository';
import { filterNotEmptyArrayItems } from '@sdk/utils';
import { ApolloClient } from '@apollo/client';
import { IPrivacyPolicy } from '../api/Checkout/types';
import { UpdateCheckoutShippingMethodWithScheduleDateVariables } from '../mutations/gqlTypes/UpdateCheckoutShippingMethodWithScheduleDate';
import { launchPurchaseEvent, ecommerceProductsMapper } from '@sdk/gaConfig';
import { IConstructCheckoutParams, INetworkManager } from './types';
import {
  VariantsProductsAvailable,
  VariantsProductsAvailableVariables,
  VariantsProductsAvailable_productVariants,
} from '../queries/gqlTypes/VariantsProductsAvailable';

export class NetworkManager implements INetworkManager {
  private client: ApolloClient<any>;

  constructor(client: ApolloClient<any>) {
    this.client = client;
  }

  getCheckout = async (checkoutToken: string | null, districtId?: string) => {
    let checkout: Checkout | null;
    try {
      checkout = await new Promise((resolve, reject) => {
        if (this.isLoggedIn()) {
          const observable = this.client.watchQuery<UserCheckoutDetails, any>({
            fetchPolicy: 'network-only',
            query: CheckoutQueries.userCheckoutDetails,
            variables: {
              districtId,
            },
          });
          observable.subscribe(
            (result) => {
              const { data, errors } = result;
              if (errors?.length) {
                reject(errors);
              } else {
                resolve(data.me?.checkout ? data.me.checkout : null);
              }
            },
            (error) => {
              reject(error);
            }
          );
        } else if (checkoutToken) {
          const observable = this.client.watchQuery<CheckoutDetails, any>({
            fetchPolicy: 'network-only',
            query: CheckoutQueries.checkoutDetails,
            variables: {
              districtId,
              token: checkoutToken,
            },
          });
          observable.subscribe(
            (result) => {
              const { data, errors } = result;
              if (errors?.length) {
                reject(errors);
              } else {
                resolve(data.checkout);
              }
            },
            (error) => {
              reject(error);
            }
          );
        } else {
          resolve(null);
        }
      });

      if (checkout) {
        return {
          data: this.constructCheckoutModel({ checkout }),
        };
      }
    } catch (error) {
      return {
        error: error as any,
      };
    }
    return {};
  };

  getRefreshedCheckoutLines = async (
    checkoutlines: ICheckoutModelLine[] | null,
    districtId: string
  ) => {
    const idsOfMissingVariants = checkoutlines
      ?.filter((line) => !line.variant || !line.totalPrice)
      .map((line) => line.variant.id);
    const linesWithProperVariant =
      checkoutlines?.filter((line) => line.variant && line.totalPrice) || [];

    let variants: CheckoutProductVariants_productVariants | null | undefined;
    if (idsOfMissingVariants && idsOfMissingVariants.length) {
      try {
        const observable = this.client.watchQuery<
          CheckoutProductVariants,
          CheckoutProductVariantsVariables
        >({
          fetchPolicy: 'network-only',
          query: CheckoutQueries.checkoutProductVariants,
          variables: {
            ids: idsOfMissingVariants,
            districtId,
          },
        });

        variants = await new Promise((resolve, reject) => {
          observable.subscribe(
            (result) => {
              const { data, errors } = result;
              if (errors?.length) {
                reject(errors);
              } else {
                resolve(data.productVariants);
              }
            },
            (error) => {
              reject(error);
            }
          );
        });
      } catch (error) {
        return {
          error: error as any,
        };
      }
    }

    const linesWithMissingVariantUpdated: ICheckoutModelLine[] = variants
      ? variants.edges.map((edge) => {
          const existingLine = checkoutlines?.find(
            (line) => line.variant.id === edge.node.id
          );
          const variantPricing = edge.node.pricing?.price;
          const totalPrice = variantPricing
            ? {
                gross: {
                  ...variantPricing.gross,
                  amount:
                    variantPricing.gross.amount * (existingLine?.quantity || 0),
                },
                net: {
                  ...variantPricing.net,
                  amount:
                    variantPricing.net.amount * (existingLine?.quantity || 0),
                },
              }
            : null;
          const variant = {
            attributes: edge.node.attributes,
            id: edge.node.id,
            isAvailable: edge.node.isAvailable,
            name: edge.node.name,
            pricing: edge.node.pricing,
            product: {
              ...edge.node.product,
              category: existingLine?.variant.product?.category || null,
            },
            quantityAvailable: edge.node.quantityAvailable,
            sku: edge.node.sku,
          };

          return {
            attributes: edge.node.product.attributes,
            id: edge.node.product.id || '',
            name: edge.node.product.name,
            quantity: existingLine?.quantity || 0,
            totalPrice,
            variant,
          };
        })
      : [];
    const linesWithProperVariantUpdated: ICheckoutModelLine[] =
      linesWithProperVariant.map((line): ICheckoutModelLine => {
        const variantPricing = line.variant.pricing?.price;
        const totalPrice = variantPricing
          ? {
              gross: {
                ...variantPricing.gross,
                amount: variantPricing.gross.amount * line.quantity,
              },
              net: {
                ...variantPricing.net,
                amount: variantPricing.net.amount * line.quantity,
              },
            }
          : null;

        return {
          id: line.id,
          name: line.name,
          quantity: line.quantity,
          totalPrice,
          variant: line.variant,
        };
      });

    return {
      data: [
        ...linesWithMissingVariantUpdated,
        ...linesWithProperVariantUpdated,
      ],
    };
  };

  getCartLines = async (
    checkoutlines: ICheckoutModelLine[] | null,
    districtId: string
  ) => {
    const ids = checkoutlines ? checkoutlines.map((it) => it.variant.id) : [];
    let variants: VariantsProductsAvailable_productVariants | null | undefined;
    if (ids.length) {
      try {
        const observable = this.client.watchQuery<
          VariantsProductsAvailable,
          VariantsProductsAvailableVariables
        >({
          fetchPolicy: 'network-only',
          query: ProductQueries.variantsProductsAvailable,
          variables: {
            ids,
            districtId,
          },
        });

        variants = await new Promise((resolve, reject) => {
          observable.subscribe(
            (result) => {
              const { data, errors } = result;
              if (errors?.length) {
                reject(errors);
              } else {
                resolve(data.productVariants);
              }
            },
            (error) => {
              reject(error);
            }
          );
        });
      } catch (error) {
        return {
          error: error as any,
        };
      }
    }

    return {
      data: variants,
    };
  };

  getPaymentGateways = async () => {
    let paymentGateways:
      | GetShopPaymentGateways_shop_availablePaymentGateways[]
      | null;
    try {
      paymentGateways = await new Promise((resolve, reject) => {
        const observable = this.client.watchQuery<GetShopPaymentGateways, any>({
          fetchPolicy: 'network-only',
          query: ShopQueries.getShopPaymentGateways,
        });
        observable.subscribe(
          (result) => {
            const { data, errors } = result;
            if (errors?.length) {
              reject(errors);
            } else {
              resolve(data.shop.availablePaymentGateways);
            }
          },
          (error) => {
            reject(error);
          }
        );
      });

      if (paymentGateways) {
        return {
          data: paymentGateways,
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
    return {};
  };

  createCheckout = async ({
    districtId,
    documentNumber,
    email,
    lines,
    privacyPolicy,
    shippingAddress,
    shippingMethodId,
    scheduleDate,
    slotId,
  }: ICreateCheckout) => {
    try {
      const shippingAddressModel = shippingAddress && {
        city: shippingAddress.city,
        companyName: shippingAddress.companyName,
        country:
          CountryCode[
            shippingAddress?.country?.code as keyof typeof CountryCode
          ],
        countryArea: shippingAddress.countryArea,
        firstName: shippingAddress.firstName,
        lastName: shippingAddress.lastName,
        latitude: shippingAddress.latitude,
        longitude: shippingAddress.longitude,
        phone: shippingAddress.phone,
        postalCode: shippingAddress.postalCode,
        streetAddress1: shippingAddress.streetAddress1,
        streetAddress2: shippingAddress.streetAddress2,
      };

      const variables: CreateCheckoutVariables = {
        checkoutInput: {
          billingAddress: shippingAddressModel,
          documentNumber,
          email,
          lines,
          privacyPolicy,
          shippingAddress: shippingAddressModel,
          shippingMethodId,
          scheduleDate: scheduleDate?.scheduleTimeId ? scheduleDate : null,
          slotId,
        },
        districtId,
      };

      const { data, errors } = await this.client.mutate<
        CreateCheckout,
        CreateCheckoutVariables
      >({
        mutation: CheckoutMutations.createCheckoutMutation,
        variables,
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      } else if (data?.checkoutCreate?.checkoutErrors.length) {
        return {
          checkoutErrors: data?.checkoutCreate?.checkoutErrors,
        };
      } else if (data?.checkoutCreate?.checkoutErrors.length) {
        return {
          error: data?.checkoutCreate?.checkoutErrors,
        };
      } else if (data?.checkoutCreate?.checkout) {
        return {
          data: this.constructCheckoutModel({
            checkout: data.checkoutCreate.checkout,
          }),
        };
      }
    } catch (error) {
      return {
        error: error as any,
      };
    }
    return {};
  };

  updateCheckout = async ({
    districtId,
    documentNumber,
    email,
    id,
    lines,
    privacyPolicy,
    shippingAddress,
    shippingMethodId,
    scheduleDate,
    slotId,
  }: IUpdateCheckout) => {
    try {
      const shippingAddressModel = shippingAddress && {
        city: shippingAddress.city,
        companyName: shippingAddress.companyName,
        country:
          CountryCode[
            shippingAddress?.country?.code as keyof typeof CountryCode
          ],
        countryArea: shippingAddress.countryArea,
        firstName: shippingAddress.firstName,
        lastName: shippingAddress.lastName,
        latitude: shippingAddress.latitude,
        longitude: shippingAddress.longitude,
        phone: shippingAddress.phone,
        postalCode: shippingAddress.postalCode,
        streetAddress1: shippingAddress.streetAddress1,
        streetAddress2: shippingAddress.streetAddress2,
      };

      const variables: UpdateCheckoutVariables = {
        checkoutInput: {
          billingAddress: shippingAddressModel,
          documentNumber,
          email,
          lines,
          privacyPolicy,
          shippingAddress: shippingAddressModel,
          shippingMethodId,
          scheduleDate: scheduleDate?.scheduleTimeId ? scheduleDate : null,
          slotId,
        },
        id,
        districtId,
      };

      const { data, errors } = await this.client.mutate<
        UpdateCheckout,
        UpdateCheckoutVariables
      >({
        mutation: CheckoutMutations.updateCheckoutMutation,
        variables,
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      } else if (data?.checkoutUpdate?.checkoutErrors.length) {
        return {
          checkoutErrors: data?.checkoutUpdate?.checkoutErrors,
        };
      } else if (data?.checkoutUpdate?.checkoutErrors.length) {
        return {
          error: data?.checkoutUpdate?.checkoutErrors,
        };
      } else if (data?.checkoutUpdate?.checkout) {
        return {
          data: this.constructCheckoutModel({
            checkout: data.checkoutUpdate.checkout,
          }),
        };
      }
    } catch (error) {
      return {
        error: error as any,
      };
    }
    return {};
  };

  setCartItem = async (checkout: ICheckoutModel, districtId?: string) => {
    const checkoutId = checkout.id;
    const lines = checkout.lines;

    if (checkoutId && lines) {
      const alteredLines = lines.map((line) => ({
        quantity: line.quantity,
        variantId: line.variant.id,
      }));

      try {
        const { data, errors } = await this.client.mutate<
          UpdateCheckoutLine,
          UpdateCheckoutLineVariables
        >({
          mutation: CheckoutMutations.updateCheckoutLineMutation,
          variables: {
            checkoutId,
            lines: alteredLines,
            districtId,
          },
        });

        if (errors?.length) {
          return {
            error: errors,
          };
        } else if (data?.checkoutLinesUpdate?.errors.length) {
          return {
            error: data?.checkoutLinesUpdate?.errors,
          };
        } else if (data?.checkoutLinesUpdate?.checkout) {
          return {
            data: this.constructCheckoutModel({
              checkout: data.checkoutLinesUpdate.checkout,
            }),
          };
        }
      } catch (error) {
        return {
          error: error as any,
        };
      }
    }
    return {};
  };

  setShippingAddress = async (
    shippingAddress: ICheckoutAddress,
    email: string,
    checkoutId: string,
    documentNumber?: string,
    privacyPolicy?: IPrivacyPolicy,
    districtId?: string
  ) => {
    try {
      const variables = {
        checkoutId,
        districtId,
        documentNumber: documentNumber || '',
        email,
        privacyPolicy: privacyPolicy || {},
        shippingAddress: {
          city: shippingAddress.city,
          companyName: shippingAddress.companyName,
          country:
            CountryCode[
              shippingAddress?.country?.code as keyof typeof CountryCode
            ],
          countryArea: shippingAddress.countryArea,
          firstName: shippingAddress.firstName,
          lastName: shippingAddress.lastName,
          latitude: shippingAddress.latitude,
          longitude: shippingAddress.longitude,
          phone: shippingAddress.phone,
          postalCode: shippingAddress.postalCode,
          streetAddress1: shippingAddress.streetAddress1,
          streetAddress2: shippingAddress.streetAddress2,
        },
      };
      const { data, errors } = await this.client.mutate<
        UpdateCheckoutShippingAddress,
        UpdateCheckoutShippingAddressVariables
      >({
        mutation: CheckoutMutations.updateCheckoutShippingAddressMutation,
        variables,
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      } else if (data?.checkoutEmailUpdate?.errors.length) {
        return {
          error: data?.checkoutEmailUpdate?.errors,
        };
      } else if (data?.checkoutShippingAddressUpdate?.checkoutErrors.length) {
        return {
          checkoutErrors: data?.checkoutShippingAddressUpdate?.checkoutErrors,
        };
      } else if (data?.checkoutShippingAddressUpdate?.errors.length) {
        return {
          error: data?.checkoutShippingAddressUpdate?.errors,
        };
      } else if (data?.checkoutShippingAddressUpdate?.checkout) {
        if (data.checkoutEmailUpdate?.checkout) {
          data.checkoutShippingAddressUpdate.checkout.email =
            data.checkoutEmailUpdate?.checkout.email;
          data.checkoutShippingAddressUpdate.checkout.documentNumber = data
            .checkoutEmailUpdate?.checkout.documentNumber
            ? data.checkoutEmailUpdate?.checkout.documentNumber
            : data.checkoutShippingAddressUpdate.checkout.documentNumber;
          data.checkoutShippingAddressUpdate.checkout.termsAndConditions = data
            .checkoutEmailUpdate?.checkout?.termsAndConditions
            ? data.checkoutEmailUpdate?.checkout?.termsAndConditions
            : data.checkoutShippingAddressUpdate.checkout.termsAndConditions;
          data.checkoutShippingAddressUpdate.checkout.dataTreatmentPolicy = data
            .checkoutEmailUpdate?.checkout?.dataTreatmentPolicy
            ? data.checkoutEmailUpdate?.checkout?.dataTreatmentPolicy
            : data.checkoutShippingAddressUpdate.checkout.dataTreatmentPolicy;
        }
        return {
          data: this.constructCheckoutModel({
            checkout: data.checkoutShippingAddressUpdate.checkout,
          }),
        };
      } else {
        return {};
      }
    } catch (error) {
      return {
        error: error as any,
      };
    }
  };

  setBillingAddress = async (
    billingAddress: ICheckoutAddress,
    checkoutId: string,
    districtId?: string
  ) => {
    try {
      const variables = {
        billingAddress: {
          city: billingAddress.city,
          companyName: billingAddress.companyName,
          country:
            CountryCode[
              billingAddress?.country?.code as keyof typeof CountryCode
            ],
          countryArea: billingAddress.countryArea,
          firstName: billingAddress.firstName,
          lastName: billingAddress.lastName,
          latitude: billingAddress.latitude,
          longitude: billingAddress.longitude,
          phone: billingAddress.phone,
          postalCode: billingAddress.postalCode,
          streetAddress1: billingAddress.streetAddress1,
          streetAddress2: billingAddress.streetAddress2,
        },
        checkoutId,
        districtId,
      };
      const { data, errors } = await this.client.mutate<
        UpdateCheckoutBillingAddress,
        UpdateCheckoutBillingAddressVariables
      >({
        mutation: CheckoutMutations.updateCheckoutBillingAddressMutation,
        variables,
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      } else if (data?.checkoutBillingAddressUpdate?.errors.length) {
        return {
          error: data?.checkoutBillingAddressUpdate?.errors,
        };
      } else if (data?.checkoutBillingAddressUpdate?.checkout) {
        return {
          data: this.constructCheckoutModel({
            checkout: data.checkoutBillingAddressUpdate.checkout,
          }),
        };
      } else {
        return {};
      }
    } catch (error) {
      return {
        error: error as any,
      };
    }
  };

  setBillingAddressWithEmail = async (
    billingAddress: ICheckoutAddress,
    email: string,
    checkoutId: string,
    districtId?: string
  ) => {
    try {
      const variables = {
        billingAddress: {
          city: billingAddress.city,
          companyName: billingAddress.companyName,
          country:
            CountryCode[
              billingAddress?.country?.code as keyof typeof CountryCode
            ],
          countryArea: billingAddress.countryArea,
          firstName: billingAddress.firstName,
          lastName: billingAddress.lastName,
          latitude: billingAddress.latitude,
          longitude: billingAddress.longitude,
          phone: billingAddress.phone,
          postalCode: billingAddress.postalCode,
          streetAddress1: billingAddress.streetAddress1,
          streetAddress2: billingAddress.streetAddress2,
        },
        checkoutId,
        districtId,
        email,
      };
      const { data, errors } = await this.client.mutate<
        UpdateCheckoutBillingAddressWithEmail,
        UpdateCheckoutBillingAddressWithEmailVariables
      >({
        mutation:
          CheckoutMutations.updateCheckoutBillingAddressWithEmailMutation,
        variables,
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      } else if (data?.checkoutEmailUpdate?.errors.length) {
        return {
          error: data?.checkoutEmailUpdate?.errors,
        };
      } else if (data?.checkoutBillingAddressUpdate?.errors.length) {
        return {
          error: data?.checkoutBillingAddressUpdate?.errors,
        };
      } else if (data?.checkoutBillingAddressUpdate?.checkout) {
        return {
          data: this.constructCheckoutModel({
            checkout: data.checkoutBillingAddressUpdate.checkout,
          }),
        };
      } else {
        return {};
      }
    } catch (error) {
      return {
        error: error as any,
      };
    }
  };

  setShippingMethod = async (
    shippingMethodUpdate: IShippingMethodUpdate,
    checkoutId: string,
    districtId?: string
  ) => {
    try {
      const mutation = shippingMethodUpdate.scheduleDate
        ? CheckoutMutations.updateCheckoutShippingMethodMutationWithScheduleDate
        : CheckoutMutations.updateCheckoutShippingMethodMutation;
      const { data, errors } = await this.client.mutate<
        UpdateCheckoutShippingMethod,
        UpdateCheckoutShippingMethodWithScheduleDateVariables
      >({
        mutation,
        variables: {
          checkoutId,
          date: shippingMethodUpdate.scheduleDate?.date,
          districtId,
          scheduleTimeId:
            shippingMethodUpdate.scheduleDate?.scheduleTimeId || '',
          shippingMethodId: shippingMethodUpdate.shippingMethodId,
          slotId: shippingMethodUpdate.slotId,
        },
      });
      if (errors?.length) {
        return {
          error: errors,
        };
      } else if (data?.checkoutShippingMethodUpdate?.errors.length) {
        return {
          error: data?.checkoutShippingMethodUpdate?.errors,
        };
      } else if (data?.checkoutShippingMethodUpdate?.checkout) {
        return {
          data: this.constructCheckoutModel({
            checkout: data.checkoutShippingMethodUpdate.checkout,
          }),
        };
      } else {
        return {};
      }
    } catch (error) {
      return {
        error: error as any,
      };
    }
  };

  addPromoCode = async (
    promoCode: string,
    checkoutId: string,
    districtId?: string
  ) => {
    try {
      const { data, errors } = await this.client.mutate<
        AddCheckoutPromoCode,
        AddCheckoutPromoCodeVariables
      >({
        mutation: CheckoutMutations.addCheckoutPromoCode,
        variables: { checkoutId, districtId, promoCode },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      } else if (data?.checkoutAddPromoCode?.errors.length) {
        return {
          error: data?.checkoutAddPromoCode?.errors,
        };
      } else if (data?.checkoutAddPromoCode?.checkout) {
        return {
          data: this.constructCheckoutModel({
            checkout: {
              ...data.checkoutAddPromoCode.checkout,
              availableShippingMethods: [],
            },
            message: data.checkoutAddPromoCode.message,
          }),
        };
      } else {
        return {};
      }
    } catch (error) {
      return {
        error: error as any,
      };
    }
  };

  removePromoCode = async (
    promoCode: string,
    checkoutId: string,
    districtId?: string
  ) => {
    try {
      const { data, errors } = await this.client.mutate<
        RemoveCheckoutPromoCode,
        RemoveCheckoutPromoCodeVariables
      >({
        mutation: CheckoutMutations.removeCheckoutPromoCode,
        variables: { checkoutId, districtId, promoCode },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      } else if (data?.checkoutRemovePromoCode?.errors.length) {
        return {
          error: data?.checkoutRemovePromoCode?.errors,
        };
      } else if (data?.checkoutRemovePromoCode?.checkout) {
        return {
          data: this.constructCheckoutModel({
            checkout: data.checkoutRemovePromoCode.checkout,
          }),
        };
      } else {
        return {};
      }
    } catch (error) {
      return {
        error: error as any,
      };
    }
  };

  createPayment = async (
    amount: number,
    checkoutId: string,
    paymentGateway: string,
    paymentToken: string,
    billingAddress: ICheckoutAddress,
    districtId?: string,
    withToken?: boolean
  ) => {
    try {
      const variables = {
        checkoutId,
        paymentInput: {
          amount,
          billingAddress: {
            city: billingAddress.city,
            companyName: billingAddress.companyName,
            country:
              CountryCode[
                billingAddress?.country?.code as keyof typeof CountryCode
              ],
            countryArea: billingAddress.countryArea,
            firstName: billingAddress.firstName,
            lastName: billingAddress.lastName,
            latitude: billingAddress.latitude,
            longitude: billingAddress.longitude,
            phone: billingAddress.phone,
            postalCode: billingAddress.postalCode,
            streetAddress1: billingAddress.streetAddress1,
            streetAddress2: billingAddress.streetAddress2,
          },
          gateway: paymentGateway,
          token: paymentToken,
          withToken,
        },
        districtId,
      };
      const { data, errors } = await this.client.mutate<
        CreateCheckoutPayment,
        CreateCheckoutPaymentVariables
      >({
        mutation: CheckoutMutations.createCheckoutPaymentMutation,
        variables,
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      } else if (data?.checkoutPaymentCreate?.errors.length) {
        return {
          error: data?.checkoutPaymentCreate?.errors,
        };
      } else if (data?.checkoutPaymentCreate?.payment) {
        return {
          data: this.constructPaymentModel(data.checkoutPaymentCreate.payment),
        };
      } else {
        return {};
      }
    } catch (error) {
      return {
        error: error as any,
      };
    }
  };

  completeCheckout = async (
    checkoutId: string,
    paymentData?: string,
    districtId?: string
  ) => {
    try {
      const { data, errors } = await this.client.mutate<
        CompleteCheckout,
        CompleteCheckoutVariables
      >({
        mutation: CheckoutMutations.completeCheckoutMutation,
        variables: { checkoutId, districtId, paymentData },
      });

      if (errors?.length) {
        return {
          error: errors,
        };
      } else if (data?.checkoutComplete?.checkoutErrors.length) {
        return {
          error: data?.checkoutComplete?.checkoutErrors,
        };
      } else if (data?.checkoutComplete?.order) {
        const total: any = data?.checkoutComplete?.order.subtotal?.gross.amount;
        const productsArray: any = data?.checkoutComplete?.order.lines;
        const orderId: any = data?.checkoutComplete?.order.number;
        const tax: any = (total * (0.18 / 1.18)).toFixed(2);
        launchPurchaseEvent(
          orderId,
          total,
          tax,
          ecommerceProductsMapper(productsArray)
        );
        return {
          data: this.constructOrderModel(data.checkoutComplete.order),
        };
      } else {
        return {};
      }
    } catch (error) {
      return {
        error: error as any,
      };
    }
  };

  private isLoggedIn = () => {
    return !!getAuthToken();
  };

  private constructCheckoutModel = ({
    checkout,
    message,
  }: IConstructCheckoutParams): ICheckoutModel => {
    const {
      id,
      token,
      email,
      shippingAddress,
      scheduleDate,
      billingAddress,
      deliveryDate,
      discount,
      discountName,
      voucherDiscountType,
      voucherDiscountValue,
      voucherType,
      voucherCode,
      lines,
      availableShippingMethods,
      availablePaymentGateways,
      shippingMethod,
      documentNumber,
      termsAndConditions,
      dataTreatmentPolicy,
      slotId,
      slots,
    } = checkout;

    const checkoutModel: ICheckoutModel = {
      availablePaymentGateways: availablePaymentGateways || [],
      availableShippingMethods: availableShippingMethods
        ? availableShippingMethods.filter(filterNotEmptyArrayItems)
        : [],
      billingAddress,
      dataTreatmentPolicy,
      deliveryDate: deliveryDate || '',
      documentNumber,
      email,
      scheduleDate,
      id,
      lines: lines
        ?.filter((item) => item?.quantity && item.variant.id)
        .map((item) => {
          const itemVariant = item?.variant;

          return {
            id: item!.id,
            name: itemVariant?.product.name ? itemVariant?.product.name : '',
            quantity: item!.quantity,
            totalPrice: item?.totalPrice,
            variant: {
              attributes: itemVariant?.attributes,
              id: itemVariant!.id,
              isAvailable: itemVariant?.isAvailable,
              name: itemVariant?.name,
              pricing: itemVariant?.pricing,
              product: itemVariant?.product,
              quantityAvailable: itemVariant?.quantityAvailable,
              sku: itemVariant?.sku,
            },
          };
        }),
      promoCodeDiscount: {
        discount,
        discountName,
        message,
        voucherCode,
        voucherDiscountType,
        voucherDiscountValue,
        voucherType,
      },
      shippingAddress,
      shippingMethod,
      termsAndConditions,
      token,
      slotId: slotId!,
      slots: slots as any,
    };

    return checkoutModel;
  };

  private constructPaymentModel = ({
    id,
    gateway,
    token,
    creditCard,
  }: Payment): IPaymentModel => ({
    creditCard,
    gateway,
    id,
    token,
  });

  private constructOrderModel = ({
    id,
    token,
    number: orderNumber,
    sequentialCode,
  }: OrderDetail): IOrderModel => ({
    id,
    number: orderNumber,
    sequentialCode,
    token,
  });
}
