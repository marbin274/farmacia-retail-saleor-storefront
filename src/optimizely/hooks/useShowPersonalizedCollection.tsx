import { useDecision } from "@optimizely/react-sdk";
import { FlagKeys } from "../types";

export const useShowPersonalizedCollection = (): { enable:boolean, variationKey:string } => {
    const [decision, clientReady] = useDecision(FlagKeys.SHOW_PERSONALIZED_COLLECTION);
    if (!clientReady || !decision.enabled) {
        return {enable: false, variationKey: ''};
    }
    return {enable:true, variationKey: decision.variationKey};
  };
  