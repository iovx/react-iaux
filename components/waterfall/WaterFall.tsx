import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import FallItem from './FallItem';
import { getOffset } from '../utils/dom';


interface BaseProps {

}

export type WaterFallItemType = {
  url: string;
  width: number;
  height: number;
  title: string;
  description: string;
}

export type WaterFallProps = {
  response?: boolean,
  itemWidth?: number;
  cols?: number;
  gap?: number;
  loader: (page: number, pageSize: number) => Promise<{ list: WaterFallItemType[], total: number }>;
  onLoadOver?: () => void;
  content?: React.ReactNode | ((data: DataItem) => React.ReactNode);
  contentCls?: string;
  contentStyle?: React.CSSProperties;
  holder?: React.ReactNode;
} & BaseProps & React.HTMLAttributes<HTMLDivElement>;


export type DataItem = {
  originWidth?: number;
  originHeight?: number;
  width: number;
  height: number;
  url: string;
  top: number;
  left: number;
  title: string;
  description: string;
}

export function waterFall(items: DataItem[], width: number, columns: number, gap = 7) {
  // 1- 确定列数  = 页面的宽度 / 图片的宽度
  const arr: DataItem[] = [];
  for (let i = 0; i < items.length; i++) {
    if (i < columns) {
      // 2- 确定第一行
      items[i].top = 0;
      items[i].left = (width + gap) * i;
      const newItem: DataItem = { ...items[i] };
      arr.push(newItem);
    } else {
      // 其他行
      // 3- 找到数组中最小高度  和 它的索引
      let minItem = arr[0];
      let index = 0;
      for (let j = 0; j < arr.length; j++) {
        if (minItem.height > arr[j].height) {
          minItem = arr[j];
          index = j;
        }
      }
      // 4- 设置下一行的第一个盒子位置
      // top值就是最小列的高度 + gap
      items[i].top = minItem.top + minItem.height + gap;
      // left值就是最小列距离左边的距离
      items[i].left = minItem.left;
      // 5- 修改最小列的高度
      // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
      arr[index].height = minItem.height + items[i].height + gap;
    }
  }
}

export function getWindowSize() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
  };
}

// scrollTop兼容性处理
export function getScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop;
}

const errorUrl = 'http://temp.im/660x880';

class WaterFall extends React.Component<WaterFallProps, any> {
  static defaultProps = {
    response: true,
    gap: 7,
  };
  static propTypes = {
    gap: PropTypes.number,
    itemWidth: PropTypes.number,
    cols: PropTypes.number,
    response: PropTypes.bool,
    content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    contentCls: PropTypes.string,
    contentStyle: PropTypes.object,
    onLoadOver: PropTypes.func,
    holder: PropTypes.node,
    loader: PropTypes.func.isRequired,
  };
  private wrapper: HTMLDivElement;
  private timer: any;

  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      isLoading: false,
      isEnd: false,
      width: 0,
      height: 0,
      page: 1,
      pageSize: 30,
    };
  }

  componentDidMount() {
    const width = this.wrapper.clientWidth;
    this.setState({ width }, () => {
      this.loadImage(this.state.page).then(null);
    });
    if (typeof  window === 'undefined') {
      return null;
    }
    if (this.props.response) {
      window.addEventListener('resize', this.resizeHandler);
    }
    window.addEventListener('scroll', this.scrollHandler);
  }

  componentWillUnmount() {
    if (typeof  window === 'undefined') {
      return null;
    }
    if (this.props.response) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    window.removeEventListener('scroll', this.scrollHandler);
  }

  getConfig = () => {
    const { itemWidth, cols, gap = 7 } = this.props;
    const result = {
      width: 0,
      cols: 3,
      gap,
    };
    result.gap = gap;
    if (itemWidth && cols) {
      result.width = itemWidth;
      result.cols = cols;
    } else if (itemWidth) {
      result.width = itemWidth;
      result.cols = Math.max(Math.floor((this.state.width + gap) / (gap + itemWidth)), 1);
    } else if (cols) {
      result.cols = cols;
      result.width = (this.state.width - (cols - 1) * gap) / cols;
    } else {
      result.width = 300;
      result.cols = Math.max(Math.floor(this.state.width / (300 + 2 * gap)), 1);
    }
    return result;
  };
  loadImage = (page, pageSize = 30) => {
    const config = this.getConfig();
    this.setState({ isLoading: true });
    const { loader, onLoadOver } = this.props;
    return loader(page, pageSize).then(response => {
      const { list, total } = response;
      if (this.state.dataList.length >= total) {
        this.setState({ isEnd: true }, () => {
          if (onLoadOver) {
            onLoadOver();
          }
        });
      }
      const width = config.width;
      const { dataList } = this.state;
      const newList = list.map(item => ({
        ...item,
        url: item.url,
        originWidth: item.width,
        originHeight: item.height,
        width,
        height: width / item.width * item.height,
        title: item.title,
        description: item.description,
        left: 0,
        top: 0,
      }));
      const nextDataList = dataList.concat(newList).map(item => ({ ...item, top: 0, left: 0 }));
      waterFall(nextDataList, width, config.cols, config.gap);
      this.setState({ dataList: nextDataList }, () => {
        this.setState({ isLoading: false });
      });
    });
  };
  loadNext = (items) => {
    if (getWindowSize().height + getScrollTop() >= items[items.length - 1].top + getOffset(this.wrapper).top) {
      this.setState({ page: this.state.page + 1 }, () => {
        this.loadImage(this.state.page).then(null);
      });
    }
  };
  resizeHandler = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({ width: this.wrapper.clientWidth }, () => {
        const config = this.getConfig();
        const nextDataList = [...this.state.dataList].map(item => ({
          ...item,
          left: 0,
          top: 0,
          width: config.width,
          height: config.width / item.width * item.height,
        }));
        waterFall(nextDataList, config.width, config.cols, config.gap);
        this.setState({ dataList: nextDataList });
      });
    }, 100);
  };
  scrollHandler = () => {
    const { isEnd, isLoading, dataList } = this.state;
    if (!isEnd && !isLoading) {
      this.loadNext(dataList);
    }
  };
  renderFallItem = (data: DataItem) => {
    const { content, contentCls, contentStyle, holder } = this.props;
    const { width, height, url, top, left, title, description } = data;
    return (
      <FallItem
        style={{ top, left }}
        key={url}
        width={width}
        height={height}
        url={url}
        title={title}
        description={description}
        errorUrl={errorUrl}
        contentStyle={contentStyle}
        contentCls={contentCls}
        holder={holder}
      >
        {typeof content === 'function' ? content(data) : content}
      </FallItem>
    );
  };

  render() {
    const { className, style, cols, itemWidth, gap, content, holder, contentCls, contentStyle, loader, onLoadOver, response, ...extraProps } = this.props;
    const clsName = cx('wx-v2-waterfall', className);
    const wrapperStyle: React.CSSProperties = {
      ...style,
    };
    const { dataList } = this.state;
    const len = dataList.length;
    if (len > 0) {
      const last = dataList[len - 1];
      wrapperStyle.height = last.top + last.height;
    }
    return (
      <div
        className={clsName}
        style={wrapperStyle}
        ref={(ref) => {
          this.wrapper = ref as HTMLDivElement;
        }}
        {...extraProps}
      >
        {
          dataList.map(item => this.renderFallItem(item))
        }
      </div>
    );
  }
}

export default WaterFall;

