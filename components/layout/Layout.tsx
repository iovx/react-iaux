import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import { listToMap } from './util';
import { MapType } from '../_utils/type';
import { IField, ILayout } from './interface';
import Row from '../row/Row';
import Col from '../col/Col';
import FieldItem from './FieldItem';

interface BaseProps {

}

export type LayoutProps = {
  fields: IField[];
  layout: ILayout;
  width?: number;
  rowClassName?: string;
  colClassName?: string;
  rowStyle?: React.CSSProperties;
  colStyle?: React.CSSProperties;
} & BaseProps & React.HTMLAttributes<HTMLDivElement>;


class Layout extends React.Component<LayoutProps, any> {
  static propTypes = {
    fields: PropTypes.array,
  };
  static defaultProps = {
    width: 80,
  };
  fieldMap: MapType<IField>;

  constructor(props) {
    super(props);
    const { fields } = this.props;
    this.fieldMap = listToMap(fields, 'id');
  }

  getFieldById(id) {
    return this.fieldMap[id];
  }

  /**
   * 渲染布局
   * @param {*} item 布置项
   * @param {*} screen 屏幕规格
   * @param {*} inner 内部迭代，为上次输出
   */
  renderLayout(item, screen, inner) {
    const { children } = item;
    if (children) {
      inner = children.map(childItem => {
        return this.renderLayout(childItem, screen, inner);
      });
    }
    return this.renderLayoutItem(item, screen, inner);
  }

  /**
   * 渲染布局项
   * @param {*} item 布置项
   * @param {*} screen 屏幕规格
   * @param {*} inner 内部迭代，为上次输出
   */
  renderLayoutItem(item, screen, inner) {
    const { type, span, offset, fieldId, id } = item;
    const key = `${id}`;
    const { rowStyle, rowClassName, colClassName, colStyle } = this.props;
    const rowCls = cx('wx-v2-layout-row', rowClassName);
    const colCls = cx('wx-v2-layout-col', colClassName);
    switch (type) {
      case 'row':
        return <Row key={key} style={rowStyle} className={rowCls}>{inner}</Row>;
      case 'col': {
        const colProps = { span, offset };
        return (
          <Col {...colProps} key={key} style={colStyle} className={colCls}>
            {inner}
          </Col>
        );
      }
      case 'item': {
        const field = this.getFieldById(fieldId);
        // 配置了布局，但未在Fields中配置
        if (!field) {
          throw new TypeError(
            `[Layout Config] : The form field width id=${fieldId} is not found ~ please check in fields config !`,
          );
        }
        return this.renderField(field);
      }
      default:
    }
  }

  renderField(field) {
    const { label, id, value } = field;
    const width = field.width || this.props.width;
    return <FieldItem width={width} key={id} label={label} value={`${value}`} />;
  }

  render() {
    const { className, layout, fields, ...extraProps } = this.props;
    const wrapperCls = cx('wx-v2-layout', className);
    return (
      <div className={wrapperCls} {...extraProps}>
        {
          layout.map(layoutItem => {
            return this.renderLayout(layoutItem, screen, null);
          })
        }
      </div>
    );
  }
}

export default Layout;
