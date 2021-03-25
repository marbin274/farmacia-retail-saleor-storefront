import { RichTextContent } from "@components/atoms";
import { TaxedMoney } from "@components/containers";
import { ProductVariantPicker } from "@components/organisms";
import {
  ProductDetails_product_pricing,
  ProductDetails_product_variants,
  ProductDetails_product_variants_pricing
} from "@sdk/queries/gqlTypes/ProductDetails";
import { ICheckoutModelLine, ICheckoutModelLineVariantLocalStorage } from "@sdk/repository";
import { itemNotificationsService } from "@temp/@next/components/atoms/ItemsNotification";
import {
  getOneProductWithQuantity,
  getProductPricingClass,
} from "@temp/@next/utils/products";
import { IProductVariantsAttributesSelectedValues, ITaxedMoney } from "@types";
import isEqual from "lodash/isEqual";
import * as React from "react";
import "./scss/index.scss";
import { launchAddToCartEvent, launchRemoveToCartEvent } from "@sdk/gaConfig";
import { ISimpleProduct } from "@temp/@next/types/IProduct";
import ItemsHandler from "@temp/@next/components/organisms/ItemsHandler/ItemsHandler";
export interface ProductDescriptionProps {
  canAddToCart: boolean;
  descriptionJson: string;
  isOnSale: boolean;
  items: ICheckoutModelLine[];
  product: ISimpleProduct;
  pricing: ProductDetails_product_pricing;
  productVariants: ProductDetails_product_variants[];
  addToCart(variant: ICheckoutModelLineVariantLocalStorage, quantity?: number): void;
  removeToCart(varinatId: string): void;
  setVariantId(variantId: string): void;
}

interface ProductDescriptionState {
  descriptionJson: string;
  quantity: number;
  variant: string;
  variantStock: number;
  variantPricing: ProductDetails_product_variants_pricing;
  variantPricingRange: {
    min: ITaxedMoney;
    max: ITaxedMoney;
  };
}

class ProductDescription extends React.Component<
  ProductDescriptionProps,
  ProductDescriptionState
  > {
  constructor(props: ProductDescriptionProps) {
    super(props);
    this.state = {
      descriptionJson: "",
      quantity: 1,
      variant: "",
      variantPricing: null,
      variantPricingRange: {
        max: props.pricing.priceRange.stop,
        min: props.pricing.priceRange.start,
      },
      variantStock: null,
    };
  }

  getProductPrice = () => {
    const { variantPricing } = this.state;
    if (variantPricing) {
      const { canAddToCart, isOnSale } = this.props;
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
    const { variantPricingRange } = this.state;
    const { min, max } = variantPricingRange;
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

  onVariantPickerChange = (
    _selectedAttributesValues?: IProductVariantsAttributesSelectedValues,
    selectedVariant?: ProductDetails_product_variants
  ) => {
    if (selectedVariant) {
      this.setState({
        variant: selectedVariant.id,
        variantPricing: selectedVariant.pricing,
        variantStock: selectedVariant.quantityAvailable,
      });
      this.props.setVariantId(selectedVariant.id);
    } else {
      this.setState({ variant: "", variantPricing: null });
      this.props.setVariantId("");
    }
  };

  handleSubmit = () => {
    const { items } = this.props;
    const { variant } = this.state;
    const cartItem = items?.find(item => item.variant.id === variant);
    this.props.addToCart(
      { 
        id: this.state.variant, 
        product: { 
          id: this.props.product.id, 
          name: this.props.product.name,
          pricing: this.props.productVariants[0].pricing,
          quantityAvailable: this.props.productVariants[0].quantityAvailable,
        }, 
      }, 
      this.state.quantity
    );

    itemNotificationsService.sendNotifications(
      { id: this.state.variant, name: this.props.product.name },
      this.state.quantity
    );
    this.setState({ quantity: 1 });
    launchAddToCartEvent(
      cartItem?.variant?.sku,
      cartItem?.name,
      cartItem?.totalPrice?.gross,
      cartItem?.quantity,
      "PEN"
    );
  };

  getAvailableQuantity = () => {
    const { items } = this.props;
    const { variant, variantStock } = this.state;
    const cartItem = items?.find(item => item.variant.id === variant);
    const quantityInCart = cartItem?.quantity || 0;
    return variantStock - quantityInCart;
  };

  handleQuantityChange = (operation: 1 | -1) => {
    const { items } = this.props;
    const { variant } = this.state;
    const cartItem = items?.find(item => item.variant.id === variant);
    this.setState(prevState => ({
      quantity: prevState.quantity + operation,
    }));
    if (operation === 1) {
      launchAddToCartEvent(
        cartItem?.variant?.sku,
        cartItem?.name,
        cartItem?.totalPrice?.gross,
        cartItem?.quantity,
        "PEN"
      );
    } else if (operation === -1) {
      launchRemoveToCartEvent(
        cartItem?.variant?.sku,
        cartItem?.name,
        cartItem?.totalPrice?.gross,
        cartItem?.quantity
      );
    }
  };

  render() {
    const { canAddToCart, descriptionJson } = this.props;
    const { name } = this.props.product;
    const product = getOneProductWithQuantity(
      this.props.product,
      this.props.items
    );
    return (
      <div className="product-description">
        <h3>{name}</h3>
        {!canAddToCart ? (
          <p className="product-description__error-message">AGOTADO</p>
        ) : (
            this.getProductPrice()
          )}
        <RichTextContent descriptionJson={descriptionJson} />
        <div className="product-description__variant-picker">
          <ProductVariantPicker
            productVariants={this.props.productVariants}
            onChange={this.onVariantPickerChange}
            selectSidebar={true}
          />
        </div>
        <div className="product-description__quantity">
          <ItemsHandler
            canAddToCart={canAddToCart}
            product={product}
            addToCart={this.props.addToCart}
            removeItemToCart={this.props.removeToCart}
            substractItemToCart={this.props.removeToCart}
          />
        </div>
      </div>
    );
  }
}

export default ProductDescription;
