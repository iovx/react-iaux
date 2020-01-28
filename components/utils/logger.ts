const DEBUG = true;
const Logger = {
  log(...arg: any[]) {
    if (DEBUG)
      console.log(...arg);
  },
  info(...arg: any[]) {
    if (DEBUG)
      console.info(...arg);
  },
  error(...arg: any[]) {
    if (DEBUG)
      console.error(...arg);
  },
  warn(...arg: any[]) {
    if (DEBUG)
      console.warn(...arg);
  },

};
export default Logger;
