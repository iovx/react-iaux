export function isFunction(func) {
  return func && typeof func === 'function';
}

export function execFunction(func, proxy = null, ...args) {
  if (isFunction(func)) {
    func.call(proxy, ...args);
  }
}
