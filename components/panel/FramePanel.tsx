import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import FrameItem from "./FrameItem";

interface BaseProps {
  className?: string;
}

export type FramePanelProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;


class FramePanel extends React.Component<FramePanelProps, any> {
  static Item:typeof FrameItem;
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const {className, children, ...props} = this.props;
    const clsName = cx('wx-v2-frame-panel', className);
    return (
      <div className={clsName} {...props}>
        {children}
      </div>
    );
  }
}


export default FramePanel;
