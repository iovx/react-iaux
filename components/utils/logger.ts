const DEBUG = true;
const Logger = {
  log(...arg) {
    if (DEBUG)
      console.log(...arg);
  },
  info(...arg) {
    if (DEBUG)
      console.info(...arg);
  },
  error(...arg) {
    if (DEBUG)
      console.error(...arg);
  },
  warn(...arg) {
    if (DEBUG)
      console.warn(...arg);
  },

}
export default Logger;