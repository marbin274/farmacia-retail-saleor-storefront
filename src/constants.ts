export const apiUrl = process.env.API_URI;
export const sentryDsn = process.env.SENTRY_DSN;
export const gtmId = process.env.GTM_ID;
export const gtmAuth = process.env.GTM_AUTH;
export const gtmPreview = process.env.GTM_PREVIEW;
export const cndUrl = process.env.CDN_URL;
export const environmentName = process.env.ENVIRONMENT_NAME;
export const serviceWorkerTimeout =
  parseInt(process.env.SERVICE_WORKER_TIMEOUT!, 10) || 60 * 1000;
export const mapsApiKey = process.env.MAPS_API_KEY;
