import { createInstance, setLogger } from '@optimizely/react-sdk';
import { nanoid } from 'nanoid';
import { optimizelySdkKey } from '@temp/core/constants';
import { LocalRepository } from '@temp/@sdk/repository';

setLogger(null);

export const optimizelyClient = createInstance({
  sdkKey: optimizelySdkKey,
});

export const getOptimizelyUserId = () => {
  const localRepository = new LocalRepository();
  let userId = localRepository.getUserId();
  if (userId) {
    return userId;
  }

  userId = nanoid();
  localRepository.setUserId(userId);

  return userId;
};
