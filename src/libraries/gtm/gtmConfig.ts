import { launchSetLocation } from '@temp/@sdk/gaConfig';
import {
  environmentName,
  gtmAuth,
  gtmId,
  gtmPreview,
} from '@temp/core/constants';
import TagManager from 'react-gtm-module';

export const setTagManager = () => {
  switch (environmentName) {
    case 'qa':
      if (gtmId && gtmAuth && gtmPreview) {
        const tagManagerArgs = {
          auth: gtmAuth,
          gtmId,
          preview: gtmPreview,
        };
        launchSetLocation(window?.location?.href);
        TagManager.initialize(tagManagerArgs);
      }
      break;
    case 'prod':
      if (gtmId) {
        const tagManagerArgs = {
          gtmId,
        };
        launchSetLocation(window?.location?.href);
        TagManager.initialize(tagManagerArgs);
      }
      break;
    default:
      break;
  }
};
