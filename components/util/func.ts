export function isFunction(func) {
  return func && typeof func === 'function';
}

export function execFunction(func, proxy = null, ...args) {
  if (isFunction(func)) {
    func.call(proxy, ...args);
  }
}

export function throttle(idle, action) {
  let last;
  return function () {
    const ctx = this, args = arguments;
    clearTimeout(last);
    last = setTimeout(function () {
      action.apply(ctx, args)
    }, idle)
  }
}
