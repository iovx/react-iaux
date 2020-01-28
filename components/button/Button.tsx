import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import { tuple } from '../_utils/type';

const statusType = tuple('success', 'info', 'warning', 'error', 'default', 'primary', 'pure',
  'loading',
  'info-pure',
  'success-pure',
  'warning-pure',
  'error-pure',
  'primary-pure',
);

const sizeType = tuple('sm', 'md', 'lg', 'res');

interface BaseButtonProps {
  status?: typeof statusType[number];
  size?: typeof sizeType[number];
  icon?: React.ReactNode;
  className?: string;
  text?: React.ReactNode;
  children?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
}

export type ButtonProps = {} & BaseButtonProps & React.HTMLAttributes<HTMLButtonElement>

class Button extends React.Component<ButtonProps, any> {
  static defaultProps = {
    status: 'default',
    size: 'md',
    active: false,
    disabled: false,
  };
  static propTypes = {
    status: PropTypes.string,
    icon: PropTypes.node,
    className: PropTypes.string,
    text: PropTypes.node,
    size: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
  };

  handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(e);
    }
  };

  render(): JSX.Element {
    const { status, icon, size, active, className, children, text, disabled, ...extraProps } = this.props;
    const wrapperCls = cx('wx-v2-button', disabled ? 'ws-disabled' : cx('ws-' + status, 'ws-' + size, active ? 'ws-at' : ''), className);
    return (
      <button {...extraProps} className={wrapperCls} onClick={this.handleClick}>
        <span>{icon}</span>
        <span>
          {text || children}
        </span>
      </button>
    );
  }
}


export default Button;
