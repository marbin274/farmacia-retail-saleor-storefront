import { IAddressForm } from '@app/types/IAddressForm';
import { ErrorMessage, Loader } from '@components/atoms';
import { maybe } from '@app/utils/misc';
import {
  ecommerceProductsMapper,
  launchCheckoutEvent,
  steps,
} from '@sdk/gaConfig';
import { useCart, useCheckout, usePotentialShippingMethods } from '@sdk/react';
import { FormikErrors, FormikTouched } from 'formik';
import React from 'react';
import {
  CheckoutShipping,
  CheckoutShippingSlots,
} from '../../CheckoutShipping';
import { checkPrimeUser } from '@temp/@sdk/api/Prime';
import { isPrimeShippingMethod } from '@temp/core/utils';
import { primeSku } from '@temp/core/constants';

export interface IShippingSectionProps {
  fieldErrors: FormikErrors<IAddressForm>;
  values: IAddressForm;
  handleChange(e: React.ChangeEvent<any>): void;
  setFieldValue(field: string, value: any): void;
  setValues(values: IAddressForm): void;
  touched: FormikTouched<IAddressForm>;
}

export const ShippingSection: React.FC<IShippingSectionProps> = ({
  fieldErrors,
  values,
  setFieldValue,
  setValues,
  touched,
}) => {
  const { items: itemsCart } = useCart();
  const { setPrime, isPrime } = useCheckout();
  const [primeLoading, setPrimeLoading] = React.useState<boolean>(true);
  const items = React.useMemo(
    () =>
      itemsCart?.map((line) => ({
        quantity: line.quantity,
        variantId: line.variant?.id,
      })),
    [itemsCart]
  );

  const { data: potencialShippingMethods, loading: shippingMethodsLoading } =
    usePotentialShippingMethods(
      {
        district: values?.district,
        lines: items,
      },
      { fetchPolicy: 'network-only' }
    );

  const registerEvent = () => {
    launchCheckoutEvent(
      steps.shippingMethodSelected,
      ecommerceProductsMapper(itemsCart)
    );
  };

  const shippingMethods = React.useMemo(
    () =>
      maybe(
        () =>
          isPrime
            ? potencialShippingMethods.potentialShippingMethods.filter((it) =>
                isPrimeShippingMethod(it)
              )
            : potencialShippingMethods?.potentialShippingMethods.filter(
                (it) => !isPrimeShippingMethod(it)
              ),
        []
      ),
    [potencialShippingMethods?.potentialShippingMethods, isPrime]
  );

  React.useEffect(() => {
    const checkPrime = async () => {
      if (!!values.district && !!values.latitude) {
        setPrimeLoading(true);
        const isPrimeUser = await checkPrimeUser(values.email);
        const existProductPrime = !!itemsCart?.find(
          (x) => x.variant.sku === primeSku
        );
        setPrime(isPrimeUser || existProductPrime);
        setPrimeLoading(false);
      }
    };

    checkPrime();
  }, [values.district, values.latitude]);

  if (shippingMethodsLoading || primeLoading) {
    return <Loader />;
  }

  if (!shippingMethods.length) {
    return (
      <div>
        <p>
          Por ahora no tenemos métodos de envío para los productos del carrito
        </p>
      </div>
    );
  }

  const checkShippingComponentProps = {
    fieldErrors,
    registerEvent,
    setFieldValue,
    setValues,
    shippingMethods,
    touched,
    values,
  };

  return (
    <>
      {values.isLastMileActive ? (
        <CheckoutShippingSlots
          items={items}
          shippingMethods={shippingMethods}
          values={values}
        >
          {(shippingMethodSlots, loading) => (
            <>
              {!!loading ? (
                <Loader />
              ) : (
                <CheckoutShipping
                  {...checkShippingComponentProps}
                  shippingMethods={shippingMethodSlots}
                  scheduleSelected={values.slotId}
                  setScheduleTime={(scheduleTime) => {
                    setValues({
                      ...values,
                      scheduleDate: scheduleTime.scheduleDate,
                      slotId: scheduleTime.slotId,
                    });
                  }}
                />
              )}
            </>
          )}
        </CheckoutShippingSlots>
      ) : (
        <CheckoutShipping
          {...checkShippingComponentProps}
          scheduleSelected={values.scheduleDate}
          setScheduleTime={(scheduleTime) => {
            setValues({
              ...values,
              scheduleDate: scheduleTime.scheduleDate,
            });
          }}
        />
      )}
      {!!shippingMethods?.length &&
        fieldErrors?.shippingMethod &&
        !values.shippingMethod && (
          <ErrorMessage errors={[{ message: fieldErrors.shippingMethod }]} />
        )}
    </>
  );
};
