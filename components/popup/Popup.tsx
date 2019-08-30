import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import Portal from '../portal/Portal';

export interface BaseProps extends IPos {
  show?: boolean;
  className?: string;
  style?: React.CSSProperties;
  closable?: boolean;

  onClose?(): void;
}

export type PopupProps = {} & BaseProps;

interface IPos {
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
}

export interface PopupState extends IPos {

}

function getPositionStyle(pos: IPos) {
  const { top, left, right, bottom } = pos;
  const posStyle: PopupState = {};
  if (bottom) {
    posStyle.bottom = bottom + 'px';
    posStyle.right = 'auto';
  }
  if (right) {
    posStyle.right = right + 'px';
    posStyle.left = 'auto';
  }
  if (top) {
    posStyle.top = top + 'px';
    posStyle.bottom = 'auto';
  }
  if (left) {
    posStyle.left = left + 'px';
    posStyle.right = 'auto';
  }
  return posStyle;
}

class Popup extends React.PureComponent<PopupProps, PopupState> {
  static propTypes = {
    top: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    show: PropTypes.bool,
  };
  static defaultProps = {
    show: false,
  };

  constructor(props: PopupProps) {
    super(props);
    this.state = {};
  }

  getPrefixCls(suffix?: string) {
    return `wx-v2-popup${suffix ? '-' + suffix : ''}`;
  }

  handleClose() {
    const { onClose, closable } = this.props;
    if (closable && onClose) {
      if (onClose) {
        onClose();
      }
    }
  }

  render() {
    const { show, className, children, style: pStyle } = this.props;
    const style = {
      ...pStyle,
      ...getPositionStyle(this.props),
    };
    const cls = cx(this.getPrefixCls(), { [this.getPrefixCls('hide')]: !show }, className);
    return (
      <Portal>
        <div className={cls} style={style}>
          {children}
        </div>
      </Portal>
    );
  }
}

export default Popup;
