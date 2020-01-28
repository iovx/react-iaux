import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import { MapType } from '../_utils/type';

interface RowProps {

}

export interface IColumn {
  style?: React.CSSProperties;
  align?: 'left' | 'center' | 'right';
  dataIndex: string;
  key?: string;
  width?: number;

  render?(value: any, row: MapType<any>, rowIndex: number, columnIndex: number): React.ReactNode;

  [index: string]: any;
}

interface BaseProps {
  columns: any[];
  dataSource: any[];
  className?: string;
  stripped?: boolean;
  hovered?: boolean;
  bordered?: boolean;
  caption?: React.ReactNode;
  tableClassName?: string;
  rowClassName?: string;
  headClassName?: string;
  rowKey?: string;
  rowProps?: RowProps;
}


export type TableProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;


class Table extends React.PureComponent<TableProps, {}> {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object),
    dataSource: PropTypes.arrayOf(PropTypes.object),
    caption: PropTypes.node,
    tableClassName: PropTypes.string,
    headClassName: PropTypes.string,
    rowClassName: PropTypes.string,
    stripped: PropTypes.bool,
    bordered: PropTypes.bool,
    hovered: PropTypes.bool,
  };

  renderCell = (row: MapType<any>, rowIndex: number, column: IColumn, columnIndex: number) => {
    const { render, dataIndex } = column;
    const value = row[dataIndex];
    return render ? render(value, row, rowIndex, columnIndex) : value;
  };
  getRowKey = (row: MapType<any>, rowKey: any, rowIndex: number) => {
    if (rowKey) {
      if (typeof rowKey === 'string') {
        return row[rowKey];
      }
      if (typeof rowKey === 'function') {
        return rowKey(row, rowIndex);
      }
    }
    return rowIndex;
  };

  render() {
    const { columns = [], className, stripped, dataSource = [], hovered, bordered = true, caption, tableClassName, rowClassName, headClassName, rowKey, rowProps, ...props } = this.props;
    const clsName = cx('wx-v2-table', stripped ? 'ws-striped' : '', hovered ? 'ws-hr' : '', bordered ? 'ws-bd' : '', className);
    return (
      <div className={tableClassName} {...props}>
        <table className={clsName}>
          {caption && <caption>{caption}</caption>}
          <colgroup>
            {columns.map(item => {
              const { style, align = 'left', dataIndex, key } = item;
              const colStyle = {
                textAlign: align,
                ...style,
              };
              return (
                <col key={`col-${key || dataIndex}`} className={item.className} style={colStyle} />
              );
            })}
          </colgroup>
          <thead>
          <tr className={headClassName}>
            {columns.map(item => {
              const { dataIndex, key, title, headerProps } = item;
              return (
                <th key={`row-${key || dataIndex}`} {...headerProps}>{title}</th>
              );
            })}
          </tr>
          </thead>
          <tbody>
          {dataSource.map((row, rowIndex) => {
            const tds = columns.map((column, columnIndex) => {
              const { dataIndex, key, style, align = 'left', className, render, headerProps, ...tdProps } = column;
              const colStyle = {
                textAlign: align,
                ...style,
              };
              return (
                <td
                  key={`cell-${key || dataIndex}`}
                  className={className}
                  style={colStyle}
                  {...tdProps}
                >{this.renderCell(row, rowIndex, column, columnIndex)}</td>
              );
            });
            return <tr key={this.getRowKey(row, rowKey, rowIndex)} className={rowClassName} {...rowProps}>{tds}</tr>;
          })}
          </tbody>
        </table>
      </div>
    );
  }
}


export default Table;
