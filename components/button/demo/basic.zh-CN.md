---
order: -10
cate:Button
title: 基本使用
toc: false
timeline: true

---
这是一个基本描述信息, 哈哈~~

---


# 基本使用


```tsx
import Button from 'react-iaux/button';
import 'react-iaux/button/style';
import { toast } from 'react-iaux/message';
import 'react-iaux/message/style';

export default () => {

  return (
    <div style={{padding:20}}>
      <div style={{marginBottom: 10}}>
        <Button status='pure' onClick={()=>toast.success('GET START')}>GET START</Button>
      </div>
      <div style={{marginBottom: 10}}>
        <Button status='error' onClick={()=>toast.error('GET START')}>GET START</Button>
      </div>
    </div>
  )
}
```
