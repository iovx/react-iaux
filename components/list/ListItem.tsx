import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';


interface BaseProps {

}

export type ListItemProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;


class ListItem extends React.Component<ListItemProps, any> {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const {className, ...extraProps} = this.props;
    const cls = cx('wx-v2-list-item wx-v2-rank-item clear', className);
    return (
      <div className={cls} {...extraProps}>
        <span className="wx-v2-rank-num">1</span>
        <span className="wx-v2-rank-main">往事如风</span>
        <span className="wx-v2-rank-data">42</span>
      </div>
    );
  }
}


export default ListItem;
