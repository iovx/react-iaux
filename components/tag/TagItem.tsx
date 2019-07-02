import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames'


interface BaseProps {
  className?: string;
  vIndex?: string;
  disabled: boolean;
}

export type TagItemProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;

class TagItem extends React.PureComponent<TagItemProps, any> {
  static defaultProps = {
    disabled: false,
  }
  static propTypes = {
    vIndex: PropTypes.number,
    disabled: PropTypes.bool,
  };

  render() {
    const {className, children, vIndex, disabled, ...extraProps} = this.props;
    const clsName = cx('wx-v2-tag-item', disabled ? 'wx-xs-disabled' : '', vIndex !== undefined ? `wx-v2-tag-item-${vIndex}` : '', className)
    return (
      <span className={clsName}  {...extraProps}>{children}</span>
    );
  }
}

export default TagItem;
