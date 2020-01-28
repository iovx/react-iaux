import * as React from 'react';

const NotificationWrapper = (HocNotice: any, data: any) => class HOCNoticeWrapper extends React.Component {
  render() {
    return (
      <HocNotice {...data} />
    );
  }
};
export default NotificationWrapper;
