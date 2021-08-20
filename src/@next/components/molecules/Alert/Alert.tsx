import React, { FC } from 'react';
import classNames from 'classnames';
import { IAlertProps } from './types';

export const Alert: FC<IAlertProps> = ({
  className,
  icon,
  message,
  type = 'success',
}) => {
  return (
    <div
      className={classNames(
        'fa-px-2.5 fa-py-2.5 fa-rounded-lg fa-text-xs fa-flex fa-items-center',
        {
          'fa-bg-primary-lightest fa-text-brand-03': type === 'success',
          'fa-bg-error-lightest fa-text-error-medium': type === 'error',
          'fa-bg-informative-lightest fa-text-informative-medium':
            type === 'info',
        },
        className
      )}
    >
      {icon}
      <span
        className={classNames({
          'fa-ml-2': !!icon,
        })}
      >
        {message}
      </span>
    </div>
  );
};
