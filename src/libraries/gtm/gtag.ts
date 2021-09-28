export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GTM_ID

declare global {
  interface Window {
    dataLayer: any;
    gtag:any;
  }
}