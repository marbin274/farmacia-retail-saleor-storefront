import { ProductList_products_edges_node } from "@sdk/queries/gqlTypes/ProductList";

export const PRODUCT: ProductList_products_edges_node = {
  __typename: "Product",
  category: {
    __typename: "Category",
    id: "Q2F0ZWdvcnk6MTQ=",
    name: "Juices",
  },
  id: "UHJvZHVjdDo3Mg==",
  name: "Apple Juice",
  pricing: {
    __typename: "ProductPricingInfo",
    onSale: true,
    priceRange: {
      __typename: "TaxedMoneyRange",
      start: {
        __typename: "TaxedMoney",
        gross: {
          __typename: "Money",
          amount: 1.8,
          culture: "es-PE",
          currency: "PEN",
        },
        net: {
          __typename: "Money",
          amount: 1.8,
          culture: "es-PE",
          currency: "PEN",
        },
      },
      stop: {
        __typename: "TaxedMoney",
        gross: {
          __typename: "Money",
          amount: 4.2,
          culture: "es-PE",
          currency: "PEN",
        },
        net: {
          __typename: "Money",
          amount: 4.2,
          culture: "es-PE",
          currency: "PEN",
        },
      },
    },
    priceRangeUndiscounted: {
      __typename: "TaxedMoneyRange",
      start: {
        __typename: "TaxedMoney",
        gross: {
          __typename: "Money",
          amount: 3,
          culture: "es-PE",
          currency: "PEN",
        },
        net: {
          __typename: "Money",
          amount: 3,
          culture: "es-PE",
          currency: "PEN",
        },
      },
      stop: {
        __typename: "TaxedMoney",
        gross: {
          __typename: "Money",
          amount: 7,
          culture: "es-PE",
          currency: "PEN",
        },
        net: {
          __typename: "Money",
          amount: 7,
          culture: "es-PE",
          currency: "PEN",
        },
      },
    },
  },
  thumbnail: {
    __typename: "Image",
    alt: "",
    url:
      "http://localhost:8000/media/__sized__/products/saleordemoproduct_fd_juice_06_102xcfi-thumbnail-255x255.png",
  },
  thumbnail2x: {
    __typename: "Image",
    url:
      "http://localhost:8000/media/__sized__/products/saleordemoproduct_fd_juice_06_102xcfi-thumbnail-510x510.png",
  },
};
