import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import FramePanel from "./FramePanel";
import Section from "./Section";
import Wrapper from "./Wrapper";
import DragWrapper from "./DragWrapper";
import FullScreen from "./FullScreen";

interface BaseProps {
  className?: string;
  header?: React.ReactNode;
}

export type PanelProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;


class Panel extends React.PureComponent<PanelProps, any> {
  static Frame: typeof FramePanel;
  static Section: typeof Section;
  static Wrapper: typeof Wrapper;
  static DragWrapper: typeof DragWrapper;
  static FullScreen: typeof FullScreen;
  static propTypes = {
    header: PropTypes.node,
    className: PropTypes.string,
  };

  render() {
    const {className, header, children, ...props} = this.props;
    const clsName = cx('wx-v2-panel', className);
    return (
      <div>
        <div className={clsName} {...props}>
          <div className="wx-v2-panel-header">{header}</div>
          <div className="wx-v2-panel-body">{children}</div>
        </div>
      </div>
    );
  }
}

export default Panel;
