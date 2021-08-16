import React from "react";

import { AccountTile } from "./AccountTile";
import { MainAddressTile } from "./AddressTile";
import { CategoryTile } from "./CategoryTile";
import { ShoppingHistoryTile } from "./HistoryTile";
import { MainCardTile } from "./Payment";
import * as S from "./styles";

export const AccountTabTiles: React.FC = () => (
  <S.TailiesContainer>
    <AccountTile />
    <CategoryTile/>
    <ShoppingHistoryTile/>
    <MainCardTile/>
    <MainAddressTile/>
  </S.TailiesContainer>
);
