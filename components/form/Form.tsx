import * as React from 'react';
import cx from 'classnames';
import FieldDecorator from "./FomDecorator";

export declare type FormWidgetProps = {
  className: string;
  style: React.CSSProperties;
}

export declare type FormWidgetState = any

export declare type FormProps = {
  className: string;
  style: React.CSSProperties;
}

export declare type FormState = any


export default class Form extends React.Component<FormProps, FormState> {

  static create = (WrappedForm) => {
    const fieldDecorator = new FieldDecorator();
    const form = {
      fieldDecorator,
      getFieldsValue() {
        return fieldDecorator.getFieldsValue();
      },
      validateFields(callback) {
        return fieldDecorator.validateFields(callback);
      }
    }
    return class FormWidget extends React.Component<FormWidgetProps, FormWidgetState> {
      render() {
        const {className, ...extraProps} = this.props;
        const clsName = cx('wx-v2-form', className);
        return (
          <div className={clsName} {...extraProps}>
            <WrappedForm form={form}/>
          </div>
        );
      }
    }
  }

  render() {
    const {style, className, children, ...extraProps} = this.props;
    const clsName = cx('wx-v2-form', className);
    return (
      <div className={clsName} style={style} {...extraProps}>
        {children}
      </div>
    );
  }

}
