import { IAddressForm } from '@app/types/IAddressForm';
import { ErrorMessage, Loader } from '@components/atoms';
import { maybe } from '@app/utils/misc';
import {
  ecommerceProductsMapper,
  launchCheckoutEvent,
  steps,
} from '@sdk/gaConfig';
import { useCart, usePotentialShippingMethods } from '@sdk/react';
import { FormikErrors, FormikTouched } from 'formik';
import React from 'react';
import {
  CheckoutShipping,
  CheckoutShippingSlots,
} from '../../CheckoutShipping';

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
    () => maybe(() => potencialShippingMethods?.potentialShippingMethods, []),
    [potencialShippingMethods?.potentialShippingMethods]
  );

  if (shippingMethodsLoading) {
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
                  setScheduleTime={(scheduleTimeId, slotId) => {
                    setValues({
                      ...values,
                      scheduleDate: scheduleTimeId,
                      slotId,
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
          setScheduleTime={(scheduleTimeId) => {
            setValues({
              ...values,
              scheduleDate: scheduleTimeId,
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
