import React from 'react';

import { AccountTabTiles } from '@components/molecules';
import * as S from './styles';
import AccountLayout from '@app/pages/AccountPage/AccountLayout';

export const AccountTab: React.FC = () => {
  const [showTitleMobile, setShowTitleMobile] = React.useState(true);
  return (
    <AccountLayout showTitleMobile={showTitleMobile}>
      <S.Wrapper>
        <AccountTabTiles setShowTitleMobile={setShowTitleMobile} />
      </S.Wrapper>
    </AccountLayout>
  );
};
