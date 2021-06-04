import {
  DataErrorCheckoutTypes,
  FunctionErrorCheckoutTypes,
} from "../api/Checkout/types";
import { CreateCheckout_checkoutCreate_checkoutErrors } from "../mutations/gqlTypes/CreateCheckout";
import { IJobs } from "./Jobs";
import { IQueuedJobs } from "./QueuedJobs";

export interface JobErrorResponse<T> {
  error?: any;
  type?: T;
}

export interface JobRunResponse<D, F> {
  data?: any;
  dataError?: JobErrorResponse<D>;
  checkoutErrors?: Omit<
    CreateCheckout_checkoutCreate_checkoutErrors,
    "__typename"
  >[];
}

export type PromiseCheckoutJobRunResponse = Promise<
  JobRunResponse<DataErrorCheckoutTypes, FunctionErrorCheckoutTypes>
>;

export type JobFunctionParameters<
  G extends keyof IJobs,
  J extends keyof IJobs[G],
  T extends IJobs[G][J]
> = T extends (...args: infer P) => any ? P : never;

export type QueuedJobFunctionParameters<
  G extends keyof IQueuedJobs,
  J extends keyof IQueuedJobs[G],
  T extends IQueuedJobs[G][J]
> = T extends (...args: infer P) => any ? P : never;
