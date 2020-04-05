
/**
 * 获取SVG ICON
 * @param name
 * @param className
 */
export function getIcon(name: string, className: string = 'svg-icon') {
  return `<svg class="${className}"><use xlink:href="#${name}"></use></svg>`;
}
