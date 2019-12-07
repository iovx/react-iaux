import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

interface BaseProps extends React.HTMLAttributes<HTMLDivElement> {

}

export type RowProps = {} & BaseProps;


class Row extends React.Component<RowProps, any> {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const { className, ...extraProps } = this.props;
    const wrapperCls = cx('wx-v2-row', className);
    return (
      <div className={wrapperCls} {...extraProps}>
        {this.props.children}
      </div>
    );
  }
}

export default Row;

