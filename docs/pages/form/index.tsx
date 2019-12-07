import * as React from 'react';
import Form, { FormProps } from '../../../components/form';
import Input from '../../../components/input';

import './index.less';
import Radio from '../../../components/radio';
import CheckBox from '../../../components/checkBox';
import Select from '../../../components/select';
import Col from '../../../components/col';
import Row from '../../../components/row';
import '../../../components/select/style';
import '../../../components/radio/style';
import '../../../components/checkBox/style';
import '../../../components/col/style';
import '../../../components/row/style';
import Button from '../../../components/button/Button';
import Upload from '../../../components/upload/Upload';

const FormItem = Form.Item;

const { Option } = Select;

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
        <Row>
          <Col span={12}>
            <FormItem className='formItem'>
              {fieldDecorator.decorate('name', {
                label: '姓名',
                initialValue: 'wenwen',
                required: true,
                message: '姓名不能为空',
              })(<Input placeholder='请输入姓名' disabled />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem className='formItem'>
              {fieldDecorator.decorate('age', {
                label: '年龄',
                initialValue: 18,
                required: true,
                // validating: null,
                stopValidate: false,
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
                        }, 1000);
                      });
                    },
                  },
                ],
              })(<Input placeholder='请输入年龄' />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem className='formItem'>
              {fieldDecorator.decorate('rice', {
                label: '带饭',
                required: true,
                stopValidate: true,
              })(
                <Radio.Group
                  data={[
                    {
                      name: 'rice',
                      value: '1',
                      label: '带了',
                    },
                    {
                      name: 'rice',
                      value: '0',
                      label: '没带',
                    },
                  ]}
                />,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
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
              })(<Input placeholder='请输入单位' />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem className='formItem'>
              {fieldDecorator.decorate('programLanguage', {
                label: '语言',
                required: true,
              })(
                <CheckBox.Group
                  disabled
                  data={[
                    {
                      name: 'name',
                      value: 'JavaScript',
                      label: 'JavaScript',
                    },
                    {
                      name: 'name',
                      value: 'PHP',
                      label: 'PHP',
                    },
                    {
                      name: 'name',
                      value: 'Java',
                      label: 'Java',
                    },
                    {
                      name: 'name',
                      value: 'Python',
                      label: 'Python',
                    },
                  ]}
                />,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem className='formItem'>
              {fieldDecorator.decorate('music', {
                label: '最爱歌曲',
                initialValue: '3',
                rules: [],
              })(
                <Select multiple>
                  <Option key='1'>一个也不能少1</Option>
                  <Option key='2'>一个也不能少2</Option>
                  <Option key='3'>一个也不能少3</Option>
                  <Option key='4'>一个也不能少4</Option>
                  <Option key='5'>一个也不能少5</Option>
                  <Option key='6'>一个也不能少6</Option>
                  <Option key='7'>一个也不能少7</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem className='formItem'>
              {fieldDecorator.decorate('logo', {
                label: 'LOGO',
                required: true,
                rules: [
                  {
                    message: '附件数目不能超过三个',
                    validate(value) {
                      return value.length <= 3;
                    },
                  },
                ],
              })(
                <Upload
                  disabled
                  multiple
                  maxLength={4}
                />,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col offset={16} span={8} style={{ textAlign: 'right' }}>
            <div>
              <Button status={'info-pure'} onClick={this.ok}>OK</Button>
              <Button status={'error'} onClick={this.ok}>OK</Button>
              <Button status={'error-pure'} onClick={this.ok}>OK</Button>
              <Button onClick={this.setValue}>Set</Button>
            </div>
          </Col>
        </Row>
      </Form>
    );
  };

  render() {
    return this.renderForm();
  }
}

export default Form.create(IndexPage);
