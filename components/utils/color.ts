export function getRandColor(): string {
  const r = Math.round(Math.random() * 255)
  const g = Math.round(Math.random() * 255)
  const b = Math.round(Math.random() * 255)
  const a = Math.round(Math.random() * 255)
  return `rgba(${r},${g},${b},${a})`;
}
export function hex2Rgba(alpha:boolean=true):string {
  return '#23a';
}