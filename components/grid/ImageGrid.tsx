import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import omit from 'omit.js';
import Grid from './Grid';
import { IImageGridDataItem } from './interface';

interface BaseProps extends React.HTMLAttributes<HTMLDivElement> {

}

export type ImageGridProps = {
  dataSource: IImageGridDataItem[];
  colClassName?: string;
  rowClassName?: string;
  cols?: number;
  imageStyle?: React.CSSProperties;
} & BaseProps;


class ImageGrid extends React.Component<ImageGridProps, any> {
  static propTypes = {
    colClassName: PropTypes.string,
  };
  static defaultProps = {
    cols: 3,
  };

  renderCol = (col: IImageGridDataItem, index: number, rowIndex: number) => {
    const { colClassName, imageStyle } = this.props;
    const colCls = cx('wx-v2-image-grid-item', colClassName);
    return (
      <div key={`${rowIndex}_${index}`} className={colCls}>
        <img src={col.url} title={col.title} style={imageStyle} />
      </div>
    );
  };

  render() {
    const { className, ...extraProps } = this.props;
    const wrapperCls = cx('wx-v2-image-grid', className);
    return (
      <Grid
        className={wrapperCls}
        render={this.renderCol}
        {...omit(extraProps, ['colClassName', 'imageStyle'])}
      />
    );
  }
}

export default ImageGrid;
