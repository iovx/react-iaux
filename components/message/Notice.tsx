import * as  React from 'react';
import * as PropTypes from 'prop-types';
import {IData} from "./interface";


export type NoticeProps = {
  icon: string;
  data: IData,
  className: string;
}

class Notice extends React.Component<NoticeProps, any> {

  static propTypes = {
    icon: PropTypes.any,
    data: PropTypes.object,
  }

  render() {
    const {icon, data, className} = this.props;
    return (
      <div className={className}>
        <div className='wx-v2-notice-item-header'>
          <div className='wx-v2-notice-item-icon' dangerouslySetInnerHTML={{__html: icon}}/>
          <div className='wx-v2-notice-item-title'>{data.title}</div>
        </div>
        <div className='wx-v2-notice-item-content'>
          {data.content}
        </div>
      </div>
    );
  }
}

export default Notice;
