import { useRouter } from 'next/router';
import * as React from 'react';
import * as paths from '../../../../app/routes/paths';
import {
  InnerOverlayContextInterface,
  OverlayContext,
  OverlayContextInterface,
  OverlayTheme,
  OverlayType,
} from './context';

const notificationCloseDelay = 2500;

const Provider: React.FC = (props) => {
  const show = (
    type: OverlayType,
    theme?: OverlayTheme | undefined,
    context?: InnerOverlayContextInterface | undefined
  ) => {
    setState((prevState) => ({ ...prevState, type, theme, context }));
    document.body.style.overflow =
      type !== OverlayType.message && type !== OverlayType.underConstruction
        ? 'hidden'
        : '';
    if (type === OverlayType.message) {
      setTimeout(hide, notificationCloseDelay);
    }
  };

  const hide = () => {
    setState((prevState) => ({ ...prevState, type: undefined }));
    document.body.style.overflow = '';
  };

  const showCatalog = () => {
    if (document.location.pathname !== paths.baseUrl) {
      router.push(paths.baseUrl);
    } else {
      hide();
    }
  };
  const [state, setState] = React.useState<OverlayContextInterface>({
    context: undefined,
    hide,
    show,
    showCatalog,
    theme: undefined,
    type: undefined,
  });
  const router = useRouter();

  return (
    <OverlayContext.Provider value={state}>
      {props.children}
    </OverlayContext.Provider>
  );
};

export default Provider;
