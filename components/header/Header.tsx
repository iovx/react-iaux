import * as React from 'react';
import cx from 'classnames';
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";
import HeaderLogo from "./HeaderLogo";

interface BaseHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export type HeaderProps = {} & BaseHeaderProps & React.HTMLAttributes<HTMLDivElement>

class Header extends React.Component<HeaderProps, any> {
  static Left: typeof HeaderLeft;
  static Right: typeof HeaderRight;
  static Logo: typeof HeaderLogo;

  render() {
    const {className, children, ...extraProps} = this.props;
    const clsName = cx('wx-v2-header', className);
    return (
      <div className={clsName} {...extraProps}>
        {children}
      </div>
    )
  }
}

export default Header;
