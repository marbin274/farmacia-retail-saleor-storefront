export const apiUrl = process.env.NEXT_PUBLIC_API_URI;
export const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
export const gtmAuth = process.env.NEXT_PUBLIC_GTM_AUTH;
export const gtmPreview = process.env.NEXT_PUBLIC_GTM_PREVIEW;
export const cndUrl = process.env.NEXT_PUBLIC_CDN_URL;
export const environmentName = process.env.NEXT_PUBLIC_ENVIRONMENT_NAME;
export const serviceWorkerTimeout =
  parseInt(process.env.SERVICE_WORKER_TIMEOUT!, 10) || 60 * 1000;
export const mapsApiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;
export const merchantPassword = process.env.NEXT_PUBLIC_MERCHANT_PASSWORD;
export const merchantUsername = process.env.NEXT_PUBLIC_MERCHANT_USERNAME;
export const merchantId = process.env.NEXT_PUBLIC_MERCHANT_ID;
export const optimizelySdkKey = process.env.NEXT_PUBLIC_OPTIMIZELY_SDK_KEY;
export const primeApiUrl = process.env.NEXT_PUBLIC_PRIME_API_URL;
export const primeApiKey = process.env.NEXT_PUBLIC_PRIME_API_KEY;
export const primeSku = process.env.NEXT_PUBLIC_PRIME_SKU || '';
export const niubizAntifraudScriptUrl =
  process.env.NEXT_PUBLIC_NIUBIZ_ANTIFRAUD_SCRIPT_URL || '';
export const dynatraceUrl = process.env.NEXT_PUBLIC_DYNATRACE_URL;
