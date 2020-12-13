import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import Radio from './Radio';

export interface IRadioDataItem {
  name?: string;
  label?: string;
  value: string;
}

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>,'onChange'>{
  data: IRadioDataItem[];
  defaultValue?: string | string[];
  value?: string;
  disabled?: boolean;

  onChange?(value: string): void;
}

export interface RadioGroupState {
  value: string | string[],
  data: IRadioDataItem[];
}


class RadioGroup extends React.PureComponent<RadioGroupProps, RadioGroupState> {
  static propTypes = {
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })),
  };
  static defaultProps: Partial<RadioGroupProps> = {

  };

  constructor(props: RadioGroupProps) {
    super(props);
    const defaultValue = props.defaultValue;
    this.state = {
      data: [],
      value: props.value || defaultValue || '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps: RadioGroupProps, prevState: RadioGroupState) {
    if (('value' in nextProps) && nextProps.value !== prevState.value) {
      return { value: nextProps.value };
    }
    return null;
  }

  getPrefixCls(suffix?: string) {
    return `wx-v2-radio-group${suffix ? '-' + suffix : ''}`;
  }

  triggerChange(value: string) {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  }

  handleChange(item: IRadioDataItem) {
    return () => {
      if (!('value' in this.props)) {
        this.setState({ value: item.value }, () => {
          this.triggerChange(item.value);
        });
      } else {
        this.triggerChange(item.value);
      }
    };
  }

  getExtraProps() {
    const { value, className, defaultValue, onChange, disabled, data, ...extraProps } = this.props;
    return extraProps;
  }

  render() {
    const { className, data, disabled } = this.props;
    const { value } = this.state;
    const checkBoxGroupCls = cx(this.getPrefixCls(), className);
    return (
      <div className={checkBoxGroupCls} {...this.getExtraProps()}>
        {
          data.map(item => {
            const isChecked = value === item.value;
            return (
              <Radio
                disabled={disabled}
                key={item.value}
                checked={isChecked}
                label={item.label}
                value={item.value}
                onChange={this.handleChange(item)}
              />
            );
          })
        }
      </div>
    );
  }
}

export default RadioGroup;
