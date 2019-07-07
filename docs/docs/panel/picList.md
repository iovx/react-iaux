```typescript jsx
import {List, Panel} from 'react-iaux';

const {PicDesc: PicDescItem} = List;
const Test = ()=>{
    return (
       <Panel header={<span>今日要点</span>}>
         <PicDescItem
           data={{
             id: "1001",
             title: '微风平台',
             picUrl: '/entry.jpg',
             description: '原来一个也不能少',
             url: '#'
           }}
         />
         <PicDescItem
           align='left'
           data={{
             id: "1001",
             title: '微风平台',
             picUrl: '/entry.jpg',
             description: '原来一个也不能少',
             url: '#'
           }}
         />
         <PicDescItem
           align='right'
           data={{
             id: "1001",
             title: '微风平台',
             picUrl: '/entry.jpg',
             description: '原来一个也不能少',
             url: '#'
           }}
         />
         <PicDescItem
           data={{
             id: "1001",
             title: '微风平台',
             picUrl: '/entry.jpg',
             description: '原来一个也不能少',
             url: '#'
           }}
         />
         <PicDescItem
           align='left'
           data={{
             id: "1001",
             title: '微风平台',
             picUrl: '/entry.jpg',
             description: '原来一个也不能少',
             url: '#'
           }}
         />
         <PicDescItem
           align='right'
           data={{
             id: "1001",
             title: '微风平台',
             picUrl: '/entry.jpg',
             description: '原来一个也不能少',
             url: '#'
           }}
         />
       </Panel>
    )
}
```
