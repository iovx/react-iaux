import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import { getGridWidth } from './util';

interface BaseProps extends React.HTMLAttributes<HTMLDivElement> {

}

export type ColProps = {
  span?: number;
  offset?: number;
  gutter?: number;
} & BaseProps;


class Col extends React.Component<ColProps, any> {
  static propTypes = {
    className: PropTypes.string,
    span: PropTypes.number,
    offset: PropTypes.number,
    gutter: PropTypes.number,
  };
  static defaultProps = {
    span: 24,
    offset: 0,
    gutter: 0,
  };


  render() {
    const { span, offset, className, style, ...extraProps } = this.props;
    const colStyle = {
      ...style,
      width: getGridWidth(span),
      marginLeft: getGridWidth(offset),
    };
    const wrapperCls = cx('wx-v2-col', className);
    return (
      <div className={wrapperCls} style={colStyle} {...extraProps}>
        {this.props.children}
      </div>
    );
  }
}

export default Col;

