import { ProductImage } from "@components/molecules";
import { ICheckoutModelLine, ICheckoutModelLineVariantLocalStorage } from "@sdk/repository";
import { checkProductCanAddToCart, productStickerRules } from "@temp/@next/utils/products";
import * as React from "react";
import Media from "react-media";
import { ProductDescription } from "../../components";
import { structuredData } from "../../core/SEO/Product/structuredData";
import { generateCategoryUrl, generateProductUrl } from "../../core/utils";
import { smallScreen } from "../../globalStyles/scss/variables.scss";
import { ProductDetails_product } from "./gqlTypes/ProductDetails";
// TODO: Add as soon as we need to add related products
// import OtherProducts from "./Other";
// TODO: Add as soon as we need to add more product information below the
// import { ProductDescription as NewProductDescription } from "../../@next/components/molecules";
// TODO: Add as soon as we need to add the breadcrumb
// import { Breadcrumbs, ProductDescription } from "../../components";

class Page extends React.PureComponent<
  {
    product: ProductDetails_product;
    add: (variant: ICheckoutModelLineVariantLocalStorage, quantity: number) => any;
    remove: (variantId: string) => any;
    items: ICheckoutModelLine[];
  },
  {
    variantId: string;
  }
> {
  fixedElement: React.RefObject<HTMLDivElement> = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      variantId: "",
    };
  }

  setVariantId = (id: string) => {
    this.setState({ variantId: id });
  };

  get showCarousel() {
    return this.props.product.images.length > 1;
  }

  populateBreadcrumbs = product => [
    {
      link: generateCategoryUrl(product.category.id, product.category.name),
      value: product.category.name,
    },
    {
      link: generateProductUrl(product.id, product.name),
      value: product.name,
    },
  ];

  getImages = () => {
    const { product } = this.props;
    if (product.variants && this.state.variantId) {
      const variant = product.variants
        .filter(variant => variant.id === this.state.variantId)
        .pop();
      if (variant.images.length > 0) {
        return variant.images;
      } else {
        return product.images;
      }
    } else {
      return product.images;
    }
  };

  render() {
    const { add, remove, items, product } = this.props;
    const { canAddToCart } = checkProductCanAddToCart(
      this.props.product,
      this.props.items
    );    
    const { isOnSale, isOutStock } = productStickerRules(product);

    return (
      <div className="product-page">
        <div className="container">
          {/* <Breadcrumbs breadcrumbs={this.populateBreadcrumbs(product)} /> */}
        </div>
        <div className="container">
          <div className="product-page__product">
            <script className="structured-data-list" type="application/ld+json">
              {structuredData(product)}
            </script>
            <Media query={{ maxWidth: smallScreen }}>
              {matches =>
                matches ? (
                  <>
                    <ProductImage
                      canAddToCart={canAddToCart}
                      isOnSale={isOnSale}
                      isOutStock={isOutStock}
                      product={product}
                    />
                    <div className="product-page__product__info">
                      <ProductDescription
                        canAddToCart={canAddToCart}
                        descriptionJson={product.descriptionJson}
                        isOnSale={isOnSale}
                        items={items}
                        product={product}
                        pricing={product.pricing}
                        productVariants={product.variants}
                        addToCart={add}
                        removeToCart={remove}
                        setVariantId={this.setVariantId}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <ProductImage
                      canAddToCart={canAddToCart}
                      isOnSale={isOnSale}
                      isOutStock={isOutStock}
                      product={product}
                    />
                    <div className="product-page__product__info">
                      <div className={"product-page__product__info--fixed"}>
                        <ProductDescription
                          canAddToCart={canAddToCart}
                          descriptionJson={product.descriptionJson}
                          isOnSale={isOnSale}
                          items={items}
                          product={product}
                          pricing={product.pricing}
                          productVariants={product.variants}
                          addToCart={add}
                          removeToCart={remove}
                          setVariantId={this.setVariantId}
                        />
                      </div>
                    </div>
                  </>
                )
              }
            </Media>
          </div>
        </div>
        {/* <div className="container">
          <div className="product-page__product__description">
            <NewProductDescription
              descriptionJson={product.descriptionJson}
              attributes={product.attributes}
            />
          </div>
        </div> */}
        {/* <OtherProducts products={product.category.products.edges} /> */}
      </div>
    );
  }
}

export default Page;
