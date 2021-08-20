import React, { FC, useState, useEffect } from 'react';
import { InputField } from '@farmacia-retail/farmauna-components';
import { TileRadio } from '@components/molecules';
import { ITileRadioGroupProps } from './types';

export const TileRadioGroup: FC<ITileRadioGroupProps> = ({
  hasError,
  onChangeValue,
  options,
  value,
}) => {
  const [option, setOption] = useState<string>();

  useEffect(() => {
    if (!option && value) {
      let currentOption = options.find((o) => o.value === value);

      if (!currentOption) {
        currentOption = options.find((o) => o.withInput === true);
      }

      setOption(currentOption.value);
    }
  }, [option, value]);

  return (
    <div>
      {options.map(({ icon, label, value: optionValue, withInput }) => (
        <TileRadio
          key={optionValue}
          label={label}
          icon={icon}
          radioProps={{
            checked: option === optionValue,
          }}
          onClick={() => {
            setOption(optionValue);

            if (withInput) {
              onChangeValue?.('');
            } else {
              onChangeValue?.(optionValue);
            }
          }}
          className="fa-mb-4 fa-bg-neutral-light"
          contentBgHighlighted
          hasError={hasError}
        >
          {withInput && (
            <div>
              <p className="fa-text-sm fa-mb-2">
                Ingresa un nombre a la dirección
              </p>
              <InputField
                placeholder=""
                value={value}
                onChange={(e) => {
                  onChangeValue?.(e.target.value);
                }}
              />
            </div>
          )}
        </TileRadio>
      ))}
    </div>
  );
};
