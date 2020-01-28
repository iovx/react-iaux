import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import SvgInfo from './assets';

export interface BaseProps {
  className?: string;
  closable?: boolean;
  type?: 'success' | 'info' | 'warning' | 'error',
  closeText?: React.ReactNode;

  onClose?(): boolean | Promise<boolean>;
}

export type AlertProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;

const iconTypes = {
  info: SvgInfo.svgInfo,
  success: SvgInfo.svgSuccess,
  warning: SvgInfo.svgWarning,
  error: SvgInfo.svgError,
};

export interface AlertState {
  closed: boolean;
}

class Alert extends React.PureComponent<AlertProps, AlertState> {
  static propTypes = {
    type: PropTypes.string,
    closable: PropTypes.bool,
    onClose: PropTypes.func,
  };
  static defaultProps = {
    type: 'info',
    closable: false,
  };
  private transitionTime: number = 3000;

  constructor(props: AlertProps) {
    super(props);
    this.state = {
      closed: false,
    };
    this.handleClose = this.handleClose.bind(this);
  }

  getPrefixCls(suffix?: string) {
    return `wx-v2-alert${suffix ? '-' + suffix : ''}`;
  }

  close() {
    this.setState({closed: true});
  }

  handleClose() {
    const {onClose, closable} = this.props;
    if (closable && onClose) {
      const result = onClose();
      if (result instanceof Promise) {
        result.then(res => {
          if (res) {
            this.close();
          }
        });
      } else if (result !== false) {
        this.close();
      }
    } else {
      this.close();
    }
  }

  renderAlert() {
    const {children, className, type = 'info', closeText, closable, onClose, ...extraProps} = this.props;
    const alertCls = cx(this.getPrefixCls(), this.getPrefixCls(type), className);
    const svgHtml = iconTypes[type] || iconTypes['info'];
    let canClose = closable || closeText;
    let closeInner = !closeText ? (
      <span className={this.getPrefixCls('close')} onClick={this.handleClose}
            dangerouslySetInnerHTML={{__html: SvgInfo.svgClose}}/>
    ) : <span className={this.getPrefixCls('close')} onClick={this.handleClose}>{closeText}</span>;
    return (
      <div className={alertCls} {...extraProps}>
        <span className={this.getPrefixCls('icon')} dangerouslySetInnerHTML={{__html: svgHtml}}/>
        <span className={this.getPrefixCls('content')}>{children}</span>
        {canClose && closeInner}
      </div>
    );
  }

  render() {
    const {className} = this.props;
    const {closed} = this.state;

    return closed ? null : (
      <TransitionGroup className={className}>
        <CSSTransition
          classNames={this.getPrefixCls()}
          timeout={this.transitionTime}
        >
          {this.renderAlert()}
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default Alert;
