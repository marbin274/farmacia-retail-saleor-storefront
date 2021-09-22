import { ApolloClient } from '@apollo/client';

import { Config } from '@sdk/types';

export interface IProps<TCacheShape> {
  children: React.ReactNode;
  config?: Config;
  client: ApolloClient<TCacheShape>;
}
