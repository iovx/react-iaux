import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import Portal from './Portal';
import { svgClose } from './assets';
import AuthWrapper from '../authWrapper/AuthWrapper';
import Draggable from 'react-draggable';
import omit from 'omit.js';


export type DialogProps = {
  onClose?: () => void;
  mask?: boolean;
  visible: boolean;
  footer?: React.ReactNode;
  header?: React.ReactNode;
  title?: React.ReactNode;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  footerStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  maskStyle?: React.CSSProperties;
  maskClassName?: string;
  className?: string;
  width?: number;
  draggable?: boolean;
} & React.HTMLAttributes<HTMLDivElement>

class Dialog extends React.Component<DialogProps, any> {

  static Portal: typeof Portal;

  static propTypes = {
    onClose: PropTypes.func,
  };
  static defaultProps = {
    width: 600,
    draggable: false,
  };

  constructor(props: DialogProps) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  }

  renderDragContainer(content: React.ReactNode) {
    const { width } = this.props;
    return (
      <Draggable
        axis="both"
        bounds="body"
        handle='.wx-v2-dialog-header'
        defaultPosition={{ x: -(width || 600) / 2, y: 70 }}
        grid={[25, 25]}
        scale={1}
        defaultClassName='wx-v2-dialog'
      >
        {content}
      </Draggable>
    );
  }

  renderPanel() {
    const { children, footer, header, width, title, headerStyle, bodyStyle, footerStyle, style, headerClassName, bodyClassName, footerClassName, className, ...restProps } = this.props;
    const wrapperCls = cx('wx-v2-dialog', className);
    const headerClass = cx('wx-v2-dialog-header', headerClassName);
    const bodyClass = cx('wx-v2-dialog-body', bodyClassName);
    const footerClass = cx('wx-v2-dialog-footer', footerClassName);
    const wrapperStyle = {
      ...style,
      width,
    };
    return (
      <div className={wrapperCls} style={wrapperStyle} {...omit(restProps, [
        'draggable',
        'visible',
        'mask',
        'maskStyle',
        'maskClassName',
        'onClose',
      ])}>
        <AuthWrapper access={!!(header || title)}>
          <div className={headerClass} style={headerStyle}>
            <div className='wx-v2-dialog-title'>{header || title}</div>
            <div className='wx-v2-dialog-close-btn' onClick={this.onClose}
                 dangerouslySetInnerHTML={{ __html: svgClose }} />
          </div>
        </AuthWrapper>
        <div className={bodyClass} style={bodyStyle}>
          {children}
        </div>
        <AuthWrapper access={!!(footer)}>
          <div className={footerClass} style={footerStyle}>
            {footer}
          </div>
        </AuthWrapper>
      </div>
    );
  }

  render() {
    const { visible, mask, draggable, title, header, maskStyle, maskClassName } = this.props;
    const maskCls = cx('wx-v2-dialog-mask', maskClassName);
    return (
      <Portal visible={visible}>
        {draggable && (header || title) ? this.renderDragContainer(this.renderPanel()) : this.renderPanel()}
        <Portal visible={mask}>
          <div className={maskCls} style={maskStyle} />
        </Portal>
      </Portal>
    );
  }
}


export default Dialog;
