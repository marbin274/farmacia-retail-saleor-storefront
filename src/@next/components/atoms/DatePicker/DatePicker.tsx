import React from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IProps } from './types';
import { ErrorMessage } from '@components/atoms';
import * as S from './styles';
import es from 'date-fns/locale/es';
registerLocale('es', es);
import { SHIPPING_DISPLAY_FORMAT_DATE } from '@temp/core/config';
import { CalendarIcon } from '@farmacia-retail/farmauna-components';

export const DatePicker: React.FC<IProps> = ({
  disabled = false,
  errors,
  minDate,
  maxDate,
  value,
  onChange,
}) => {
  const ExampleCustomInput = React.forwardRef<HTMLButtonElement>(
    ({ value, onClick }: any, ref) => (
      <S.ButtonSelectDate className="control">
        <button
          type="button"
          className="example-custom-input"
          onClick={onClick}
          ref={ref}
        >
          {value || ''}
          <CalendarIcon size={16} />
        </button>
      </S.ButtonSelectDate>
    )
  );
  return (
    <S.Wrapper>
      <ReactDatePicker
        disabled={disabled}
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
};
