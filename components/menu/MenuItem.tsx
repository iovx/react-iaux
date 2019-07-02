import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import {Link} from 'react-router-dom';

interface BaseProps {
  url?: string | null | undefined;
  text?: React.ReactNode;
}

export type MenuItemProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;


class MenuItem extends React.Component<MenuItemProps, any> {
  static propTypes = {
    url: PropTypes.string,
    text: PropTypes.node,
  };

  render() {
    const {url, text, className, ...extraProps} = this.props;
    const itemCls = cx('wx-v2-menu-item', className);
    return (
      <div className={itemCls} {...extraProps}>
        {url ? <Link to={url}>{text}</Link> : text}
      </div>
    );
  }
}

export default MenuItem;
