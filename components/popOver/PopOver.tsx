import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import Popup from '../popup/Popup';
import { getOffset, getRestBounds } from '../utils/dom';


interface BaseProps {

}

export type ITipPos = 'tl' | 'tr' | 'bl' | 'br' | 'lt' | 'lb' | 'rt' | 'rb';
export type PopOverProps = {
  style?: React.CSSProperties;
  className?: string;
  contentClassName?: string;
  wrapperClassName?: string;
  content: React.ReactNode;
  dir?: ITipPos;
  trigger?: 'click' | 'hover';
} & BaseProps;

export interface PopOverState {
  isMouseIn: boolean;
  isInPop: boolean;
  top: number;
  left: number;
  dir: ITipPos;
}

class PopOver extends React.Component<PopOverProps, PopOverState> {
  static propTypes = {
    title: PropTypes.string,
  };
  static defaultProps = {
    trigger: 'click',
  };
  wrappedEleRef = React.createRef<HTMLDivElement>();
  popupEleRef = React.createRef<Popup>();
  timer: any;
  top: number = -1000;
  left: number = -1000;
  state = {
    isMouseIn: false,
    isInPop: false,
    top: -100,
    left: -100,
    dir: 'lb' as ITipPos,
  };

  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.init();
      window.addEventListener('resize', this.handleResize);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize);
    }
  }

  init() {
    if (!this.wrappedEleRef.current) {
      return;
    }
    const { top, left } = getOffset(this.wrappedEleRef.current);
    this.top = top;
    this.left = left;
    this.setState({
      dir: !('dir' in this.props) ? this.getProperDir() : (this.props.dir || 'bl'),
    });
  }

  handleResize = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.init();
    }, 100);
  };

  getOffset() {
    const { dir } = this.state;
    if (!this.popupEleRef.current) {
      return {
        left: 0,
        top: 0,
      };
    }
    const popStyle = getComputedStyle(this.popupEleRef.current!.getPopupEle() as HTMLDivElement);
    const popHeight = popStyle.height;
    const popWidth = popStyle.width;
    if (!this.wrappedEleRef.current) {
      return {
        left: 0,
        top: 0,
      };
    }
    const style = getComputedStyle(this.wrappedEleRef.current);
    const w = style.width;
    const h = style.height;
    let { top, left } = getOffset(this.wrappedEleRef.current);
    this.left = left;
    this.top = top;
    const padding = 10;
    switch (dir) {
      case 'tl':
      case 'tr':
        top = this.top + parseInt(h || '0') + padding;
        break;
      case 'bl':
      case 'br':
        top = this.top - parseInt(popHeight || '0') - padding;
        break;
      case 'lt':
      case 'lb':
        left = this.left + parseInt(w || '0') + padding;
        break;
      case 'rt':
      case 'rb':
        left = this.left - parseInt(popWidth || '0') - padding;
        break;
    }
    return {
      left,
      top,
    };
  }

  getProperDir() {
    const { left, top, bottom, right } = getRestBounds(this.wrappedEleRef.current as HTMLDivElement);
    const arr = [top, right, bottom, left];
    let index = 0;
    let start = top;
    arr.forEach((item, i) => {
      if (item > start) {
        start = item;
        index = i;
      }
    });
    if (index === 0) {
      return right > left ? 'bl' : 'br';
    }
    if (index === 1) {
      return top > bottom ? 'lb' : 'lt';
    }
    if (index === 2) {
      return right > left ? 'tr' : 'tl';
    }
    if (index === 3) {
      return top > bottom ? 'rb' : 'rt';
    }
    return 'bl';
  }

  show() {
    this.setState({ isMouseIn: true }, () => {
      const { left, top } = this.getOffset();
      this.setState(() => ({
        top,
        left,
      }));
    });
  }

  handleClick = () => {
    const { isMouseIn } = this.state;
    const { trigger } = this.props;
    if (trigger === 'click') {
      if (!isMouseIn) {
        this.show();
      } else {
        this.setState({ isMouseIn: false });
      }
    }
  };
  handleMouseEnter = () => {
    const { trigger } = this.props;
    if (trigger === 'hover') {
      this.show();
    }
  };
  handleMouseLeave = () => {
    this.setState({ isMouseIn: false });
  };

  handlePopMouseEnter = () => {
    this.setState({ isInPop: true });
  };
  handlePopMouseLeave = () => {
    this.setState({ isInPop: false });
  };

  render() {
    const { content, children, className, wrapperClassName, contentClassName, style } = this.props;
    const { isMouseIn, top, left, isInPop, dir } = this.state;
    const wrapperCls = cx('wx-v2-popover-wrapper', className);
    const popoverCls = cx('wx-v2-popover', 'wx-v2-popover-' + dir, wrapperClassName);
    const contentCls = cx('wx-v2-popover-content', contentClassName);
    return (
      <React.Fragment>
        <Popup
          className={popoverCls}
          show={isMouseIn || isInPop}
          top={top}
          left={left}
          ref={this.popupEleRef}
          onMouseEnter={this.handlePopMouseEnter}
          onMouseLeave={this.handlePopMouseLeave}
        >
          <span className={contentCls}>
            {content}
          </span>
        </Popup>
        <div
          style={style}
          className={wrapperCls}
          ref={this.wrappedEleRef}
          onMouseEnter={this.handleMouseEnter}
          onClick={this.handleClick}
          onMouseLeave={this.handleMouseLeave}
        >
          {children}
        </div>
      </React.Fragment>
    );
  }
}

export default PopOver;
