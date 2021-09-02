import React from 'react';
import { components } from 'react-select';
import { ControlProps } from 'react-select/lib/components/Control';
import { InputProps } from 'react-select/lib/components/Input';
import { OptionProps } from 'react-select/lib/components/Option';
import { ThemeContext } from 'styled-components';
import { DownIcon, UpIcon } from '@farmacia-retail/farmauna-components';
import { Icon, InputLabel, Select } from '@components/atoms';
import farmatheme from '@farmatheme';
import * as S from './styles';
import { IInputSelectProps } from './types';
import { ReactSVG } from 'react-svg';

export const InputSelect: React.FC<IInputSelectProps> = ({
  label,
  inputProps,
  indicatorIcon,
  ...props
}) => {
  const customStyles = {
    control: (provided: any, state: { menuIsOpen: any }) => ({
      ...provided,
      ':hover': {
        border: `1px solid ${farmatheme.theme.colors.neutral.darkest}`,
        outlineColor: 'none',
      },
      background: 'white',

      border: state.menuIsOpen
        ? `1px solid ${farmatheme.theme.colors.neutral.darkest}`
        : `1px solid ${farmatheme.theme.colors.neutral.medium}`,
      borderRadius: '0.5rem',
      boxShadow: 0,
      width: '100%',
      boxSizing: 'border-box',
      margin: 0,
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      padding: '0 3rem 0 1rem',
      height: '2.5rem',
    }),
    valueContainer: (provided: any) => {
      return {
        ...provided,
        padding: 0,
      };
    },
  };

  const customComponents = {
    Control: (props: ControlProps<any>) => {
      const customTheme = React.useContext(ThemeContext);
      return (
        <>
          <components.Control
            data-cy="input-select"
            {...{ customTheme, ...props }}
          />
          {
            <InputLabel
              labelBackground={customTheme.colors.light}
              active={props.selectProps.menuIsOpen || props.hasValue}
            >
              {label}
            </InputLabel>
          }
        </>
      );
    },
    IndicatorSeparator: () => null,
    IndicatorsContainer: ({ selectProps, hasValue, clearValue }: any) => {
      const showClearIndicator =
        selectProps.isClearable ||
        (selectProps.isMulti && selectProps.isClearable === undefined);

      if (showClearIndicator && hasValue) {
        return (
          <S.ClearIndicator onClick={clearValue}>
            <Icon name="select_x" size={10} />
          </S.ClearIndicator>
        );
      } else {
        const menuIsOpenIcon = selectProps.menuIsOpen ? (
          <DownIcon size={16} />
        ) : (
          <UpIcon size={16} />
        );
        return (
          <S.DropdownIndicator withArrow={!indicatorIcon}>
            {indicatorIcon ? (
              typeof indicatorIcon === 'string' ? (
                <ReactSVG src={indicatorIcon} />
              ) : (
                indicatorIcon
              )
            ) : (
              menuIsOpenIcon
            )}
          </S.DropdownIndicator>
        );
      }
    },
    Input: (props: InputProps) => {
      return <components.Input {...{ ...props, ...inputProps }} />;
    },
    Option: (props: OptionProps<any>) => {
      const customTheme = React.useContext(ThemeContext);
      return <components.Option {...{ customTheme, ...props }} />;
    },
  };

  return (
    <Select
      customComponents={customComponents}
      {...props}
      customStyles={customStyles}
    />
  );
};
