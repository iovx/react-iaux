import * as React from 'react';
import * as ReactDOM from 'react-dom';

export function createToast(ele: React.ReactElement, props: any) {
  if (typeof  document === 'undefined') {
    return {
      eleRef: null,
      destroy: () => {
      },
    };
  }
  const toastWrapper = document.createElement('div');
  document.body.appendChild(toastWrapper);
  const ref = React.createRef();
  props.ref = ref;
  ReactDOM.render(React.cloneElement(ele, props), toastWrapper);
  return {
    eleRef: ref.current,
    destroy() {
      ReactDOM.unmountComponentAtNode(toastWrapper);
      document.body.removeChild(toastWrapper);
    },
  };
}

