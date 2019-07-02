type Offset = {
  left: number;
  top: number;
}

/**
 * 计算元素偏移量
 * @param ele
 * @returns {{left: number, top: number}}
 */
export function getOffset(ele: HTMLElement): Offset {
  const offset: Offset = {left: 0, top: 0};
  let cur = ele;
  while (cur) {
    offset.left += cur.offsetLeft;
    offset.top += cur.offsetTop;
    cur = cur.offsetParent as HTMLElement;
  }
  return offset;
}
