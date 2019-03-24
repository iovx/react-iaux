import * as React from 'react';
import {WaterFall} from "react-iaux";
import * as style from './Wall.less';

const styles = style as any;

const url = 'http://api.assure.com/api/resource/image/getList';
const imgUrl = 'http://api.assure.com/api/resource/image/thumb/';

class Wall extends React.Component {

  onLoadOver = () => {
    // alert('onLoadOver')
  }

  loader = (page, pageSize) => {
    return fetch(`${url}?page=${page}&pageSize=${pageSize}`).then(response => response.json()).then(response => {
      const {data: {list, total}} = response;
      list.forEach(item => {
        item.url = `${imgUrl}${item.hash}`;
      })
      return {list, total};
    });
  }
  content = (data) => {
    return (
      <div className={styles.card}>
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
