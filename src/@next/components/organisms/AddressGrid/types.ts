import { UserDetails_me_addresses } from '@temp/@sdk/queries/gqlTypes/UserDetails';
export interface IProps {
  addresses: UserDetails_me_addresses[];
  onClickAdd: () => void;
  onClickEdit: (address: UserDetails_me_addresses) => void;
  onClickDelete: (address: UserDetails_me_addresses) => void;
  onClickSetDefault: (id: string) => void;
  showAddEditSuccess?: boolean;
  showDeleteSuccess?: boolean;
}
