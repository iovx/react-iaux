import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

interface BaseProps {
  width?: number;
  label?: string;
  colon?: string;
  value?: string;
}

export type FieldItemProps = {} & BaseProps;


class FieldItem extends React.Component<FieldItemProps, any> {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    colon: PropTypes.string,
  };
  static defaultProps = {
    colon: ':',
    width: 100,
  };

  render() {
    const { width, label, colon, value } = this.props;
    const labelStyle = {
      width,
    };
    const valueStyle = {};
    const wrapperCls = cx('wx-v2-layout-field-item-view');
    const labelCls = cx('wx-v2-layout-field-item-view-label');
    const valueCls = cx('wx-v2-layout-field-item-view-value');
    return (
      <div className={wrapperCls}>
        <span className={labelCls} style={labelStyle} title={label}>{label} {colon}</span>
        <span className={valueCls} style={valueStyle}>{value}</span>
      </div>
    );
  }
}

export default FieldItem;
