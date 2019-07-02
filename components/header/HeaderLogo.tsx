import * as React from 'react';
import cx from 'classnames';

interface BaseHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export type HeaderLogoProps = {} & BaseHeaderProps & React.HTMLAttributes<HTMLDivElement>

class HeaderLogo extends React.Component<HeaderLogoProps, any> {
  render() {
    const {className, children, ...extraProps} = this.props;
    const clsName = cx("wx-v2-header-logo", className);
    return (
      <div className={clsName} {...extraProps}>
        {children}
      </div>
    )
  }
}

export default HeaderLogo;
