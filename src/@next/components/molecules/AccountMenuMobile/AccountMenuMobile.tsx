import { DropdownSelect } from "@components/atoms";
import React from "react";
import { useHistory } from "react-router";
import * as S from "./styles";
import { IProps } from "./types";



export const AccountMenuMobile: React.FC<IProps> = ({
  links,
  active,
}: IProps) => {
  const options = React.useMemo(()=> links.map(it => ({ label: it.label, value: it.url })), [links])
  const history = useHistory();

  const onChangeOption = ({ value }) => {
    history.push(value);
  }

  return (
    <S.RoutesWrapper>
      <DropdownSelect
        clearText={"Mi cuenta"}
        onChange={onChangeOption}
        options={options}
        value={options.find(
          option => option.value === active
        )}
      />
    </S.RoutesWrapper>
  );
};
