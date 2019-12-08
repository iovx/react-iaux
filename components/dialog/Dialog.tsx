import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import Portal from './Portal';
import { svgClose } from './assets';
import AuthWrapper from '../authWrapper/AuthWrapper';

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
  headerCls?: string;
  bodyCls?: string;
  footerCls?: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>

class Dialog extends React.Component<DialogProps, any> {

  static Portal: typeof Portal;

  static propTypes = {
    onClose: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  }

  render() {
    const { visible, mask, children, footer, header, title, headerStyle, bodyStyle, footerStyle, style, headerCls, bodyCls, footerCls, className, ...restProps } = this.props;
    const wrapperCls = cx('wx-v2-dialog', className);
    const headerClass = cx('wx-v2-dialog-header', headerCls);
    const bodyClass = cx('wx-v2-dialog-body', bodyCls);
    const footerClass = cx('wx-v2-dialog-footer', footerCls);
    return (
      <Portal visible={visible}>
        <div className={wrapperCls} style={style} {...restProps}>
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
        <Portal visible={mask}>
          <div className='wx-v2-dialog-mask' />
        </Portal>
      </Portal>
    );
  }
}


export default Dialog;
