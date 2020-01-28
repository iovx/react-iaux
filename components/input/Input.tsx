import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import omit from 'omit.js';
import { Omit, tuple } from '../_utils/type';
import Area from './Area';

const InputStatus = tuple('error', 'success', 'default', 'warning', 'primary', 'focus');

type InputType = 'text' | 'password';


export interface InputProps extends Omit<React.HTMLAttributes<HTMLInputElement>, 'onChange'> {
  status?: (typeof InputStatus)[number]
  type?: InputType;
  value?: string,
  defaultValue?: string;
  onChange?: (value: any) => void;
  readonly?: boolean;
  maxLength?: number;
  disabled?: boolean;
  autoFocus?: boolean;
}


export type  InputState = {
  status?: (typeof InputStatus)[number];
  value?: string | string[];
}

class Input extends React.Component<InputProps, InputState> {
  static defaultProps = {
    status: 'default',
    type: 'text',
  };
  static propTypes = {
    type: PropTypes.string,
    status: PropTypes.oneOf(InputStatus),
  };
  static Area: typeof Area;

  constructor(props: InputProps) {
    super(props);
    const { value, defaultValue } = props;
    this.state = {
      value: value || defaultValue || '',
    };
  }

  static getDerivedStateFromProps(props: InputProps) {
    if ('value' in props) {
      return {
        value: props.value,
      };
    }
    return null;
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const { readonly } = this.props;
    if (readonly) {
      return;
    }
    if ('value' in this.props) {
      this.triggerChange(value);
      return;
    }
    this.setState({ value }, () => {
      this.triggerChange(value);
    });
  };

  triggerChange(value: string) {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  }

  render() {
    const { type, className, status, disabled } = this.props;
    const extraProps = omit(this.props, ['value', 'defaultValue', 'onChange', 'type', 'status']);
    const clsName = cx({
      'wx-v2-input': true,
      [`ws-input-${status}`]: !disabled,
      [`ws-input-disabled`]: disabled,
    }, className);
    return (
      <input
        {...extraProps}
        className={clsName}
        value={this.state.value}
        type={type}
        onChange={this.onChange}
      />
    );
  }
}

export default Input;
