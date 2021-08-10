import { Label, Select } from "@components/atoms";
import { DownIcon } from "@farmacia-retail/farmauna-components";
import React from "react";
import { components } from "react-select";
import { ThemeContext } from "styled-components";
import { useClickedOutside } from "../../../hooks";
import * as S from "./styles";
import { IProps } from "./types";

export const DropdownSelect: React.FC<IProps> = ({
  clearText,
  label,
  name,
  onChange,
  options,
  value,
}: IProps) => {
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const { clickedOutside, setElementRef } = useClickedOutside();

  React.useEffect(() => {
    setMenuIsOpen(false);
  }, [clickedOutside]);

  const customComponents = {
    Control: () => (
      <S.SortLine
        className="select-input"
        data-cy="dropdown-select-input"
        onClick={() => setMenuIsOpen(!menuIsOpen)}
      >
        {label && <Label>{label}:</Label>}
        <div className="select-container fa-border fa-border-solid fa-border-neutral-dark fa-rounded-3xl fa-px-3 fa-py-2">
          <S.Value className="select-container__value">{` ${
            value ? value.label : clearText
          }`}</S.Value>
          <S.Indicator rotate={String(menuIsOpen)}>
            <DownIcon />
          </S.Indicator>
        </div>
      </S.SortLine>
    ),
    IndicatorSeparator: () => null,
    IndicatorsContainer: () => null,
    Option: (props: any) => {
      const customTheme = React.useContext(ThemeContext);
      return <components.Option {...{ customTheme, ...props }} />;
    },
  };

  return (
    <S.Wrapper
      className="dropdown-select"
      data-cy="dropdown-select"
      ref={setElementRef()}
    >
      <Select
        customComponents={customComponents}
        name={name}
        menuIsOpen={menuIsOpen}
        onChange={value => {
          setMenuIsOpen(false);
          onChange(value);
        }}
        options={options}
        value={value}
      />
    </S.Wrapper>
  );
};
