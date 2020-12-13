import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import RadioGroup from './RadioGroup';
import { Omit } from '../_utils/type';
import omit from 'omit.js';

export interface BaseProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: string;
  value?: string;
  unCheckedValue?: string;

  onChange?(value: string, checked: boolean): void;
}

export type RadioProps = {} & BaseProps & Omit<React.HTMLAttributes<HTMLInputElement>, 'onChange'>;

export interface RadioState {
  checked: boolean;
  defaultChecked: boolean;
}

class Radio extends React.PureComponent<RadioProps, RadioState> {
  static propTypes = {
    label: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    onChange: PropTypes.func,
  };
  static defaultProps = {
    defaultChecked: false,
    value: '',
    unCheckedValue: '',
  };
  static Group: typeof RadioGroup;

  constructor(props: RadioProps) {
    super(props);
    this.state = {
      defaultChecked: props.checked || false,
      checked: props.checked || props.defaultChecked || false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps: RadioProps, prevState: RadioState) {
    if ('checked' in nextProps && nextProps.checked !== prevState.checked) {
      return { checked: nextProps.checked };
    }
    return null;
  }

  getPrefixCls(suffix?: string) {
    return `wx-v2-radio${suffix ? '-' + suffix : ''}`;
  }

  triggerChange(checked: boolean) {
    const { onChange, value, unCheckedValue } = this.props;
    if (onChange) {
      onChange((checked ? value : unCheckedValue) || '', checked);
    }
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.stopPropagation();
    const { checked } = e.currentTarget;
    if (!('checked' in this.props)) {
      this.setState({ checked }, () => {
        this.triggerChange(checked);
      });
    } else {
      this.triggerChange(checked);
    }
  }

  render() {
    const { value, className, label, children, disabled } = this.props;
    const { checked } = this.state;
    const checkBoxCls = cx(this.getPrefixCls(), checked ? this.getPrefixCls('checked') : '', disabled ? this.getPrefixCls('disabled') : '', className);
    return (
      <label className="wx-v2-radio-wrapper">
        <span className={checkBoxCls}>
          <input
            {...omit(this.props,['value', 'checked', 'unCheckedValue','label', 'className','defaultChecked','onChange', 'children', 'label'])}
            type="radio"
            className="wx-v2-radio-input"
            value={value}
            checked={checked}
            onChange={this.handleChange}
          />
          <span className="wx-v2-radio-inner" />
        </span>
        <span>{label || children}</span>
      </label>
    );
  }
}

export default Radio;
