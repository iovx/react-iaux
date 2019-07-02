import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import NavLink from "./NavLink";
import NavItem from "./NavItem";

interface BaseProps {
  className?: string;
}

export type NavProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;


class Nav extends React.Component<NavProps, any> {
  static Item:typeof NavItem;
  static Link:typeof NavLink;
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const {className, ...extraProps} = this.props;
    const clsName = cx('wx-nav', className);
    return (
      <div className={clsName} {...extraProps}>
        {this.props.children}
      </div>
    )
  }
}

export default Nav;
