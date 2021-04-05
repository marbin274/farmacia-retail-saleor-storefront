import React from "react";

import { AddNewTile, TileGrid } from "@components/atoms";
import { AddressTile } from "@components/molecules";

import { IProps } from "./types";

/**
 * Addresses tiles with add new address tile opening address form addition modal.
 */
export const AddressGrid: React.FC<IProps> = ({
  addresses,
  addNewAddress,
}: IProps) => {
  const addNewTile = (
    <AddNewTile key="newTile" type="dirección" onClick={addNewAddress} />
  );
  const addressTiles: any[] = [];
  if (addresses.length < 1) {
    addressTiles.push(addNewTile);
  } else {
    addresses.map(x => {
      addressTiles.push(<AddressTile key={x.address.id} {...x} />);
    });
  }

  return <TileGrid columns={2} elements={addressTiles} />;
};
