import { Loader } from '@temp/@next/components/atoms';
import {
  AddressForm,
  StockValidationModal,
} from '@temp/@next/components/organisms';
import { useShopContext } from '@temp/@next/components/organisms/ShopProvider/context';
import { useCheckPluginsStatus, useUpdateCartLines } from '@temp/@next/hooks';
import { alertService } from '@temp/@next/services';
import { IAddressForm } from '@temp/@next/types/IAddressForm';
import { CheckoutErrorCode } from '@temp/@sdk/gqlTypes/globalTypes';
import { CreateCheckout_checkoutCreate_checkoutErrors_products } from '@temp/@sdk/mutations/gqlTypes/CreateCheckout';
import { useCheckout, useUserDetails } from '@temp/@sdk/react';
import { baseUrl } from '@temp/app/routes';
import {
  CHECKOUT_STEPS,
  COUNTRY_DEFAULT,
  SHIPPING_FORMAT_DATE,
} from '@temp/core/config';
import { format } from 'date-fns';
import React from 'react';
import { useRouter } from 'next/router';
import { ICreateCheckout } from '@temp/@sdk/repository';

export interface ICheckoutAddressSubpageHandles {
  submitAddress: () => void;
}

export interface ICheckoutAddressSubpageProps {
  checkoutAddressSubpageRef: React.MutableRefObject<ICheckoutAddressSubpageHandles>;
  changeSubmitProgress(submitInProgress: boolean): void;
}

export const CheckoutAddressSubpage: React.FC<ICheckoutAddressSubpageProps> = ({
  changeSubmitProgress,
  checkoutAddressSubpageRef,
}) => {
  const checkoutAddressFormRef = React.useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { isLastMileActive } = useCheckPluginsStatus();
  const { data: user, loading: userLoading } = useUserDetails();
  const { checkout, setCheckout } = useCheckout();
  const [showStockValidation, setShowStockValidation] = React.useState<string>(null);
  const { update: updateCartLines, loading: updatingCartLines } =
    useUpdateCartLines();
  const [stockValidationProducts, setStockValidationProducts] =
    React.useState<CreateCheckout_checkoutCreate_checkoutErrors_products[]>();

  const { availableDistricts } = useShopContext();

  const handleSubmit = async (data: IAddressForm) => {
    changeSubmitProgress(true);
    const city = availableDistricts.find((it) => it.id === data.district);
    const newCheckout: ICreateCheckout = {
      districtId: data.district,
      email: data.email,
      lines: [],
      documentNumber: data.documentNumber,
      privacyPolicy: {
        dataTreatmentPolicy: data.dataTreatmentPolicy,
        termsAndConditions: data.termsAndConditions,
      },
      shippingAddress: {
        city: city?.name,
        country: COUNTRY_DEFAULT,
        firstName: data.firstName,
        latitude: data.latitude,
        longitude: data.longitude,
        phone: data.phone,
        streetAddress1: data.streetAddress1,
        streetAddress2: data.streetAddress2,
      },
      shippingMethodId: data.shippingMethod,
      slotId: data.slotId,
    };
    if (data.isScheduled) {
      newCheckout.scheduleDate = {
        date: format(data.deliveryDate, SHIPPING_FORMAT_DATE),
        scheduleTimeId: data.scheduleDate,
      };
    }
    const { checkoutErrors } = await setCheckout(newCheckout);
    if (checkoutErrors?.length! > 0) {
      const checkoutError = checkoutErrors![0];
      if (checkoutError.code === CheckoutErrorCode.INSUFFICIENT_STOCK) {
        setStockValidationProducts(
          checkoutError.products! as CreateCheckout_checkoutCreate_checkoutErrors_products[]
        );
        setShowStockValidation(city?.name);
        changeSubmitProgress(false);
        return;
      }
    }
    changeSubmitProgress(false);

    if (!checkoutErrors) {
      router.push(CHECKOUT_STEPS[0].nextStepLink);
    } else {
      alertService.sendAlert({
        buttonText: 'Entendido',
        message: checkoutErrors?.[0]?.message,
        title: 'Ha ocurrido un error',
        type: 'Error',
      });
    }
  };

  const onStockValidationContinue = async () => {
    if (updatingCartLines) {
      return;
    }

    setShowStockValidation(null);
    setStockValidationProducts(undefined);

    await updateCartLines();
    checkoutAddressFormRef.current?.dispatchEvent(
      new Event('submit', { cancelable: true, bubbles: true })
    );
  };

  React.useImperativeHandle(checkoutAddressSubpageRef, () => ({
    submitAddress: () => {
      checkoutAddressFormRef.current?.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      );
    },
  }));

  if (!!userLoading) {
    return <Loader />;
  }

  return (
    <>
      <AddressForm
        checkout={checkout}
        formRef={checkoutAddressFormRef}
        isLastMileActive={isLastMileActive}
        user={user}
        handleSubmit={handleSubmit}
      />
      <StockValidationModal
        show={!!showStockValidation?.length}
        onClose={() => {
          setShowStockValidation(null);
          setStockValidationProducts(undefined);
        }}
        products={stockValidationProducts}
        onClickKeepSearching={() => {
          router.push(baseUrl);
        }}
        onClickContinue={onStockValidationContinue}
        district={showStockValidation}
      />
    </>
  );
};

export default CheckoutAddressSubpage;
