import React from 'react';

import { AccountTile } from './AccountTile';
import { MainAddressTile } from './AddressTile';
import { CategoryTile } from './CategoryTile';
import { ShoppingHistoryTile } from './HistoryTile';
import { MainCardTile } from './Payment';

interface AccountTabTilesProps {
  setShowTitleMobile(show: boolean): void;
}

export const AccountTabTiles: React.FC<AccountTabTilesProps> = ({
  setShowTitleMobile,
}) => {
  const [isFocusAccount, setIsFocusAccount] = React.useState(false);

  const startFocusAccount = () => {
    setIsFocusAccount(true);
    setShowTitleMobile(false);
  };

  const stopFocusAccount = () => {
    setIsFocusAccount(false);
    setShowTitleMobile(true);
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
