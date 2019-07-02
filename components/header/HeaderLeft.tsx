import * as React from 'react';
import cx from 'classnames';

interface BaseHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export type HeaderLeftProps = {} & BaseHeaderProps & React.HTMLAttributes<HTMLDivElement>

class HeaderLeft extends React.Component<HeaderLeftProps, any> {
  render() {
    const {className, children, ...extraProps} = this.props;
    const clsName = cx("wx-v2-header-left", className);
    return (
      <div className={clsName} {...extraProps}>
        {children}
      </div>
    )
  }
}

export default HeaderLeft;
