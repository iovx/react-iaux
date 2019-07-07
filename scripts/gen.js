const fs = require('fs');
const glob = require('glob');

glob("../docs/**/*.md", function (err, list) {
  if (!err) {
    const indexes = list.map(item => {
      return item.replace(/\.\.\/docs\/docs\/?(.*)\.md/, "$1");
    });
    const tpl = [];
    tpl.push(`import {loadMarkdown} from "../utils";\n`);
    tpl.push(`export function getDocsList() {`);
    tpl.push(`\tconst result = {};`);
    indexes.forEach(idx=>{
      tpl.push(`\tresult['${idx}'] = loadMarkdown('${idx}');`);
    });
    tpl.push(`\treturn result;`);
    tpl.push(`}`);
    fs.writeFileSync('../docs/docs/docs.ts', tpl.join('\n'));
  }
});

function generateContents() {
  const content = fs.readFileSync('../lib/index.d.ts', {encoding: 'utf-8'});
  const reg = /as\s+(\w+)?\s/i;
  const data = content.split('\n');
  const obj = {
    title: '微风平台UI',
    contents: [
      {
        id: 'v1',
        type: 'intro',
        group: 'group',
        name: 'Started',
        title: '开始使用',
        children: [
          {
            id: 'v11',
            type: 'intro',
            path: '/',
            group: 'group',
            name: 'getStarted',
            title: 'getStarted',
            children: []
          }
        ],
      },
      {
        id: 'v2',
        type: 'group',
        group: 'common',
        name: 'common',
        title: '通用组件',
        children: [],
      }
    ]
  };

  data.forEach((item, idx) => {
    if (reg.test(item)) {
      const s = item.match(reg)[1];
      obj.contents[1].children.push({
        id: 'v' + idx,
        type: 'component',
        path: '/component/',
        group: 'common',
        name: s,
        title: s,
        children: [],
      });
    }
  });

// console.log(obj.contents[1])
  fs.writeFileSync("../docs/docs/contents.ts", 'export default ' + JSON.stringify(obj, "", "\t"));
}

function writeToTs(file, obj) {
  fs.writeFileSync(file, 'export default ' + JSON.stringify(obj, "", "\t"));

}
