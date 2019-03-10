import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import omit from 'omit.js';
import {tuple} from "../_utils/type";

const InputStatus = tuple('error', 'success', 'default', 'warning', 'primary', 'focus');

const InputType = tuple('text', 'password');


export declare interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  status?: (typeof InputStatus)[number],
  type?: (typeof InputType)[number],
  value?: string,
}


export declare type  InputState = {
  status?: (typeof InputStatus)[number];
  value?: string | string[];
}

class Input extends React.Component<InputProps, InputState> {
  static defaultProps = {
    status: 'default',
    type: 'text',
  }
  static propTypes = {
    type: PropTypes.string,
    status: PropTypes.oneOf(InputStatus),
  };
  input: HTMLInputElement;

  constructor(props: InputProps) {
    super(props);
    const {status, value, defaultValue} = props;
    const initValue = typeof value === 'undefined' ? defaultValue : value;
    this.state = {
      status,
      value: initValue,
    }
  }

  componentWillReceiveProps(nextProps: InputProps): void {
    const {status, value} = nextProps;
    if (this.state.status !== status) {
      this.setState({status});
    }
    if (this.state.value !== value) {
      this.setState({value});
    }
  }
  getInputClassName(prefixCls: string) {
    const { status } = this.props;
    return cx(prefixCls, {
      [`${prefixCls}-default`]: status === 'default',
    });
  }
  saveInput = (node: HTMLInputElement) => {
    this.input = node;
  };

  onFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
    const {onFocus} = this.props;
    let event = e;
    this.setState({status: 'focus'}, () => {
      if (onFocus) {
        event = Object.create(e);
        event.target = this.input;
        event.currentTarget = this.input;
        const originalInputValue = this.input.value;
        this.input.value = '';
        onFocus(event as React.FocusEvent<HTMLInputElement>);
        // reset input value
        this.input.value = originalInputValue;
      }
    })
  }
  onBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const {status, onBlur} = this.props;
    this.setState({status}, () => {
      let event = e;
      if (onBlur) {
        event = Object.create(e);
        event.target = this.input;
        event.currentTarget = this.input;
        const originalInputValue = this.input.value;
        this.input.value = '';
        onBlur(event as React.FocusEvent<HTMLInputElement>);
        // reset input value
        this.input.value = originalInputValue;
      }
    })
  }
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    if (!('value' in this.props)) {
      this.setState({value})
    }
    const {onChange} = this.props;
    if (onChange) {
      onChange(e as React.ChangeEvent<HTMLInputElement>);
    }
  }

  render(): JSX.Element {
    const {status} = this.state;
    const {type} = this.props;
    const extraProps = omit(this.props, ['defaultValue', 'onChange', 'type','status']);
    const clsName = cx('wx-v2-input', `ws-input-${status}`);
    return (
      <input
        {...extraProps}
        className={clsName}
        value={this.state.value}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        type={type}
        onChange={this.onChange}
        ref={this.saveInput}
      />
    );
  }
}

export default Input;
