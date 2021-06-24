import { useDecision } from "@optimizely/react-sdk";
import { FlagKeys, VariablesKeys } from "../types";


export const useAddToCartButtonVariable = (): string => {
    const [decision, clientReady] = useDecision(FlagKeys.ADD_TO_CART_BUTTON);
  
    if (!clientReady) {
      return "";
    }
  
    if (!decision.enabled) {
      return "Agregar";
    }
    return decision.variables[VariablesKeys.TEXT] as string;
  };

