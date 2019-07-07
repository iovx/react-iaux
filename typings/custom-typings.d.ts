declare module "@" {
  export * from 'docs/pages';
}
declare module '*.txt' {
  const content: string;
  export default content;
}
declare module '*.svg' {
  const content: string;
  export default content;
}
declare module '*.png' {
  const content: string;
  export default content;
}
declare module '*.jpg' {
  const content: string;
  export default content;
}
declare module '*.jpeg' {
  const content: string;
  export default content;
}
declare module '*.gif' {
  const content: string;
  export default content;
}
declare module '*.md' {
  const content: string;
  export default content;
}
// Some do it the other way around.
declare module '*.json' {
  const value: any;
  export default value;
}
declare module '*.less' {
  const styles: any;
  export default styles;
}

declare module 'react-iaux' {
  export * from 'lib';
  export * from 'lib/style';
}
