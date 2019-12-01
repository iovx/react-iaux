type Offset = {
  left: number;
  top: number;
}

interface IBounds {
  width: number;
  height: number;
  left: number;
  top: number;
}

/**
 * 计算元素偏移量
 * @param ele
 * @returns {{left: number, top: number}}
 */
export function getOffset(ele: HTMLElement): Offset {
  const offset: Offset = { left: 0, top: 0 };
  let cur = ele;
  while (cur) {
    offset.left += cur.offsetLeft;
    offset.top += cur.offsetTop;
    cur = cur.offsetParent as HTMLElement;
  }
  return offset;
}

/**
 * 获取边界
 * @param ele
 */
export function getBounds(ele: HTMLElement): IBounds {
  const { top, left } = getOffset(ele);
  const style = getComputedStyle(ele);
  const width = parseInt(style.width || '-1');
  const height = parseInt(style.height || '-1');
  return {
    top,
    left,
    width,
    height,
  };
}

/**
 * 获取剩余边界
 * @param ele
 */
export function getRestBounds(ele: HTMLElement) {
  const { top, left, width, height } = getBounds(ele);
  const { innerHeight, innerWidth } = window;
  return {
    top,
    left,
    bottom: innerHeight - top - height,
    right: innerWidth - left - width,
  };
}
