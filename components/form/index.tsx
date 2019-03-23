import Form from './Form';
import FormDecorator from './FomDecorator';
import FormItem from './FormItem';

export * from './FomDecorator';
export {FormItemState,FormItemProps} from './FormItem';
export {FormProps, FormState} from './Form';
Form.Decorator = FormDecorator;
Form.Item = FormItem;
export default Form;
