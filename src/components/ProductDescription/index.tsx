import "./scss/index.scss";
import isEqual from "lodash/isEqual";
import * as React from "react";
import { RichTextContent } from "@components/atoms";
import { ProductVariantPicker } from "@components/organisms";
import {
  ProductDetails_product_pricing,
  ProductDetails_product_variants,
  ProductDetails_product_variants_pricing,
} from "@sdk/queries/gqlTypes/ProductDetails";
import { IProductVariantsAttributesSelectedValues, ITaxedMoney } from "@types";
import { ICheckoutModelLine } from "@sdk/repository";
import { TaxedMoney } from "@components/containers";
import AddToCart from "./AddToCart";
import { QuantityTextField } from "./QuantityTextField";

export interface ProductDescriptionProps {
  canAddToCart: boolean;
  descriptionJson: string;
  productId: string;
  productVariants: ProductDetails_product_variants[];
  name: string;
  pricing: ProductDetails_product_pricing;
  items: ICheckoutModelLine[];
  addToCart(varinatId: string, quantity?: number): void;
  setVariantId(variantId: string);
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
    const { variantPricingRange, variantPricing } = this.state;

    const { min, max } = variantPricingRange;
    if (variantPricing) {
      if (isEqual(variantPricing.priceUndiscounted, variantPricing.price)) {
        return <TaxedMoney taxedMoney={variantPricing.price} />;
      } else {
        return (
          <>
            <span className="product-description__undiscounted_price">
              <TaxedMoney taxedMoney={variantPricing.priceUndiscounted} />
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <TaxedMoney taxedMoney={variantPricing.price} />
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
    this.setState({ quantity: 1 });
  };

  getAvailableQuantity = () => {
    const { items } = this.props;
    const { variant, variantStock } = this.state;

    const cartItem = items?.find((item) => item.variant.id === variant);
    const quantityInCart = cartItem?.quantity || 0;
    return variantStock - quantityInCart;
  };

  handleQuantityChange = (operation: 1 | -1) => {
    this.setState((prevState) => ({
      quantity: prevState.quantity + operation,
    }));
  };

  render() {
    const { name, descriptionJson } = this.props;
    const { quantity } = this.state;

    const availableQuantity = this.getAvailableQuantity();
    const canAddToCart = this.props.canAddToCart;
    return (
      <div className="product-description">
        <h3>{name}</h3>
        {!canAddToCart ? (
          <p className="product-description__error-message">AGOTADO</p>
        ) : (
            <p className="product-description__price">{this.getProductPrice()}</p>
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
          <AddToCart
            onSubmit={this.handleSubmit}
            disabled={!canAddToCart}
          />
        </div>
      </div>
    );
  }
}

export default ProductDescription;
