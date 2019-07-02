import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

interface BaseProps {
  title: string;
  count: number | string;
  className?: string;
}

export type CateListItemProps = {} & BaseProps;


class CateListItem extends React.Component<CateListItemProps, any> {
  static propTypes = {
    title: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  };

  render() {
    const {title, count, className, ...extraProps} = this.props;
    const cls = cx('wx-v2-list-item wx-v2-rank-item clear', className);
    return (
      <div className={cls} {...extraProps}>
        <span className="wx-v2-rank-main">{title}</span>
        <span className="wx-v2-rank-count">{count}</span>
      </div>
    );
  }
}


export default CateListItem;
