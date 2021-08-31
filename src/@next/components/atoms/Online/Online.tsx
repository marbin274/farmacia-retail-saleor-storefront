import * as React from 'react';

import { NetworkStatus } from '@components/atoms';

const Online: React.FC = ({ children }) => (
  <NetworkStatus>{(online) => (online ? children : null)}</NetworkStatus>
);

export default Online;
