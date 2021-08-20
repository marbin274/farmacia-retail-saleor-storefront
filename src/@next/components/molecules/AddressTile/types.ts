import { UserDetails_me_addresses } from '@temp/@sdk/queries/gqlTypes/UserDetails';

export type IProps = {
  address: UserDetails_me_addresses;
  onClickEdit: (address: UserDetails_me_addresses) => void;
  onClickDelete: (id: string) => void;
  onClickSetDefault: (id: string) => void;
};
