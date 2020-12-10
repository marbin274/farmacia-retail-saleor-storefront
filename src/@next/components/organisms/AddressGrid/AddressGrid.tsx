import React from "react";

import { TileGrid } from "@components/atoms";
import { AddressTile } from "@components/molecules";

import { IProps } from "./types";

/**
 * Addresses tiles with add new address tile opening address form addition modal.
 */
export const AddressGrid: React.FC<IProps> = ({
  addresses,
  addNewAddress,
}: IProps) => {
  const addressTiles = addresses.map(x => [<AddressTile key={x.id} {...x} />]);

  return <TileGrid columns={2} elements={addressTiles} />;
};
