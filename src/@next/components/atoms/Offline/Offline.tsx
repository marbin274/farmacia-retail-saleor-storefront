import * as React from 'react';

import { NetworkStatus } from '@components/atoms';

const Offline: React.FC = ({ children }) => (
  <NetworkStatus>{(online) => (online ? null : children)}</NetworkStatus>
);

export default Offline;
