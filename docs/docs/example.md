## Example

<div align="center">
<img src="/entry.jpg" width='90%' alt="微风平台"/>
</div>

```js
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {androidstudio} from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import code from './source';

const Component = () => {
    
    return (
        <SyntaxHighlighter language='javascript' style={androidstudio}>
            {code.source}
        </SyntaxHighlighter>
    )
}

export default Component;

```

## API

| 参数       | 说明           | 类型             | 默认值       |
|------------|----------------|------------------|--------------|
| labelStyle  | 左侧标签样式 | object | 无 |
| inputStyle  | 输入框样式 | object | 无 |
| rightLabelStyle  | 右侧标签样式 | object | 无 |
| sharp | hex 的'#'标签 | boolean | false |
