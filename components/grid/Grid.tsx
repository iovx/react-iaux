import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import omit from 'omit.js';
import { IGridDataItem } from './interface';
import ImageGrid from './ImageGrid';

interface BaseProps extends React.HTMLAttributes<HTMLDivElement> {

}

export type GridProps<T = IGridDataItem> = {
  gutter?: number;
  cols?: number;
  render?(col: T, colIndex: number, rowIndex: number): React.ReactNode;
  dataSource: T[];

} & BaseProps;


class Grid extends React.Component<GridProps, any> {
  static Image: typeof ImageGrid;
  static propTypes = {
    gutter: PropTypes.number,
    cols: PropTypes.number,
    render: PropTypes.func,
    dataSource: PropTypes.array,
  };
  static defaultProps: GridProps = {
    gutter: 40,
    cols: 4,
    dataSource: [],
  };

  renderCol<T = IGridDataItem>(col: T, colIndex: number, rowIndex: number) {
    const { render } = this.props;
    if (!render) {
      return null;
    }
    return (
      <div className='wx-v2-grid-col' key={`${rowIndex}_${colIndex}`}>
        {render(col, colIndex, rowIndex)}
      </div>
    );
  }

  renderRow<T = IGridDataItem>(row: T[], rowIndex: number) {
    const rowCls = cx('wx-v2-grid-row');
    return (
      <div className={rowCls} key={rowIndex}>
        {row.map((colItem, colIndex) => this.renderCol(colItem, colIndex, rowIndex))}
      </div>
    );
  }

  renderRows<T = IGridDataItem>() {
    const { cols, dataSource = [] } = this.props;
    const count = dataSource.length;
    const gridData: T[][] = [];
    const temp: T[] = [];
    (dataSource as T[]).forEach((item, idx) => {
      temp.push(item);
      if ((idx + 1) % (cols as number) === 0 || idx === count - 1) {
        gridData.push([...temp]);
        temp.length = 0;
      }
    });
    return gridData.map((rowItem, rowIndex) => {
      return this.renderRow(rowItem, rowIndex);
    });
  }

  render() {
    const { className, ...extraProps } = this.props;
    const wrapperCls = cx('wx-v2-grid', className);
    return (
      <div className={wrapperCls} {...omit(extraProps, ['render', 'cols', 'dataSource'])}>
        {this.renderRows()}
      </div>
    );
  }
}

export default Grid;
