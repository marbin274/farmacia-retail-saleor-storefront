import { generateCollectionUrl } from "@temp/core/utils";
import { Collection_collection } from "@temp/views/Collection/gqlTypes/Collection";

export const structuredCollection = (collection: Collection_collection) => {
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
