---
order: -10
cate:Loading
title: 基本使用
toc: false
timeline: true

---
这是一个基本描述信息, 哈哈~~

---


# 基本使用


```tsx
import Loading from 'react-iaux/loading';
import 'react-iaux/loading/style';

export default () => {

  return (
    <div style={{padding:20}}>
      <Loading text="加载中..." mask={false}/>
    </div>
  )
}
```
