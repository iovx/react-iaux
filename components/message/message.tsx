import * as React from 'react';
import Toast from './Toast';
import Notice from './Notice';
import HOCMessage from './HOCMessage';
import {createToast} from './util';

const HOCNotice = HOCMessage(Notice, {className: 'wx-v2-notice'});
const HOCToast = HOCMessage(Toast, {className: 'wx-v2-toast'});

const {eleRef: noticeRef} = createToast(<HOCNotice/>, {});
const {eleRef: toastRef} = createToast(<HOCToast/>, {});

function create(ref: any) {
  return {
    success(title, content?) {
      ref.addItem({title, content, type: 'success'});
    },
    info(title, content?) {
      ref.addItem({title, content, type: 'info'});
    },
    error(title, content?) {
      ref.addItem({title, content, type: 'error'});
    },
    primary(title, content?) {
      ref.addItem({title, content, type: 'primary'});
    },
    warning(title, content?) {
      ref.addItem({title, content, type: 'warning'});
    },
    show(data) {
      ref.addItem(data);
    }
  };
}

export const toast = create(toastRef);
export const notice = create(noticeRef);
