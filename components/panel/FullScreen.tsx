import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import Svg from '../svg';

interface BaseProps {
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  header?: React.ReactNode;
  closeClassName?: string;
  closeStyle?: React.CSSProperties;
  showCloseBtn?: boolean;
}

export type FullScreenProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;

export function supportFullScreen() {
  return typeof document !== 'undefined' && document.body.requestFullscreen;
}

class FullScreen extends React.Component<FullScreenProps, any> {
  static propTypes = {
    className: PropTypes.string,
  };
  static defaultProps = {
    header: 'Full',
    showCloseBtn: false,
  };
  state = {
    fulled: false,
    hideClose: true,
  };
  fullWrapperRef: React.RefObject<HTMLDivElement> = React.createRef();

  componentDidMount() {
    if (supportFullScreen()) {
      document.addEventListener('fullscreenchange', this.handleFullScreenChange);
    }
  }

  componentWillUnmount() {
    if (supportFullScreen()) {
      document.removeEventListener('fullscreenchange', this.handleFullScreenChange);
    }
  }

  handleFullScreenChange = () => {
    if (document.fullscreen) {
      this.setState({ fulled: true });
    } else {
      this.setState({ fulled: false });
    }
  };

  handleFullScreen = () => {
    const ele = this.fullWrapperRef.current as any;
    if (!this.state.fulled && supportFullScreen() && ele) {
      const rfs = ele.requestFullScreen || ele.webkitRequestFullScreen || ele.mozRequestFullScreen || ele.msRequestFullScreen;
      if (rfs) {
        rfs.call(ele);
      }
    }
  };
  handleClick = () => {
    if (this.state.fulled && typeof document !== 'undefined' && document.body.requestFullscreen) {
      const ele = document as any;
      const cfs = ele.cancelFullScreen || ele.webkitCancelFullScreen || ele.mozCancelFullScreen || ele.exitFullScreen;
      if (cfs) {
        cfs.call(ele);
      }
    }
  };

  handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { fulled } = this.state;
    if (!fulled) {
      return;
    }
    if (e.screenY < 70) {
      this.setState({ hideClose: false });
    } else {
      this.setState({ hideClose: true });
    }
  };

  render() {
    const { fulled, hideClose } = this.state;
    const { className, headerClassName, onMouseMove, showCloseBtn, bodyClassName, closeStyle, closeClassName, header, children, headerStyle, bodyStyle, ...extraProps } = this.props;
    const wrapperCls = cx('wx-v2-wrapper-full', className);
    const headerCls = cx('wx-v2-wrapper-full-header', headerClassName);
    const bodyCls = cx('wx-v2-wrapper-full-body', bodyClassName);
    const closeCls = cx('wx-v2-wrapper-full-close', {
      'wx-v2-wrapper-full-close-hide': !fulled || hideClose,
    }, closeClassName);
    return (
      <div className={wrapperCls} onMouseMove={this.handleMouseMove} {...extraProps}>
        <div onClick={this.handleFullScreen} className={headerCls} style={headerStyle}>
          {header}
        </div>
        <div className={bodyCls} style={bodyStyle} ref={this.fullWrapperRef}>
          {
            showCloseBtn && (
              <div className={closeCls} style={closeStyle} onClick={this.handleClick}>
                <Svg type='close' />
              </div>
            )
          }
          {children}
        </div>
      </div>
    );
  }
}

export default FullScreen;
