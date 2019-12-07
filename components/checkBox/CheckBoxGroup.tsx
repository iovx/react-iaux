import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import CheckBox from './CheckBox';

interface ICheckBoxDataItem {
  name?: string;
  label?: string;
  value: string;
}

interface BaseProps {
  data: ICheckBoxDataItem[];
  defaultValue?: string | string[];
  value?: string | string[];
  disabled?: boolean;

  onChange?(value: string[]): void;
}

export type CheckBoxGroupProps = {} & BaseProps & Omit<React.HTMLAttributes<HTMLInputElement>, 'onChange'>;

export interface CheckBoxGroupState {
  value: any[],
}

function getArrayValue(value) {
  return !value ? [] : (Array.isArray(value) ? value : [value]);
}

class CheckBoxGroup extends React.PureComponent<CheckBoxGroupProps, CheckBoxGroupState> {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    data: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.string.isRequired,
    })),
  };
  static defaultProps = {
    defaultValue: [],
  };

  constructor(props: CheckBoxGroupProps) {
    super(props);
    const defaultValue = getArrayValue(props.defaultValue);
    this.state = {
      value: props.value ? getArrayValue(props.value) : defaultValue || [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps: CheckBoxGroupProps, prevState: CheckBoxGroupState) {
    if ('value' in nextProps && getArrayValue(nextProps.value).join('') !== prevState.value.join('')) {
      return { value: getArrayValue(nextProps.value) };
    }
    return null;
  }

  getPrefixCls(suffix?: string) {
    return `wx-v2-checkbox-group${suffix ? '-' + suffix : ''}`;
  }

  triggerChange(value: string[]) {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  }

  handleChange(item: ICheckBoxDataItem) {
    return (value: string, checked: boolean) => {
      const prevValue = this.state.value;
      let nextValue;
      if (!checked) {
        nextValue = prevValue.filter(vl => vl !== item.value);
      } else {
        nextValue = prevValue.concat([item.value]);
      }
      if (!('value' in this.props)) {
        this.setState({ value: nextValue }, () => {
          this.triggerChange(this.state.value);
        });
      } else {
        this.triggerChange(nextValue);
      }
    };
  }

  getExtraProps() {
    const { value, className, defaultValue, onChange, data, ...extraProps } = this.props;
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
            const isChecked = value.indexOf(item.value) !== -1;
            return (
              <CheckBox
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

export default CheckBoxGroup;
