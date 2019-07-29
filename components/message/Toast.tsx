import * as  React from 'react';
import * as PropTypes from 'prop-types';
import {IData} from "./interface";

export type ToastProps = {
  icon: string;
  data: IData,
  className: string;
}

class Toast extends React.Component<ToastProps, any> {

  static propTypes = {
    icon: PropTypes.any,
    data: PropTypes.object,
  }

  render() {
    const {icon, data, className} = this.props;
    return (
      <div className={className}>
        <div className='wx-v2-toast-item-icon' dangerouslySetInnerHTML={{__html: icon}}/>
        <div className='wx-v2-toast-item-content'>{data.title}</div>
      </div>
    );
  }
}

export default Toast;
