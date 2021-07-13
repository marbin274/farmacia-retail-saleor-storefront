import React from "react";
import ReactSelect from "react-select";
import { ThemeContext } from "styled-components";
import farmatheme  from "@farmatheme";
import { ErrorMessage } from "../ErrorMessage";
import * as S from "./styles";
import { IProps } from "./types";

const optionStyle = (customTheme: any) => ({
  option: (
    provided: any,
    state: {
      isSelected: any;
      isFocused: boolean;
      customTheme: any;
      isDisabled: boolean;
    }
  ) => {
    return {
      ...provided,
      alignItems: "center",
      backgroundColor: state.isSelected
        ? farmatheme.theme.colors.primary.lightest
        : state.isFocused
        ? farmatheme.theme.colors.primary.lightest
        : "white",
      color: state.isSelected
        ? farmatheme.theme.colors.primary.medium
        : state.isDisabled
        ? customTheme.colors.lightFont
        : customTheme.colors.dark,
      display: "flex",
      fontWeight: state.isSelected && customTheme.typography.boldFontWeight,
      margin: "0.2rem auto",
      minHeight: "34px",
      verticalAlign: "middle",
      width: "95%",
      cursor: "pointer",
      borderRadius: "1.5rem",
      padding: "0.5rem 1rem",
      transition: "all 0.2s ease-in-out",
    };
  },
});

export const Select: React.FC<IProps> = ({
  value,
  onChange,
  onBlur,
  clearable,
  clearValue,
  name,
  options,
  isOptionDisabled,
  customComponents,
  defaultValue,
  menuIsOpen,
  customStyles,
  optionLabelKey = "label",
  optionValueKey = "value",
  errors,
  ...props
}: IProps) => {
  const customTheme = React.useContext(ThemeContext);
  const handleChange = (value: any) => {
    if (onChange) {
      name ? onChange(value, name) : onChange(value);
    }
  };
  return (
    <S.Wrapper errors={!!errors}>
      <ReactSelect
        className="select-control"
        defaultValue={defaultValue}
        onChange={handleChange}
        value={value}
        clearValue={clearValue}
        menuIsOpen={menuIsOpen}
        menuShouldScrollIntoView={true}
        tabSelectsValue={false}
        getOptionLabel={option => option[optionLabelKey]}
        getOptionValue={option => option[optionValueKey]}
        openMenuOnFocus={true}
        styles={{ ...optionStyle(customTheme), ...customStyles }}
        options={options}
        isOptionDisabled={isOptionDisabled}
        placeholder={""}
        components={customComponents}
        isClearable={clearable}
        {...props}
      ></ReactSelect>
      <S.ErrorMessages>
        <ErrorMessage errors={errors} />
      </S.ErrorMessages>
    </S.Wrapper>
  );
};
