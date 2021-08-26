import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  InnerOverlayContextInterface,
  OverlayContext,
  OverlayContextInterface,
  OverlayTheme,
  OverlayType,
} from './context';

import * as paths from '../../../../app/routes/paths';

interface IProps
  extends Readonly<RouteComponentProps>,
    Readonly<{ children?: React.ReactNode }> {}

class Provider extends React.Component<
  RouteComponentProps<{}>,
  OverlayContextInterface
> {
  notificationCloseDelay = 2500;
  constructor(props: IProps) {
    super(props);
    this.state = {
      context: undefined,
      hide: this.hide,
      show: this.show,
      showCatalog: this.showCatalog,
      theme: undefined,
      type: undefined,
    };
  }

  componentDidUpdate(prevProps: IProps) {
    if (
      this.props.location.pathname !== prevProps.location.pathname &&
      this.state.type !== OverlayType.message
    ) {
      this.hide();
    }
  }

  show = (
    type: OverlayType,
    theme?: OverlayTheme | undefined,
    context?: InnerOverlayContextInterface | undefined
  ) => {
    this.setState({ type, theme, context });
    document.body.style.overflow =
      type !== OverlayType.message && type !== OverlayType.underConstruction
        ? 'hidden'
        : '';
    if (type === OverlayType.message) {
      setTimeout(this.hide, this.notificationCloseDelay);
    }
  };

  hide = () => {
    this.setState({ type: undefined });
    document.body.style.overflow = '';
  };

  showCatalog = () => {
    if (document.location.pathname !== paths.baseUrl) {
      this.props.history.push(paths.baseUrl);
    } else {
      this.hide();
    }
  };

  render() {
    return (
      <OverlayContext.Provider value={this.state}>
        {this.props.children}
      </OverlayContext.Provider>
    );
  }
}

export default withRouter(Provider);
