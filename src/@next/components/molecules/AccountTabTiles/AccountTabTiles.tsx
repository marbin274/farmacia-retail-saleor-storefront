import React from 'react';

import { AccountTile } from './AccountTile';
import { MainAddressTile } from './AddressTile';
import { CategoryTile } from './CategoryTile';
import { ShoppingHistoryTile } from './HistoryTile';
import { MainCardTile } from './Payment';

export const AccountTabTiles: React.FC = () => (
  <div className="fa-grid fa-grid-cols-1 fa-gap-8 md:fa-grid-cols-2">
    <AccountTile />
    <CategoryTile />
    <ShoppingHistoryTile />
    <MainCardTile />
    <MainAddressTile />
  </div>
);
