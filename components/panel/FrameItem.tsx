import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

interface BaseProps {
  className?: string;
}

export type FrameItemProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;


class FrameItem extends React.Component<FrameItemProps, any> {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const {className, ...props} = this.props;
    const frameCls = cx('wx-v2-xs-frame', className);
    return (
      <div className={frameCls} {...props}>
        {this.props.children}
      </div>
    );
  }
}

export default FrameItem;
