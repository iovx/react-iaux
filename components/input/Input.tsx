import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const STATUS = {
  ERROR: 'error',
  SUCCESS: 'success',
  DEFAULT: 'default',
  WARNING: 'warning',
  PRIMARY: 'primary',
  FOCUS: 'focus',
}

class Input extends Component {
  static defaultProps = {
    status: STATUS.DEFAULT,
    type:'text',
  }
  state = {}
  componentWillMount() {
    const {status, value, defaultValue} = this.props;
    this.setState({status, value: defaultValue || value});
  }
  componentWillReceiveProps(nextProps) {
    const {status, value} = nextProps;
    if (this.state.status !== status) {
      this.setState({status});
    }
    if (this.state.value !== value) {
      this.setState({value});
    }
  }
  onFocus = (e) => {
    const {onFocus} = this.props;
    this.setState({status: STATUS.FOCUS}, () => {
      if (onFocus) {
        onFocus(e);
      }
    })
  }
  onBlur = (e) => {
    const {status, onBlur} = this.props;
    this.setState({status}, () => {
      if (onBlur) {
        onBlur(e);
      }
    })
  }
  onChange = (e) => {
    const {onChange} = this.props;
    const {value} = e.target;
    this.setState({value}, () => {
      if (onChange) {
        onChange(value);
      }
    })
  }
  render() {
    const {status} = this.state;
    const {defaultValue, value, onChange,type, ...extraProps} = this.props;
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
      />
    );
  }
}

Input.propTypes = {
  type:PropTypes.string,
  status:PropTypes.oneOf(Object.values(STATUS)),
};

Input.Status = STATUS;
export default Input;
