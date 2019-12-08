import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
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

  getExtraProps() {
    const { className, colClassName, imageStyle, ...extraProps } = this.props;
    return extraProps;
  }

  render() {
    const { className } = this.props;
    const wrapperCls = cx('wx-v2-image-grid', className);
    return (
      <Grid
        className={wrapperCls}
        render={this.renderCol}
        {...this.getExtraProps()}
      />
    );
  }
}

export default ImageGrid;
