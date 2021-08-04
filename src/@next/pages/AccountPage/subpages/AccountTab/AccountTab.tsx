import React from "react";

import { AccountTabTiles } from "@components/molecules";
import * as S from "./styles";
import AccountLayout from "@app/pages/AccountPage/AccountLayout";

export const AccountTab: React.FC = () => {
  return (
    <AccountLayout>
      <S.Wrapper>
        <AccountTabTiles />
      </S.Wrapper>
    </AccountLayout>
  );
};
