import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import FieldDecorator from "./FomDecorator";

export declare type FormItemProps = {
  required: boolean;
  colon: string;
  style: React.CSSProperties;
  className: string;
  label: React.ReactNode;
  children: React.ReactChild,
}
export declare type FormItemState = {
  required?: boolean;
  label?: React.ReactNode;
}

export default class FormItem extends React.Component<FormItemProps, FormItemState> {

  static defaultProps = {
    required: false,
    colon: ':',
  }
  static propTypes = {
    label: PropTypes.node,
    required: PropTypes.bool,
    colon: PropTypes.string,
  }

  constructor(props: FormItemProps) {
    super(props);
    const {children} = this.props;
    const onlyChild = React.Children.only(children) as any;
    this.childInstanceOfDecoratorItem = false;
    if (onlyChild && onlyChild.type === FieldDecorator.FieldDecoratorItem) {
      this.childInstanceOfDecoratorItem = true;
    }
  }

  childInstanceOfDecoratorItem: boolean;
  state = {
    label: '',
    required: false,
  }

  componentWillMount() {
    const {children} = this.props;
    let {required, label} = this.props;
    const onlyChild = React.Children.only(children) as React.ReactElement;
    if (this.childInstanceOfDecoratorItem) {
      required = onlyChild.props.required;
      label = onlyChild.props.label || label;
    }
    this.setState({required, label});
  }

  componentWillReceiveProps(nextProps: FormItemProps) {
    let {required, label} = nextProps;
    const {children} = nextProps;
    if (this.childInstanceOfDecoratorItem) {
      const onlyChild = React.Children.only(children) as React.ReactElement;
      required = onlyChild.props.required;
      label = onlyChild.props.label || label;
      this.update({required, label});
    } else {
      this.update({required, label});
    }
  }

  update = (data) => {
    const nextState: FormItemState = {};
    let shouldUpdate = false;
    let {required, label} = data;
    if (this.state.required !== required) {
      nextState.required = required;
      shouldUpdate = true;
    }
    if (this.state.label !== label) {
      nextState.label = label;
      shouldUpdate = true;
    }
    if (shouldUpdate) {
      this.setState(nextState);
    }
  }

  render() {
    const {colon, className, style, children, ...extraProps} = this.props;
    const {required, label} = this.state;
    const onlyChild = React.Children.only(children);
    const clsName = cx('wx-v2-form-item', className);
    const labelCls = cx('wx-v2-form-item-label');
    const wrapperCls = cx('wx-v2-form-item-wrapper');
    const labelTextCls = cx('wx-v2-form-item-label-text', required ? 'wx-v2-form-item-label-mark' : '');
    const colonCls = cx('wx-v2-form-item-label-colon');
    return (
      <div className={clsName} style={style} {...extraProps}>
        <div className={labelCls}>
          <div className={labelTextCls}>{label}</div>
          <div className={colonCls}>{colon}</div>
        </div>
        <div className={wrapperCls}>
          {onlyChild}
        </div>
      </div>
    );
  }
}
