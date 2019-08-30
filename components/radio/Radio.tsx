import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import RadioGroup from "./RadioGroup";

interface BaseProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: string;
  value?: string;

  onChange?(e: RadioState): void;
}

export type RadioProps = {} & BaseProps & React.HTMLAttributes<HTMLInputElement>;

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
    value: "",
  }
  static Group: typeof RadioGroup;

  constructor(props: RadioProps) {
    super(props);
    this.state = {
      defaultChecked: props.checked || false,
      checked: props.checked || props.defaultChecked || false,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps: RadioProps, prevState: RadioState) {
    if ('checked' in nextProps && nextProps.checked !== prevState.checked) {
      return {checked: nextProps.checked};
    }
    return null;
  }

  getPrefixCls(suffix?: string) {
    return `wx-v2-radio${suffix ? '-' + suffix : ''}`;
  }

  triggerChange() {
    const {onChange} = this.props;
    if (onChange) {
      onChange({...this.state});
    }
  }

  handleChange(e) {
    e.stopPropagation();
    const {checked} = e.currentTarget;
    if (!('checked' in this.props)) {
      this.setState({checked}, () => {
        this.triggerChange();
      });
    } else {
      this.triggerChange();
    }
  }

  getExtraProps() {
    const {value, checked, className, defaultChecked, label, children, ...extraProps} = this.props;
    return extraProps;
  }

  render() {
    const {value, className, label, children, disabled} = this.props;
    const {checked} = this.state;
    const checkBoxCls = cx(this.getPrefixCls(), checked ? this.getPrefixCls('checked') : '', disabled ? this.getPrefixCls('disabled') : '', className);
    return (
      <label className="wx-v2-radio-wrapper">
        <span className={checkBoxCls}>
          <input
            {...this.getExtraProps()}
            type="radio"
            className="wx-v2-radio-input"
            value={value}
            checked={checked}
            onChange={this.handleChange}
          />
          <span className="wx-v2-radio-inner"/>
        </span>
        <span>{label || children}</span>
      </label>
    );
  }
}

export default Radio;
