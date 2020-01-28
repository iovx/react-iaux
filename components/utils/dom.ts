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
 * @param {Window} host
 * @returns {{left: number, top: number}}
 */
export function getOffset(ele: HTMLElement, host: Window = window): Offset {
  const offset: Offset = { left: 0, top: 0 };
  let cur = ele;
  while (cur) {
    offset.left += cur.offsetLeft - cur.scrollLeft;
    offset.top += cur.offsetTop - cur.scrollTop;
    cur = cur.offsetParent as HTMLElement;
  }
  return {
    top: offset.top + (host.scrollY || host.pageYOffset),
    left: offset.left + (host.scrollX || host.pageXOffset),
  };
}

/**
 * 获取边界
 * @param {Element} ele
 * @param {Window} host
 * @returns {IBounds}
 */
export function getBounds(ele: Element, host: Window = window): IBounds {
  const svgEle = ele as SVGAElement;
  if (svgEle.ownerSVGElement && svgEle.getBBox) {
    const box = svgEle.getBBox();
    return {
      left: box.x,
      top: box.y,
      width: box.width,
      height: box.height,
    };
  }
  const htmlEle = ele as HTMLElement;
  const { top, left } = getOffset(htmlEle);
  const style = getComputedStyle(htmlEle);
  const width = parseInt(style.width || '-1');
  const height = parseInt(style.height || '-1');
  return {
    top: top - (host.scrollY || host.pageYOffset),
    left: left - (host.scrollX || host.pageXOffset),
    width,
    height,
  }
    ;
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
