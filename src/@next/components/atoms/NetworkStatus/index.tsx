import * as React from 'react';

interface NetworkStatusProps {
  children: (online: boolean) => React.ReactNode;
  cb?: (isOnline: boolean) => void;
}

interface NetworkStatusState {
  online: boolean;
}

class NetworkStatus extends React.Component<
  NetworkStatusProps,
  NetworkStatusState
> {
  constructor(props) {
    super(props);
    this.state = {
      online:
        typeof navigator !== 'undefined' && 'onLine' in navigator
          ? navigator.onLine
          : false,
    };
  }

  updateOnlineStatus = () => {
    if (this.props.cb) {
      this.props.cb(navigator.onLine);
    }
    this.setState({ online: navigator.onLine });
  };

  componentDidMount() {
    addEventListener('offline', this.updateOnlineStatus);
    addEventListener('online', this.updateOnlineStatus);
    this.updateOnlineStatus();
  }

  componentWillUnmount() {
    removeEventListener('offline', this.updateOnlineStatus);
    removeEventListener('online', this.updateOnlineStatus);
  }

  render() {
    return this.props.children(this.state.online);
  }
}

export default NetworkStatus;
