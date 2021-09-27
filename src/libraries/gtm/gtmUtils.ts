declare global {
  interface Window {
    dataLayer: any;
  }
}

export const GTMPageView = (url: string) => {
  interface PageEventProps {
    event: string;
    page: string;
  }

  const pageEvent: PageEventProps = {
    event: 'pageview',
    page: url,
  };

  window?.dataLayer?.push(pageEvent);
  return pageEvent;
};
