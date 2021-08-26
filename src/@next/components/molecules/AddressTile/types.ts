import { UserDetails_me_addresses } from '@temp/@sdk/queries/gqlTypes/UserDetails';

export type IProps = {
  address: UserDetails_me_addresses;
  onClickEdit: (address: UserDetails_me_addresses) => void;
  onClickDelete: (address: UserDetails_me_addresses) => void;
  onClickSetDefault: (id: string) => void;
};
