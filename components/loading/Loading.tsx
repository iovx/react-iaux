import * as React from 'react';
import * as PropTypes from 'prop-types';
import LoadingIcon from "./LoadingIcon";

export interface LoadingProps {
  text?: string;
  loading?: boolean;
  style?: React.CSSProperties;
  mask?: boolean;
}

class Loading extends React.Component<LoadingProps, any> {
  static defaultProps = {
    text: '加载中....',
    loading: true,
    mask: true,
  }
  static propTypes = {
    text: PropTypes.node,
    loading: PropTypes.bool,
    mask: PropTypes.bool,
  }
  private loadingWrapper: HTMLDivElement | null;

  componentDidMount() {
    if (this.loadingWrapper !== null) {
      const parent = this.loadingWrapper.parentElement;
      if (parent && !parent.style.position) {
        parent.style.position = 'relative';
      }
    }
  }

  render() {
    const {text, loading, style, mask, ...extraProps} = this.props;
    const wrapperStyle: any = {
      ...style,
    }
    if (!loading) {
      wrapperStyle.display = 'none';
    }
    if (!mask) {
      wrapperStyle.width = 78;
      wrapperStyle.height = 70;
    } else {
      wrapperStyle.width = '100%';
      wrapperStyle.height = '100%';
      wrapperStyle.top = 0;
      wrapperStyle.left = 0;
    }
    return (
      <div
        className='wx-v2-loading-wrapper'
        style={wrapperStyle}
        ref={ref => {
          this.loadingWrapper = ref
        }}
      >
        <div
          {...extraProps}
          className='wx-v2-loading'
        >
          <div className='wx-v2-loading-icon'>
            <LoadingIcon/>
          </div>
          <div className='wx-v2-loading-text'>{text}</div>
        </div>
      </div>
    );
  }
}


export default Loading;
