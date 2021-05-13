import { RichTextContent } from "@components/atoms";
import { TaxedMoney } from "@components/containers";
import {
  ProductBottomDetail, ProductVariantPicker
} from "@components/organisms";
import {
  ProductDetails_product_pricing,
  ProductDetails_product_variants,
  ProductDetails_product_variants_pricing
} from "@sdk/queries/gqlTypes/ProductDetails";
import {
  ICheckoutModelLine,
  ICheckoutModelLineVariantLocalStorage
} from "@sdk/repository";
import ItemsHandler from "@temp/@next/components/organisms/ItemsHandler/ItemsHandler";
import { ISimpleProduct } from "@temp/@next/types/IProduct";
import {
  getOneProductWithQuantity,
  getProductPricingClass
} from "@temp/@next/utils/products";
import { IProductVariantsAttributesSelectedValues } from "@types";
import isEqual from "lodash/isEqual";
import * as React from "react";
import "./scss/index.scss";
export interface ProductDescriptionProps {
  canAddToCart: boolean;
  descriptionJson: string;
  isOnSale: boolean;
  isOutStock: boolean;
  isSmallScreen: boolean;
  items: ICheckoutModelLine[];
  product: ISimpleProduct;
  pricing: ProductDetails_product_pricing;
  productVariants: ProductDetails_product_variants[];
  addToCart(
    variant: ICheckoutModelLineVariantLocalStorage,
    quantity?: number
  ): void;
  removeToCart(varinatId: string): void;
}


const HEADER_HEIGHT = 70;

export const ProductDescription: React.FC<ProductDescriptionProps> = (props) => {


  const { canAddToCart, descriptionJson } = props;
  const { name } = props.product;
  const min = props.pricing.priceRange.start;
  const max = props.pricing.priceRange.stop;
  const product = getOneProductWithQuantity(
    props.product,
    props.items
  );
  const [showBottomDetail, setShowBottomDetail] = React.useState<boolean>(false);
  const [showBottomDetailProductInfo, setShowBottomDetailProductInfo] = React.useState<boolean>(false);
  const [variantPricing, setVariantPricing] = React.useState<ProductDetails_product_variants_pricing | null>(null);

  const addToCartRef = React.useRef<HTMLDivElement>();
  const priceRef = React.useRef<HTMLDivElement>();

  const getProductPrice = () => {
    if (variantPricing) {
      const { canAddToCart, isOnSale } = props;
      if (!isOnSale) {
        return (
          <div className="price">
            <TaxedMoney taxedMoney={variantPricing.price} />
          </div>
        );
      } else {
        return (
          <>
            <div className={getProductPricingClass(canAddToCart, isOnSale)}>
              <TaxedMoney taxedMoney={variantPricing.price} />
            </div>
            <div className="price undiscounted_price">
              <TaxedMoney taxedMoney={variantPricing.priceUndiscounted} />
            </div>
          </>
        );
      }
    }
    if (isEqual(min, max)) {
      return <TaxedMoney taxedMoney={min} />;
    } else {
      return (
        <>
          <TaxedMoney taxedMoney={min} /> - <TaxedMoney taxedMoney={max} />
        </>
      );
    }
  };

  const onVariantPickerChange = (
    _selectedAttributesValues?: IProductVariantsAttributesSelectedValues,
    selectedVariant?: ProductDetails_product_variants
  ) => {
    if (selectedVariant) {
      setVariantPricing(selectedVariant.pricing);
    } else {
      setVariantPricing(null);
    }
  };
  const renderPrice = () => {
    const { isOutStock } = props;

    if (isOutStock) {
      return <div className="product-description__error-message">AGOTADO</div>;
    }

    return getProductPrice();
  };

  const handleScroll = () => {
    const {
      y: addToCartY,
      height: addToCartYHeight,
    } = addToCartRef.current.getBoundingClientRect();

    const {
      y: priceY,
      height: priceHeight,
    } = priceRef.current.getBoundingClientRect();

    const underAddToCart = addToCartY + addToCartYHeight - HEADER_HEIGHT < 0;
    const underPrice = priceY + priceHeight - HEADER_HEIGHT < 0;
    setShowBottomDetail(underAddToCart);
    setShowBottomDetailProductInfo(underPrice);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="product-description">
      <h3>{name}</h3>
      <div ref={priceRef}>{renderPrice()}</div>
      <div className="product-description__quantity" ref={addToCartRef}>
        <ItemsHandler
          canAddToCart={canAddToCart}
          product={product}
          addToCart={props.addToCart}
          removeItemToCart={props.removeToCart}
          subtractItemToCart={props.removeToCart}
        />
      </div>
      <RichTextContent descriptionJson={descriptionJson} />
      <div className="product-description__variant-picker">
        <ProductVariantPicker
          productVariants={props.productVariants}
          onChange={onVariantPickerChange}
          selectSidebar={true}
        />
      </div>
      {(props.isSmallScreen || showBottomDetail) && (
        <ProductBottomDetail
          product={product}
          renderPrice={renderPrice}
          canAddToCart={canAddToCart}
          addToCart={props.addToCart}
          removeItemToCart={props.removeToCart}
          subtractItemToCart={props.removeToCart}
          hideProductDetails={
            props.isSmallScreen &&
            !showBottomDetailProductInfo
          }
        />
      )}
    </div>
  );

}

export default ProductDescription;
