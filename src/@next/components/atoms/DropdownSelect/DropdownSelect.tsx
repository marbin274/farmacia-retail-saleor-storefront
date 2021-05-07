import React from "react";
import { components } from "react-select";
import { ThemeContext } from "styled-components";

import { Label } from "../Label";
import { Select } from "../Select";

import { useHandlerWhenClickedOutside } from "../../../hooks";
import * as S from "./styles";
import { IProps } from "./types";
import caretDown from "images/caret-down.svg";

export const DropdownSelect: React.FC<IProps> = ({
  options,
  name,
  value,
  onChange,
}: IProps) => {
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    setMenuIsOpen(false);
  });

  const customComponents = {
    Control: () => (
      <S.SortLine
        className="select-input"
        data-cy="dropdown-select-input"
        onClick={() => setMenuIsOpen(!menuIsOpen)}
      >
        <Label>Ordenar por:</Label>
        <S.Value className="clear-label">{` ${value ? value.label : "Limpiar"}`}</S.Value>
        <S.Indicator rotate={String(menuIsOpen)}>
          <img src={caretDown} />
        </S.Indicator>
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
    <S.Wrapper data-cy="dropdown-select" ref={setElementRef()}>
      <Select
        options={options}
        value={value}
        onChange={value => {
          setMenuIsOpen(false);
          onChange(value);
        }}
        name={name}
        menuIsOpen={menuIsOpen}
        customComponents={customComponents}
      />
    </S.Wrapper>
  );
};
