/**
 * 按中文=2个英文计算长度
 * @param str
 * @return {number}
 */
export function getLength(str: string) {
  let realLength = 0,
    len = str.length,
    charCode = -1;
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    realLength += charCode >= 0 && charCode <= 128 ? 1 : 2;
  }
  return realLength;
}

/**
 * 截取字符串
 * @param str
 * @param len
 */
export function cutStr(str: string, len: number | undefined) {
  if (typeof len === 'undefined') {
    return str;
  }
  let strLength = 0;
  let strCut = '';
  let strLen = str.length;
  for (let i = 0; i < strLen; i++) {
    let a = str.charAt(i);
    strLength++;
    if (escape(a).length > 4) {
      strLength++;
    }
    strCut = strCut.concat(a);
    if (strLength === len) {
      return strCut;
    } else if (strLength > len) {
      strCut = strCut.substr(0, strCut.length - 1);
      return strCut;
    }
  }
  if (strLength < len) {
    return str;
  }
}
