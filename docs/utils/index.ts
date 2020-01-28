export function loadMarkdown(name: string) {
  let path = name;
  if (name.toLowerCase().indexOf('.md') === -1) {
    path = name + '.md';
  }
  return () => import(/* webpackChunkName:'doc.example.'  */ `../docs/${path}`);
}
