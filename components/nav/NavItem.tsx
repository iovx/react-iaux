import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

interface BaseProps {
  className?: string;
}

export type NavItemProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;


class NavItem extends React.Component<NavItemProps, any> {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const {className, ...extraProps} = this.props;
    const clsName = cx('wx-v2-nav-item wx-v2-xs-link', className);
    return (
      <div className={clsName} {...extraProps}>
        {this.props.children}
      </div>
    )
  }
}

export default NavItem;
