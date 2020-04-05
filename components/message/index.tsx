import Toast from './Toast';
import { ToastProps } from './Toast';
import Notice from './Notice';
import { NoticeProps } from './Notice';
import HOCMessage from './HOCMessage';
import { createToast } from './util';
import { notice, toast } from './message';

export { NoticeProps, ToastProps };

const Message = {
  toast, notice, Toast, Notice, HOCMessage, createToast,
};
export { notice, toast };
export default Message;

