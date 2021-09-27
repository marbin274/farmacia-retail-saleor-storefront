/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CheckoutLineInput, AddressInput } from "./../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: GetPotentialSlots
// ====================================================

export interface GetPotentialSlots_potentialSlots_scheduled {
  __typename: "ShippingSlot";
  /**
   * Slot id.
   */
  id: string | null;
  /**
   * Slot available from.
   */
  slotFrom: string | null;
  /**
   * Slot available to.
   */
  slotTo: string | null;
}

export interface GetPotentialSlots_potentialSlots_express {
  __typename: "ShippingSlot";
  /**
   * Slot id.
   */
  id: string | null;
  /**
   * Slot available from.
   */
  slotFrom: string | null;
  /**
   * Slot available to.
   */
  slotTo: string | null;
}

export interface GetPotentialSlots_potentialSlots_express30 {
  __typename: "ShippingSlot";
  /**
   * Slot id.
   */
  id: string | null;
  /**
   * Slot available from.
   */
  slotFrom: string | null;
  /**
   * Slot available to.
   */
  slotTo: string | null;
}

export interface GetPotentialSlots_potentialSlots_nextDay {
  __typename: "ShippingSlot";
  /**
   * Slot id.
   */
  id: string | null;
  /**
   * Slot available from.
   */
  slotFrom: string | null;
  /**
   * Slot available to.
   */
  slotTo: string | null;
}

export interface GetPotentialSlots_potentialSlots {
  __typename: "Slot";
  /**
   * List of scheduled slots.
   */
  scheduled: (GetPotentialSlots_potentialSlots_scheduled | null)[] | null;
  /**
   * List of express slots.
   */
  express: (GetPotentialSlots_potentialSlots_express | null)[] | null;
  /**
   * List of express_30 slots.
   */
  express30: (GetPotentialSlots_potentialSlots_express30 | null)[] | null;
  /**
   * List of next_day slots.
   */
  nextDay: (GetPotentialSlots_potentialSlots_nextDay | null)[] | null;
  /**
   * Datetime.
   */
  datetime: string | null;
}

export interface GetPotentialSlots {
  /**
   * List of slots.
   */
  potentialSlots: GetPotentialSlots_potentialSlots | null;
}

export interface GetPotentialSlotsVariables {
  lines: (CheckoutLineInput | null)[];
  shippingAddress: AddressInput;
  sessionId: any;
}
