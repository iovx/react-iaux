export function getDocsList() {
  return {
    getStarted: loadMarkdown('getstarted'),
    intro: loadMarkdown('intro'),
    example: loadMarkdown('example'),
  };
}

export function loadMarkdown(name:string):()=>Promise<any>{
  let path = name;
  if(name.toLowerCase().indexOf('.md') !== name.length - 4){
    path = name+'.md';
  }
  return () => import(/* webpackChunkName:'doc-examp'  */ `./docs/${path}`);
}
