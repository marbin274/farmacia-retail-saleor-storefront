import { smallScreen } from "../../globalStyles/scss/variables.scss";
import * as React from "react";
import Media from "react-media";
import { ProductImage } from "@components/molecules";
import { ProductDescription } from "../../components";
import { generateCategoryUrl, generateProductUrl } from "../../core/utils";
import { ProductDetails_product } from "./gqlTypes/ProductDetails";
import { ICheckoutModelLine } from "@sdk/repository";
import { structuredData } from "../../core/SEO/Product/structuredData";
import { checkCanAddToCart } from "@temp/@next/utils/products";
// TODO: Add as soon as we need to add related products
// import OtherProducts from "./Other";
// TODO: Add as soon as we need to add more product information below the
// import { ProductDescription as NewProductDescription } from "../../@next/components/molecules";
// TODO: Add as soon as we need to add the breadcrumb
// import { Breadcrumbs, ProductDescription } from "../../components";

class Page extends React.PureComponent<
  {
    product: ProductDetails_product;
    add: (variantId: string, quantity: number) => any;
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
    const { add, items, product } = this.props;
    const canAddToCart = checkCanAddToCart(this.props.product, this.props.items);
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
                    <ProductImage product={product} outStock={!canAddToCart} />
                    <div className="product-page__product__info">
                      <ProductDescription
                        canAddToCart={canAddToCart}
                        descriptionJson={product.descriptionJson}
                        items={items}
                        productId={product.id}
                        name={product.name}
                        productVariants={product.variants}
                        pricing={product.pricing}
                        addToCart={add}
                        setVariantId={this.setVariantId}
                      />
                    </div>
                  </>
                ) : (
                    <>
                      <ProductImage product={product} outStock={!canAddToCart} />
                      <div className="product-page__product__info">
                        <div className={"product-page__product__info--fixed"}>
                          <ProductDescription
                            canAddToCart={canAddToCart}
                            descriptionJson={product.descriptionJson}
                            items={items}
                            productId={product.id}
                            name={product.name}
                            productVariants={product.variants}
                            pricing={product.pricing}
                            addToCart={add}
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
