import * as React from 'react';
import Form, { FormProps } from '../../../components/form';
import Input from '../../../components/input';

import './index.less';

const FormItem = Form.Item;

interface TestProps extends FormProps {

}

class IndexPage extends React.Component<TestProps, any> {
  ok = () => {
    const form = this.props.form;
    form.validateFields((err, values) => {
      console.log(err, values);
    });
  };
  setValue = () => {
    const { fieldDecorator } = this.props.form;
    fieldDecorator.setFieldValue('name', 'Jack');
  };
  renderForm = () => {
    const { fieldDecorator } = this.props.form;
    return (
      <Form>
        <FormItem className='formItem'>
          {fieldDecorator.decorate('name', {
            label: '姓名',
            initialValue: 'wenwen',
            required: true,
            message: '姓名不能为空',
          })(<Input placeholder='请输入姓名' disabled />)}
        </FormItem>
        <FormItem className='formItem'>
          {fieldDecorator.decorate('age', {
            label: '年龄',
            initialValue: 18,
            required: true,
            stopValidate: false,
            validating: null,
            // force:true,
            rules: [
              {
                message: '输入的年龄无效',
                validate(value) {
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      const rs = +value > 18;
                      if (rs) {
                        resolve(true);
                      } else {
                        resolve(false);
                      }
                    }, 3000);
                  });
                },
              },
            ],
          })(<Input placeholder='请输入年龄'/>)}
        </FormItem>
        <FormItem className='formItem'>
          {fieldDecorator.decorate('unit', {
            label: '单位',
            required: true,
            rules: [
              {
                pattern: /^\w{6,20}$/,
                message: '无效的单位',
              },
            ],
          })(<Input placeholder='请输入单位'/>)}
        </FormItem>
        <div>
          <button onClick={this.ok}>OK</button>
          <button onClick={this.setValue}>Set</button>
        </div>
      </Form>
    );
  };

  render() {
    return this.renderForm();
  }
}

export default Form.create(IndexPage);
