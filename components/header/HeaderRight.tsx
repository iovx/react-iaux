import * as React from 'react';
import cx from 'classnames';

interface BaseHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export type HeaderRightProps = {} & BaseHeaderProps & React.HTMLAttributes<HTMLDivElement>

class HeaderRight extends React.Component<HeaderRightProps, any> {
  render() {
    const {className, children, ...extraProps} = this.props;
    const clsName = cx("wx-v2-header-right", className);
    return (
      <div className={clsName} {...extraProps}>
        {children}
      </div>
    )
  }
}

export default HeaderRight;
