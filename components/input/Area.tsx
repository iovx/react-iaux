import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import omit from 'omit.js';
import { Omit, tuple } from '../_utils/type';

const InputStatus = tuple('error', 'success', 'default', 'warning', 'primary', 'focus');

interface BaseProps extends Omit<React.HTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
}

export type AreaProps = {
  status?: (typeof InputStatus)[number]
  value?: string,
  defaultValue?: string;
  onChange?: (value: any) => void;
  readonly?: boolean;
  maxLength?: number;
  disabled?: boolean;
  autoFocus?: boolean;
  resize?: boolean;
} & BaseProps;


class Area extends React.Component<AreaProps, any> {
  static defaultProps = {
    status: 'default',
  };
  static propTypes = {
    status: PropTypes.oneOf(InputStatus),
  };
  input: HTMLInputElement;

  constructor(props: AreaProps) {
    super(props);
    const { value, defaultValue } = props;
    this.state = {
      value: value || defaultValue || '',
    };
  }

  static getDerivedStateFromProps(props: AreaProps) {
    if ('value' in props) {
      return {
        value: props.value,
      };
    }
    return null;
  }

  onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  triggerChange(value) {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  }

  render() {
    const { className, resize, status, style, disabled } = this.props;
    const extraProps = omit(this.props, ['value', 'defaultValue', 'onChange', 'status']);
    const clsName = cx({
      'wx-v2-text-area': true,
      [`ws-input-${status}`]: !disabled,
      [`ws-input-disabled`]: disabled,
    }, className);
    const areaStyle: React.CSSProperties = {
      resize: resize ? 'vertical' : 'none',
      ...style,
    };
    return (
      <textarea
        {...extraProps}
        style={areaStyle}
        className={clsName}
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }
}

export default Area;
