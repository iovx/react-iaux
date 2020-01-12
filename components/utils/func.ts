export function isFunction(func: any) {
  return func && typeof func === 'function';
}

export function execFunction(func: any, proxy: any = null, ...args: any[]) {
  if (isFunction(func)) {
    func.call(proxy, ...args);
  }
}

export function throttle(idle: number, action: Function) {
  let last: any;
  return function() {
    const ctx = this, args = arguments;
    clearTimeout(last);
    last = setTimeout(function() {
      action.apply(ctx, args);
    }, idle);
  };
}
