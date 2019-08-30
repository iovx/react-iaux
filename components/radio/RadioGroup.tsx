import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import Radio from "./Radio";

interface IRadioDataItem {
  name?: string;
  label?: string;
  value: string;
}

interface BaseProps {
  data: IRadioDataItem[];
  defaultValue?: string;
  value?: string;

  onChange?(e: RadioGroupState): void;
}

export type RadioGroupProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement> ;

export interface RadioGroupState {
  value: string,
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
    }))
  };
  static defaultProps = {
    defaultValue: [],
  }

  constructor(props: RadioGroupProps) {
    super(props);
    const defaultValue = props.defaultValue;
    this.state = {
      data: [],
      value: props.value || defaultValue || '',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps: RadioGroupProps, prevState: RadioGroupState) {
    if (('value' in nextProps) && nextProps.value !== prevState.value) {
      return {value: nextProps.value};
    }
    return null;
  }

  getPrefixCls(suffix?: string) {
    return `wx-v2-radio-group${suffix ? '-' + suffix : ''}`;
  }

  triggerChange() {
    const {onChange} = this.props;
    if (onChange) {
      onChange({...this.state});
    }
  }

  handleChange(item: IRadioDataItem) {
    return (e) => {
      if (!('value' in this.props)) {
        this.setState({value: item.value}, () => {
          this.triggerChange();
        });
      } else {
        this.triggerChange();
      }
    }
  }

  getExtraProps() {
    const {value, className, defaultValue, data, ...extraProps} = this.props;
    return extraProps;
  }

  render() {
    const {className, data} = this.props;
    const {value} = this.state;
    const checkBoxGroupCls = cx(this.getPrefixCls(), className);
    return (
      <div className={checkBoxGroupCls} {...this.getExtraProps()}>
        {
          data.map(item => {
            const isChecked = value === item.value;
            return (
              <Radio
                key={item.value}
                checked={isChecked}
                label={item.label}
                value={item.value}
                onChange={this.handleChange(item)}
              />
            )
          })
        }
      </div>
    );
  }
}

export default RadioGroup;
