import { UserDetails_me } from "@temp/@sdk/queries/gqlTypes/UserDetails";
import * as H from "history";

export interface IProps {
  history: H.History;
  user: UserDetails_me;
}
