import { RichTextContent } from "@components/atoms";
import { TaxedMoney } from "@components/containers";
import { ProductVariantPicker } from "@components/organisms";
import {
  ProductDetails_product_pricing,
  ProductDetails_product_variants,
  ProductDetails_product_variants_pricing,
} from "@sdk/queries/gqlTypes/ProductDetails";
import { ICheckoutModelLine } from "@sdk/repository";
import { itemNotificationsService } from "@temp/@next/components/atoms/ItemsNotification";
import { getProductPricingClass } from "@temp/@next/utils/products";
import { IProductVariantsAttributesSelectedValues, ITaxedMoney } from "@types";
import isEqual from "lodash/isEqual";
import * as React from "react";
import AddToCart from "./AddToCart";
import { QuantityTextField } from "./QuantityTextField";
import "./scss/index.scss";

export interface ProductDescriptionProps {
  canAddToCart: boolean;
  descriptionJson: string;
  isOnSale: boolean;
  items: ICheckoutModelLine[];
  productId: string;
  productVariants: ProductDetails_product_variants[];
  name: string;
  pricing: ProductDetails_product_pricing;
  addToCart(varinatId: string, quantity?: number): void;
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
    this.props.addToCart(this.state.variant, this.state.quantity);

    itemNotificationsService.sendNotifications(
      { id: this.state.variant, name: this.props.name },
      this.state.quantity
    );
    this.setState({ quantity: 1 });
  };

  getAvailableQuantity = () => {
    const { items } = this.props;
    const { variant, variantStock } = this.state;

    const cartItem = items?.find(item => item.variant.id === variant);
    const quantityInCart = cartItem?.quantity || 0;
    return variantStock - quantityInCart;
  };

  handleQuantityChange = (operation: 1 | -1) => {
    this.setState(prevState => ({
      quantity: prevState.quantity + operation,
    }));
  };

  render() {
    const { name, canAddToCart, descriptionJson } = this.props;
    const { quantity } = this.state;

    const availableQuantity = this.getAvailableQuantity();

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
          <QuantityTextField
            quantity={quantity}
            maxQuantity={availableQuantity}
            onQuantityChange={this.handleQuantityChange}
            disableButtons={!canAddToCart}
          />
          <AddToCart onSubmit={this.handleSubmit} disabled={!canAddToCart} />
        </div>
      </div>
    );
  }
}

export default ProductDescription;
