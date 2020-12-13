import * as React from 'react';
import * as PropTypes from 'prop-types';

interface BaseProps {}

export type LoadingLineProps = {
  loading: boolean;
} & BaseProps;

export interface LoadingLineState {
  hue: number;
}

class LoadingLine extends React.Component<LoadingLineProps, LoadingLineState> {
  static propTypes = {
    loading: PropTypes.bool,
  };

  static defaultProps = {
    loading: false,
  };
  state = {
    hue: 0,
  };
  timer: any = null;

  componentDidMount() {
    this.startTimer();
  }

  UNSAFE_componentWillReceiveProps(nextProps: LoadingLineProps) {
    if (!nextProps.loading && this.timer) {
      this.clearTimer();
    } else if (!this.timer) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  startTimer = () => {
    this.timer = setInterval(() => {
      if (!this.props.loading) {
        clearInterval(this.timer);
      }
      this.setState((prevState) => {
        return {
          hue: (prevState.hue + 5) % 360,
        };
      });
    }, 100);
  };

  clearTimer = () => {
    clearInterval(this.timer);
  };

  render() {
    const { hue } = this.state;
    return <div className="wx-v2-loading-line" style={{ filter: `hue-rotate(${hue}deg)` }} />;
  }
}

export default LoadingLine;
