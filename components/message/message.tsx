import * as React from 'react';
import Toast from './Toast';
import Notice from './Notice';
import HOCMessage, { IHOCNoticeDataItem } from './HOCMessage';
import { createToast } from './util';

const HOCNotice = HOCMessage(Notice, { className: 'wx-v2-notice' });
const HOCToast = HOCMessage(Toast, { className: 'wx-v2-toast' });

const { eleRef: noticeRef } = createToast(<HOCNotice />, {});
const { eleRef: toastRef } = createToast(<HOCToast />, {});

function create(ref: any) {
  return {
    success(title: any, content?: any) {
      ref.addItem({ title, content, type: 'success' });
    },
    info(title: any, content?: any) {
      ref.addItem({ title, content, type: 'info' });
    },
    error(title: any, content?: any) {
      ref.addItem({ title, content, type: 'error' });
    },
    primary(title: any, content?: any) {
      ref.addItem({ title, content, type: 'primary' });
    },
    warning(title: any, content?: any) {
      ref.addItem({ title, content, type: 'warning' });
    },
    show(data: IHOCNoticeDataItem) {
      ref.addItem(data);
    },
  };
}

export const toast = create(toastRef);
export const notice = create(noticeRef);
