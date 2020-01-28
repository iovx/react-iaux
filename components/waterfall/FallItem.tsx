import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

export type DataItem = {
  originWidth?: number;
  originHeight?: number;
  width: number;
  height: number;
  url: string;
  top: number;
  left: number;
  title: string;
  description: string;
  [index: string]: any;
}

interface BaseProps {
  onError?: (e: object) => void;
  onLoad?: (url: string, e: object) => void;
  errorUrl?: string;
  url: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  holder?: React.ReactNode;
  className?: string;
  contentCls?: string;
  contentStyle?: React.CSSProperties;
  content?: React.ReactNode;
  data?: DataItem;
}

export type FallItemProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;


class FallItem extends React.Component<FallItemProps, any> {
  static propTypes = {
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    className: PropTypes.string,
    title: PropTypes.node,
    errorUrl: PropTypes.string,
    description: PropTypes.node,
    content: PropTypes.node,
    holder: PropTypes.node,
  };
  state = {
    error: false,
    loaded: false,
  };
  onError = () => {
    const { onError } = this.props;
    this.setState({ error: true, loaded: true });
    if (onError) {
      onError(this);
    }
  };
  onLoad = (url: string, e: object) => {
    const { onLoad } = this.props;
    this.setState({ loaded: true });
    if (onLoad) {
      onLoad(url, e);
    }
  };

  render() {
    const { error, loaded } = this.state;
    const { children, errorUrl, url, width, height, style, holder, className, contentCls, contentStyle, data, content, ...extraProps } = this.props;
    const wrapperStyle = {
      ...style,
      width,
      height,
    };
    const clsName = cx('wx-v2-waterfall-item', className);
    const contentName = cx('wx-v2-waterfall-content', contentCls);
    return (
      <div className={clsName} style={wrapperStyle} {...extraProps}>
        <div className="wx-v2-waterfall-img">
          {!error ? <img width="100%" src={url} onError={this.onError} onLoad={(e) => this.onLoad(url, e)} /> :
            <img width="100%" src={errorUrl} />}
        </div>
        {holder && !loaded ? <div className='wx-v2-waterfall-holder'>{holder}</div> : null}
        {children ? <div className={contentName} style={contentStyle}>{this.props.children}</div> : null}
      </div>
    );
  }
}


export default FallItem;
