import React from 'react';

import { AccountTile } from './AccountTile';
import { MainAddressTile } from './AddressTile';
import { CategoryTile } from './CategoryTile';
import { ShoppingHistoryTile } from './HistoryTile';
import { MainCardTile } from './Payment';

export const AccountTabTiles: React.FC = () => {
  const [isFocusAccount, setIsFocusAccount] = React.useState(false);

  const startFocusAccount = () => {
    setIsFocusAccount(true);
  };

  const stopFocusAccount = () => {
    setIsFocusAccount(false);
  };

  return (
    <div
      className={`fa-grid fa-grid-cols-1 fa-gap-8 ${
        isFocusAccount ? 'md:fa-grid-cols-1' : 'md:fa-grid-cols-2'
      } `}
    >
      <AccountTile
        startFocusAccount={startFocusAccount}
        stopFocusAccount={stopFocusAccount}
      />
      {!isFocusAccount && (
        <>
          <CategoryTile />
          <ShoppingHistoryTile />
          <MainCardTile />
          <MainAddressTile />
        </>
      )}
    </div>
  );
};
