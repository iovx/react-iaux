export function loadMarkdown(name){
  let path = name;
  if(name.toLowerCase().indexOf('.md') === -1){
    path = name+'.md';
  }
  return () => import(/* webpackChunkName:'doc.examp.'  */ `../docs/${path}`);
}