import * as React from 'react';
import notificationDOM,{createNotification} from './notification'
import HOCNoticeWrapper from "./wrapper";
import {STATUS} from "./constant";

let notification;
const notice = (status, title, content, duration = 2000, onClose) => {
  if (!notification) notification = notificationDOM;
  return notification.addNotice({status, title, content, duration, onClose})
}

export default {
  info(title, content, duration, onClose) {
    return notice(STATUS.INFO, title, content, duration, onClose)
  },
  success(title, content, duration, onClose) {
    return notice(STATUS.SUCCESS, title, content, duration, onClose)
  },
  warning(title, content, duration, onClose) {
    return notice(STATUS.WARNING, title, content, duration, onClose)
  },
  error(title, content, duration, onClose) {
    return notice(STATUS.ERROR, title, content, duration, onClose)
  },
  loading(title, content, duration = 0, onClose) {
    return notice(STATUS.LOADING, title, content, duration, onClose)
  },
  show(title, content, duration, onClose) {
    return notice(STATUS.PRIMARY, title, content, duration, onClose)
  },
  pure(content, duration, onClose) {
    return notice(STATUS.PURE, '', content, duration, onClose)
  }
}

const render = {
  show(props){
    const NoticeHolder = createNotification(props);
    const HocNotice = HOCNoticeWrapper(NoticeHolder, notice);
    return (
      <HocNotice />
    );
  }
};

export {render};
