import { structuredCategory } from "@temp/core/utils";

export const structuredData = category => {
  return JSON.stringify(structuredCategory(category));
};
