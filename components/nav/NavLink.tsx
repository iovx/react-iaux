import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

interface BaseProps {
  className?: string;
}

export type NavLinkProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;


class NavLink extends React.Component<NavLinkProps, any> {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const {className, ...extraProps} = this.props;
    const clsName = cx('wx-v2-nav-item ws-link', className);
    return (
      <div className={clsName} {...extraProps}>
        {this.props.children}
      </div>
    )
  }
}

export default NavLink;
