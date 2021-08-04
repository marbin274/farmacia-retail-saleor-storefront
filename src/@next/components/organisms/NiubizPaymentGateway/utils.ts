import { IPaymentGatewayConfig } from "@temp/@next/types";
import { GatewayOptions } from "@temp/core/payments/niubiz";
import { IUserDataForNiubiz } from "@temp/@next/components/organisms/CheckoutPayment/types";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { loadScript } from "@sdk/utils";
import { niubizAntifraudScriptUrl } from "@temp/core/constants";
const ip = require("ip");

export const generateNiubizPurchaseNumber = () =>
  Math.floor(Math.random() * (999999999999 - 1)) + 1;

export const getConfigElement = (
  config: IPaymentGatewayConfig[],
  element: string
) => {
  const result = config.find(x => x.field === element)?.value;
  return result;
};

export const getTokenRequirements = (config: IPaymentGatewayConfig[]) => {
  const securityAPI =
    getConfigElement(config, "nb_security_url") ||
    "https://apitestenv.vnforapps.com/api.security/v1/security";

  const gatewayUser =
    getConfigElement(config, "merchant_username") ||
    "integraciones.visanet@necomplus.com";

  const gatewayPassword =
    getConfigElement(config, "merchant_password") || "d5e7nk$M";

  const tokenRequirements: GatewayOptions = {
    endpoint: securityAPI,
    password: gatewayPassword,
    user: gatewayUser,
  };

  return tokenRequirements;
};

export const getSessionRequirements = (
  config: IPaymentGatewayConfig[],
  token: string,
  amount: any,
  user?: IUserDataForNiubiz | undefined,
  channel?: "web" | "paycard"
) => {
  const merchantId = getConfigElement(config, "merchant_id") || "342062522";

  const sessionAPI =
    getConfigElement(config, "nb_session_url") ||
    "https://apitestenv.vnforapps.com/api.ecommerce/v2/ecommerce/token/session";

  const url = sessionAPI + merchantId;
  const total = amount;

  const sessionRequirements: GatewayOptions = {
    amount: total,
    antifraud: {
      clientIp: ip.address(),
      merchantDefineData: {
        4: user?.email,
        21: 0,
        32: user?.documentNumber,
        75: "Invitado",
        77: 0,
      },
    },
    channel,
    endpoint: url,
    securityToken: token,
  };

  return sessionRequirements;
};

export const getTokenizerRequirements = (
  config: IPaymentGatewayConfig[],
  sessionKey: string,
  amount: any
) => {
  // @ts-ignore
  const payform = window?.payform;
  const merchantId = getConfigElement(config, "merchant_id") || "342062522";

  const tokenizerRequirements: GatewayOptions = {
    amount,
    merchantId,
    payform,
    sessionKey,
  };

  return tokenizerRequirements;
};

export const getCardTokenizationRequirements = (
  config: IPaymentGatewayConfig[],
  transactionToken: string,
  token: string
) => {
  const endpoint = getConfigElement(config, "nb_tokenization_url");
  const merchantId = getConfigElement(config, "merchant_id");

  const url = `${endpoint}${merchantId}/${transactionToken}`;

  const tokenizerRequirements: GatewayOptions = {
    securityToken: token,
    endpoint: url,
  };

  return tokenizerRequirements;
};

export const loadNiubizAntiFraudScript = (callback?: () => void) => {
  const scriptId = "niubiz-antifraud";

  if (document.getElementById(scriptId)) {
    callback?.();
    return;
  }

  loadScript(scriptId, niubizAntifraudScriptUrl, callback);
};

export const initNiubizAntiFraud = (
  config: IPaymentGatewayConfig[],
  purchaseNumber: string
) => {
  const merchantId = getConfigElement(config, "merchant_id");
  const uuid = uuidv4();

  // @ts-ignore
  window.initDFP?.(uuid, purchaseNumber, ip.address(), merchantId);

  return uuid;
};
