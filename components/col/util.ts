/**
 * 获取栅格占比
 * @param span
 * @returns {string}
 */
export function getGridWidth(span = 24) {
  return ((span > 24 ? 24 : span < 0 ? 0 : span) / 24) * 100 + '%';
}
