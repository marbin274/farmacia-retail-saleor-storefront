import React, { FC } from 'react';
import { Radio } from '@components/atoms';
import classNames from 'classnames';
import { ITileRadioProps } from './types';

export const TileRadio: FC<ITileRadioProps> = ({
  children,
  contentBgHighlighted = false,
  contentNoSpacing = false,
  className,
  hasError,
  icon,
  label,
  onClick,
  radioProps: { checked, ...rest },
}) => {
  return (
    <div
      className={classNames(
        'fa-border-solid fa-border fa-rounded-2xl fa-select-none fa-overflow-hidden',
        {
          'fa-border-error-medium': !!hasError,
          'fa-border-transparent': !checked,
          'fa-border-interactive': !!checked,
        },
        className
      )}
    >
      <div
        className={classNames(
          'fa-flex fa-items-center fa-p-4 fa-rounded-t-2xl',
          {
            'fa-rounded-b-2xl': !checked || (!!checked && !children),
            'fa-bg-highlight-lightest fa-text-interactive': !!checked,
          }
        )}
        onClick={onClick}
      >
        <Radio
          {...rest}
          checked={checked}
          selectedColor="purple"
          hasError={hasError}
          readOnly
        />
        {icon}
        <span
          className={classNames('fa-font-semibold fa-text-sm', {
            'fa-ml-2': !!icon,
          })}
        >
          {label}
        </span>
      </div>
      {checked && children && (
        <div
          className={classNames({
            'fa-px-4': !contentNoSpacing,
            'fa-py-3': !contentNoSpacing && !contentBgHighlighted,
            'fa-pb-3': !contentNoSpacing && !!contentBgHighlighted,
            'fa-bg-highlight-lightest': !!contentBgHighlighted && !!checked,
          })}
        >
          {children}
        </div>
      )}
    </div>
  );
};
