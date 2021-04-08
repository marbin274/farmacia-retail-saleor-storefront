import React from "react";
import ReactDatePicker from "react-datepicker";
import { IProps } from "./types";
import { ErrorMessage } from "@components/atoms";
import * as S from "./styles";
import ReactSVG from "react-svg";
import shippingMethodCalendarIcon from "images/auna/shipping-method-calendar.svg";
import { SHIPPING_DISPLAY_FORMAT_DATE } from "@temp/core/config";

export const DatePicker: React.FC<IProps> = ({ errors, minDate, maxDate, value, onChange }) => {

  const ExampleCustomInput = React.forwardRef<HTMLButtonElement>(
    ({value, onClick} : any, ref) => (
      <S.ButtonSelectDate>
        <button type="button" className="example-custom-input" onClick={onClick} ref={ref}>
          {value || ""}
          <ReactSVG path={shippingMethodCalendarIcon}/>
        </button>
      </S.ButtonSelectDate>
    )
  );
  return (
    <S.Wrapper>
      <ReactDatePicker
        dateFormat={SHIPPING_DISPLAY_FORMAT_DATE}
        locale="es"
        selected={value}
        minDate={minDate}
        maxDate={maxDate}
        onChange={onChange}
        customInput={<ExampleCustomInput />}
      />
      <S.ErrorMessages>
        <ErrorMessage errors={errors} />
      </S.ErrorMessages>
    </S.Wrapper>
  );
}

