---
order: -10
cate:基础组件
title: Alert
toc: true
timeline: true

---

这是一个基本描述信息, 哈哈~~

---

# 基本使用



## API

```tsx
import Alert from 'react-iaux/alert/index.tsx';
import 'react-iaux/alert/style';

export default () => {

  return (
    <div style={{padding:20}}>
        <Alert type='error' className='alert' style={{marginTop:10}}>
          原来一个也不能少！
        </Alert>
        <Alert type='success' className='alert' style={{marginTop:10}}>
          原来一个也不能少！
        </Alert>
        <Alert type='warning' className='alert' style={{marginTop:10}}>
          原来一个也不能少！0
        </Alert>
    </div>
  )
}

```
