import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

type Orientation = "vertical" | "horizontal";

interface BaseProps {
  className?: string;
  orientation?: Orientation;
}

export type DividerProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;

class Divider extends React.Component<DividerProps, any> {
  static propTypes = {
    orientation: PropTypes.oneOf(["vertical", "horizontal"])
  };

  render() {
    const {className, orientation, ...props} = this.props;
    const clsName = cx('wx-divider', orientation === 'vertical' ? 'ws-vt' : 'ws-hr', className);
    return (
      <div className={clsName} {...props} />
    );
  }
}

export default Divider;
