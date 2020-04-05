const ENV = process.env.NODE_ENV;
if (
  ENV !== 'production' &&
  ENV !== 'test' &&
  typeof console !== 'undefined' &&
  console.warn && // eslint-disable-line no-console
  typeof window !== 'undefined'
) {
  // eslint-disable-next-line no-console
  console.warn(
    'You are using a whole package of antd, ' +
    'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.',
  );
}

export { default as Http } from './http';
export { default as Input } from './input';
export { default as Form } from './form';
export { default as Loading } from './loading';
export { default as Button } from './button';
export { default as Header } from './header';
export { default as Footer } from './footer';
export { default as Tag } from './tag';
export { default as Tip } from './tip';
export { default as Divider } from './divider';
export { default as Panel } from './panel';
export { default as Media } from './media';
export { default as List } from './list';
export { default as Card } from './card';
export { default as Slider } from './slider';
export { default as Nav } from './nav';
export { default as ResizeCell } from './resizeCell';
export { default as ProgressBar } from './progressBar';
export { default as Table } from './table';
export { default as Pagination } from './pagination';
export { default as Message, notice, toast } from './message';
export { default as Selection } from './selection';
export { default as Upload } from './upload';
export { default as Icon } from './icon';
export { default as Image } from './image';
export { default as Drag } from './drag';
export { default as Avatar } from './avatar';
export { default as Menu } from './menu';
export { default as DatePicker } from './datePicker';
export { default as Dialog } from './dialog';
export { default as Portal } from './portal';
export { default as WaterFall } from './waterfall';
export { default as CheckBox } from './checkBox';
export { default as Radio } from './radio';
export { default as Alert } from './alert';
export { default as Popup } from './popup';
export { default as Tab } from './tab';
export { default as Select } from './select';
export { default as PopOver } from './popOver';
export { default as ToolTip } from './toolTip';
export { default as AuthWrapper } from './authWrapper';
export { default as Col } from './col';
export { default as Row } from './row';
export { default as CollapsePanel } from './collapsePanel';
export { default as Grid } from './grid';
export { default as Layout } from './layout';
export { default as Text } from './text';
export * from './utils';
