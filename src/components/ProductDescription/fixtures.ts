import {ProductDetails_product_variants} from "@sdk/queries/gqlTypes/ProductDetails";
import {ProductDescriptionProps} from "@temp/components/ProductDescription/index";


export const productDescriptionProps = {
  addToCart: (_varinatId: string, _quantity?: number) => { return },
  descriptionJson: '"{\\"blocks\\": [{\\"key\\": \\"41rl8\\", \\"data\\": {}, \\"text\\": \\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum suscipit viverra nisi, sed bibendum diam faucibus sit amet. Ut sit amet sem ante. Phasellus id lectus nunc. Praesent a lorem id magna venenatis pretium. \\", \\"type\\": \\"unstyled\\", \\"depth\\": 0, \\"entityRanges\\": [], \\"inlineStyleRanges\\": []}], \\"entityMap\\": {}}"',
  items: [
    {
      __typename: "Product",
      "quantity": 1,
      "totalPrice": {
        "gross": {"amount": 1, "currency": "PEN", "culture": "es-PE", "__typename": "Money"},
        "net": {"amount": 1, "currency": "PEN", "culture": "es-PE", "__typename": "Money"},
      },
      // tslint:disable-next-line:no-object-literal-type-assertion
      "variant": ({
        __typename: "ProductVariant",
        "attributes": [],
        "id": "UHJvZHVjdFZhcmlhbnQ6NDIz",
        "isAvailable": false,
        "name": "",
        "pricing": {
          "onSale": false,
          "price": {
            "gross": {"amount": 1, "currency": "PEN", "culture": "es-PE", "__typename": "Money"},
            "net": {"amount": 1, "currency": "PEN", "culture": "es-PE", "__typename": "Money"},
          },
          "priceUndiscounted": {
            "gross": {"amount": 1, "currency": "PEN", "culture": "es-PE", "__typename": "Money"},
            "net": {"amount": 1, "currency": "PEN", "culture": "es-PE", "__typename": "Money"},
          },
        },
        "product": {
          "id": "UHJvZHVjdDoyMjc=",
          "name": "Betacort Depot Solución Inyectable",
          "productType": {"isShippingRequired": true, "__typename": "ProductType"},
          "thumbnail": {
            "alt": "",
            "url": "https://saleor-backend-media.s3.amazonaws.com/__sized__/products/30002865-thumbnail-255x255.png",
          },
          "thumbnail2x": {
            "url": "https://saleor-backend-media.s3.amazonaws.com/__sized__/products/30002865-thumbnail-510x510.png",
          },
        },
        "quantityAvailable": 50,
        "sku": "30002865",
      } as unknown) as ProductDetails_product_variants,
    },
  ],  
  pricing: {
    "onSale": false,
    "priceRange": {
      "start": {
        "gross": {"amount": 0.33, "currency": "PEN", "culture": "es-PE"},
        "net": {"amount": 0.33, "currency": "PEN", "culture": "es-PE"},
      },
      "stop": {
        "gross": {"amount": 0.33, "currency": "PEN", "culture": "es-PE"},
        "net": {"amount": 0.33, "currency": "PEN", "culture": "es-PE"},
      },
    },
    "priceRangeUndiscounted": {
      "start": {
        "gross": {
          "amount": 0.33,
          "culture": "es-PE",
          "currency": "PEN",
        },
        "net": {"amount": 0.33, "currency": "PEN", "culture": "es-PE"},
      },
      "stop": {
        "gross": {"amount": 0.33, "currency": "PEN", "culture": "es-PE"},
        "net": {"amount": 0.33, "currency": "PEN", "culture": "es-PE"},
      },
    },
  },
  product:{
    name: '"Producto 1"',    
  },
  productVariants: [{
    __typename: "ProductVariant",
    "attributes": [],
    "id": "UHJvZHVjdFZhcmlhbnQ6Mzkx",
    "images": [],
    "isAvailable": false,
    "name": "",
    "pricing": {
      __typename: "",
      "onSale": false,
      "price": {
        __typename: "",
        "gross": {"amount": 0.33, "currency": "PEN", "culture": "es-PE", "__typename": "Money"},
        "net": {"amount": 0.33, "currency": "PEN", "culture": "es-PE", "__typename": "Money"},
      },
      "priceUndiscounted": {
        __typename: "",
        "gross": {"amount": 0.33, "currency": "PEN", "culture": "es-PE", "__typename": "Money"},
        "net": {"amount": 0.33, "currency": "PEN", "culture": "es-PE", "__typename": "Money"},
      },
    },
    "quantityAvailable": -2,
    "sku": "20201118175757",
  } ],
  setVariantId: (_variantId: string) => {return},
} as unknown as ProductDescriptionProps;
