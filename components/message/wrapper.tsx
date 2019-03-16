import * as React from 'react';

const NotificationWrapper = (HocNotice, data)=> class HOCNoticeWrapper extends React.Component {
  render(){
    return (
      <HocNotice {...data} />
    );
  }
}
export default NotificationWrapper;
