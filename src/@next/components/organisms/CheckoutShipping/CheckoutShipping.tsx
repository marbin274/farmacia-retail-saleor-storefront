import { ShippingMethodItem } from "@components/molecules";
import { convertShippingMethodDateToDate } from "@temp/@next/utils/dateUtils";
import { Checkout_availableShippingMethods_scheduleDates } from "@temp/@sdk/fragments/gqlTypes/Checkout";
import { IShippingMethodUpdate, IShippingMethodUpdateScheduleDate } from "@temp/@sdk/repository";
import { SHIPPING_FORMAT_DATE } from "@temp/core/config";
import { format } from "date-fns";
import { useFormik } from "formik";
import ErrorFormPopulateIcon from "images/auna/form-populate-error.svg";
import React from "react";
import { ErrorMessage } from "../../atoms";
import { alertService } from "../../atoms/Alert";
import { shippingMethodFormSchema } from "./schema";
import * as S from "./styles";
import { ICheckoutShipping, IProps } from "./types";

/**
 * Shipping method selector used in checkout.
 */
const CheckoutShipping: React.FC<IProps> = ({
  shippingMethods,
  selectedShippingMethodId,
  scheduleDate,
  selectShippingMethod,
  formId,
  formRef,
}: IProps) => {

  
  const {
    errors: formikErrors,
    touched,
    values,
    handleSubmit,
    handleChange,
    setErrors,
    setFieldValue,
  } = useFormik<ICheckoutShipping>({
    initialValues:{
      dateSelected: !scheduleDate?.date ? undefined :convertShippingMethodDateToDate(scheduleDate.date),
      isScheduled: shippingMethods?.find(it => it.id === selectedShippingMethodId)?.isScheduled || false,
      scheduleSelected: scheduleDate?.scheduleTime?.id,
      shippingMethod: selectedShippingMethodId,
    },
    onSubmit: values => {
      if (selectShippingMethod && values.shippingMethod) {
        if(!values.isScheduled){
          selectShippingMethod({
            shippingMethodId: values.shippingMethod,
          }, false);
          return;
        } else if(values.isScheduled && values.dateSelected && values.scheduleSelected){
          const scheduleDate: IShippingMethodUpdateScheduleDate = {
            date: format(values.dateSelected, SHIPPING_FORMAT_DATE)  || '', 
            scheduleTimeId: values.scheduleSelected || '',
          };
          selectShippingMethod({
            scheduleDate,
            shippingMethodId: values.shippingMethod,
          }, false);
        }
        
      }
    },
    validationSchema: shippingMethodFormSchema,
  });

  
  const setShippingMethod = (value: IShippingMethodUpdate) => {
    if (selectShippingMethod) {
      selectShippingMethod(value, true);
    }
  };

  const renderGroupLabel = (id: number, title: string) => (
    <S.GroupLabel>
      <S.GroupLabelIndex>{id}</S.GroupLabelIndex>
      <S.GroupLabelTitle>{title}</S.GroupLabelTitle>
    </S.GroupLabel>
  );

  const handleOnclick = (id:string, isScheduled: boolean, scheduleDates: Array<Checkout_availableShippingMethods_scheduleDates | null> | null, selected:boolean)=>{
    if(!selected){
      setFieldValue("shippingMethod", id);
      setFieldValue("isScheduled", isScheduled);
      const shippingMethod :IShippingMethodUpdate = {shippingMethodId: id};
      if(isScheduled){
        const scheduleDate = scheduleDates?.[0];
        const date = convertShippingMethodDateToDate(scheduleDate?.date);
        shippingMethod.scheduleDate = {date: scheduleDate?.date, scheduleTimeId: scheduleDate?.scheduleTimes?.[0]?.id || ''};
        setFieldValue("dateSelected", date);
        setFieldValue("scheduleSelected", scheduleDate?.scheduleTimes?.[0]?.id);
      }
      setShippingMethod(shippingMethod);
    }
    setErrors({});
  }


  React.useEffect(() => {
    if (formikErrors?.shippingMethod) {
      alertService.sendAlert({
        buttonText: "Entendido",
        icon: ErrorFormPopulateIcon,
        message: "Por favor selecciona el tiempo de entrega",
        title: "¿Cúando deseas recibir tu pedido?",
        type: "Info",
      });
    }
  }, [formikErrors.shippingMethod]);

  React.useEffect(()=>{
    if(values.shippingMethod && !selectedShippingMethodId){
      setFieldValue("shippingMethod", undefined);
    }
  },[selectedShippingMethodId]);
   
  return (
    <section>
        <S.FieldsGroup>
          {renderGroupLabel(3, "¿Cuando desea recibir su pedido?")}
          <form
            id={formId}
            ref={formRef}
            onSubmit={handleSubmit}
          >
            {shippingMethods?.map(({ id, isScheduled, name, price, scheduleDates, subtitle }, index) => {
              const selected: boolean = !!values.shippingMethod && values.shippingMethod === id;

              return (
                <div key={id}>
                <S.ShippingMethodContainer
                  data-cy={`checkoutShippingMethodOption${index}Input`}
                  hasError={!!formikErrors?.shippingMethod}
                  selected={selected}    
                  onClick={() => handleOnclick(id, !!isScheduled, scheduleDates, selected)}
                >
                  <ShippingMethodItem
                    dateSelected={values.dateSelected}
                    errors={formikErrors}
                    id={id}
                    index={index}
                    isScheduled={isScheduled}
                    name={name}
                    selected={selected}
                    scheduleSelected={values.scheduleSelected}
                    scheduleDates={scheduleDates}
                    subtitle={subtitle}
                    touched={touched}
                    price={price}
                    handleChange={handleChange}
                    setErrors={setErrors}
                    setFieldValue={setFieldValue}
                    setShippingMethod={setShippingMethod}
                  />                
                </S.ShippingMethodContainer>
                  {formikErrors?.shippingMethod && <ErrorMessage errors={[{ message: formikErrors.shippingMethod }]} />}                
                </div>
              );
            })}
          </form>
        </S.FieldsGroup>
    </section>
  );
};

export { CheckoutShipping };

