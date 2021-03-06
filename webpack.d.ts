declare module '*.jpg';
declare module '*.png';
declare module '*.svg' {
  const content: any;
  export default content;
}

declare module 'draftjs-to-html';
declare module 'react-media';
declare module 'js-base64';
declare module 'query-string';
declare module '@farmatheme';
declare module 'intersection-observer';
// This was copied from src/@sdk/global.d.ts to make TS compiler happy
declare interface Window {
  PasswordCredential: any;

  Cypress?: any;
}

declare interface Navigator {
  credentials: any;
}
