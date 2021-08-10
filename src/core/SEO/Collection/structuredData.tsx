import { generateCollectionUrl } from "@temp/core/utils";
import { CollectionCategories_collection } from "@sdk/queries/gqlTypes/CollectionCategories";

export const structuredCollection = (collection: CollectionCategories_collection) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": collection.name,
      "item": `${window.location.protocol}//${window.location.hostname}${generateCollectionUrl(collection.id, collection.name)}`,
    }],
  };
}

export const structuredData = collection => {
  return JSON.stringify(structuredCollection(collection));
};
