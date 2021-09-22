import { DropdownSelect } from '@components/atoms';
import { useRouter } from 'next/router';
import React from 'react';
import * as S from './styles';
import { IProps } from './types';

export const AccountMenuMobile: React.FC<IProps> = ({
  links,
  active,
}: IProps) => {
  const options = React.useMemo(
    () => links.map((it) => ({ label: it.label, value: it.url })),
    [links]
  );
  const router = useRouter();

  const onChangeOption = ({ value }) => {
    router.push(value);
  };

  return (
    <S.RoutesWrapper>
      <DropdownSelect
        clearText={'Mi cuenta'}
        onChange={onChangeOption}
        options={options}
        value={options.find((option) => option.value === active)}
      />
    </S.RoutesWrapper>
  );
};
