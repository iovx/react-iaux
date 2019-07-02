import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import Portal from "../portal";

export interface BaseProps {
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  style?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
}

export  type DialogProps = {
  visible?: boolean;
  title?: React.ReactNode;
} & BaseProps;

export interface DialogState {
  visible: boolean;
}

class Dialog extends React.Component<DialogProps, DialogState> {
  static defaultProps = {
    visible: false,
    title: "",
  }
  static propTypes = {
    visible: PropTypes.bool,
  };
  private portalRef: Portal|null;

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
    console.log(this.portalRef)
  }

  componentWillReceiveProps(nextProps: DialogProps) {
    const {visible=false} = nextProps;
    if (visible !== this.props.visible) {
      this.setState({visible});
    }
  }

  getPrefix() {
    return 'wx-iv';
  }

  getClassName() {
    const {className} = this.props;
    const prefix = this.getPrefix();
    return cx([
      `${prefix}-dialog`,
      className,
    ]);
  }

  render() {
    const {visible} = this.state;
    const {title, headerClassName, headerStyle, bodyClassName, bodyStyle, children} = this.props;
    const prefix = this.getPrefix();
    const headerCls = cx([`${prefix}-header`], headerClassName);
    const bodyCls = cx([`${prefix}-body`], bodyClassName);
    if (visible) {
      return (
        <Portal ref={(ref) => this.portalRef = ref}>
          <div className={this.getClassName()}>
            <div className={headerCls} style={headerStyle}>{title}</div>
            <div className={bodyCls} style={bodyStyle}>{children}</div>
          </div>
        </Portal>
      );
    }
    return null;
  }
}

export default Dialog;
