import { useDecision } from "@optimizely/react-sdk";
import { FlagKeys, VariablesKeys, VariationKeys } from "../types";


export const useShowShippingPriceInCart = (): { showShippingPrice: boolean, buttonText: string } => {
    const [decision, clientReady] = useDecision(FlagKeys.SHOW_SHIPPINH_PRICE_IN_CART);
    
    if (!clientReady || !decision.enabled) {
      return {showShippingPrice: false, buttonText: "Comprar"};
    }
    
  return { showShippingPrice: decision.variationKey === VariationKeys.SHOW_SHIPPING_PRICE, buttonText: decision.variables[VariablesKeys.GO_TO_CHECKOUT_TEXT_BUTTON] as string };
  };
  
