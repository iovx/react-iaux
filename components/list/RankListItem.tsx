import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

interface BaseProps {
  num: number | string;
  name: string;
  count: number | string;
  className?: string;
}

export type RankListItemProps = {} & BaseProps;


class RankListItem extends React.Component<RankListItemProps, any> {
  static propTypes = {
    num: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  };

  render() {
    const {num, name, count, className, ...extraProps} = this.props;
    const cls = cx('wx-v2-list-item wx-v2-rank-item clear', className);
    return (
      <div className={cls} {...extraProps}>
        <span className="wx-v2-rank-num">{num}</span>
        <span className="wx-v2-rank-main">{name}</span>
        <span className="wx-v2-rank-data">{count}</span>
      </div>
    );
  }
}


export default RankListItem;
