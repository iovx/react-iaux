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

  onChange?(e: CheckBoxGroupState): void;
}

export type CheckBoxGroupProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;

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

  triggerChange() {
    const { onChange } = this.props;
    if (onChange) {
      onChange({ ...this.state });
    }
  }

  handleChange(item: ICheckBoxDataItem) {
    return (e) => {
      const { checked } = e;
      if (!('value' in this.props)) {
        this.setState((prevState: CheckBoxGroupState) => {
          let nextValue;
          if (checked) {
            nextValue = prevState.value.filter(vl => vl !== item.value);
          } else {
            nextValue = prevState.value.concat([item.value]);
          }
          return { value: nextValue };
        }, () => {
          this.triggerChange();
        });
      } else {
        this.triggerChange();
      }
    };
  }

  getExtraProps() {
    const { value, className, defaultValue, data, ...extraProps } = this.props;
    return extraProps;
  }

  render() {
    const { className, data } = this.props;
    const { value } = this.state;
    const checkBoxGroupCls = cx(this.getPrefixCls(), className);
    return (
      <div className={checkBoxGroupCls} {...this.getExtraProps()}>
        {
          data.map(item => {
            const isChecked = value.indexOf(item.value) !== -1;
            return (
              <CheckBox
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
