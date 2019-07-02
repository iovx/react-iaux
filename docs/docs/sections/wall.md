```jsx
import * as React from 'react';
import {WaterFall} from "react-iaux";
import * as style from './Wall.less';

const styles = style as any;

const url = 'http://v.ruwind.top/api/resource/image/getList';
const imgUrl = 'http://v.ruwind.top/api/resource/image/thumb/';
const srcUrl = 'http://v.ruwind.top/api/resource/image/';

class Wall extends React.Component {

  onLoadOver = () => {
    // alert('onLoadOver')
  }
  onClick = (data) => {
    return () => {
      const {src} = data;
      window.open(src,'_blank');
    }
  }
  loader = (page, pageSize) => {
    return fetch(`${url}?page=${page}&pageSize=${pageSize}`).then(response => response.json()).then(response => {
      const {data: {list, total}} = response;
      const dataList = list.map(item => {
        const {hash, title, description, id, width, height} = item;
        return {
          id,
          url: `${imgUrl}${hash}`,
          src: `${srcUrl}${hash}`,
          title,
          description,
          width,
          height,
        }
      })
      return {list:dataList, total};
    });
  }
  content = (data) => {
    return (
      <div className={styles.card} onClick={this.onClick(data)}>
        <div> 李克勤</div>
        <div> 一个也不能少</div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <WaterFall
          loader={this.loader}
          content={this.content}
          contentCls={styles.content}
          onLoadOver={this.onLoadOver}
          holder={<div className={styles.loading}>Loading...</div>}
          cols={4}
        />
      </div>
    );
  }
}

export default Wall;

```
