import { useContext } from 'react';
import { FEATURE_PLUGINS } from '@temp/core/config';
import { FeaturePluginsContext } from '@contexts';

/**
 * Return feature plugins status
 */
export const useFeaturePlugins = () => {
  const { plugins } = useContext(FeaturePluginsContext);

  const isPluginActive = (id: string) => {
    const plugin = plugins?.find((p) => p.id === id);

    if (plugin?.active) {
      return true;
    }

    return false;
  };

  return {
    lastMileActive: isPluginActive(FEATURE_PLUGINS.lastMile),
  };
};
