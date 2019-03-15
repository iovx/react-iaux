import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import ListItem from "./ListItem";
import PicDescItem from "./PicDescItem";
import RankListItem from "./RankListItem";
import CateListItem from "./CateListItem";

interface BaseProps {
  className?: string;
}

export type ListProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;


class List extends React.Component<ListProps, any> {
  static Item: typeof ListItem;
  static PicDesc: typeof PicDescItem;
  static RandItem: typeof RankListItem;
  static CateItem: typeof CateListItem;
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const {className, children, ...props} = this.props;
    const clsName = cx('wx-v2-list ws-bd', className);
    return (
      <div className={clsName} {...props}>
        {children}
      </div>
    );
  }
}

export default List;
