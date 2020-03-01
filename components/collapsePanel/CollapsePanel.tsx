import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

export interface BaseProps {
  headerClassName?: string;
  bodyClassName?: string;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  header: React.ReactNode;
  body: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;

  onChange?(open: boolean): void;
}

export type CollapsePanelProps = BaseProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>;

export interface CollapsePanelState {
  open: boolean;
}

class CollapsePanel extends React.Component<CollapsePanelProps, CollapsePanelState> {
  static propTypes = {
    header: PropTypes.node.isRequired,
    body: PropTypes.node.isRequired,
    open: PropTypes.bool,
    defaultOpen: PropTypes.bool,
    onChange: PropTypes.func,
    headerClassName: PropTypes.string,
    bodyClassName: PropTypes.string,
    headerStyle: PropTypes.object,
    bodyStyle: PropTypes.object,
  };
  static defaultProps = {
    headerClassName: '',
    bodyClassName: '',
    defaultOpen: false,
  };

  constructor(props: CollapsePanelProps) {
    super(props);
    const { defaultOpen, open } = props;
    this.state = {
      open: !!(open || defaultOpen),
    };
  }

  static getDerivedStateFromProps(props: CollapsePanelProps) {
    if ('open' in props) {
      return {
        open: props.open,
      };
    }
    return null;
  }

  handleClick = () => {
    if ('open' in this.props) {
      this.triggerChange(!this.state.open);
    } else {
      this.setState(prevState => ({
        open: !prevState.open,
      }), () => {
        this.triggerChange(this.state.open);
      });
    }
  };

  triggerChange(open: boolean) {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(open);
    }
  }

  render() {
    const { header, body, headerClassName, headerStyle, bodyClassName, bodyStyle, className, open: p, defaultOpen, onChange, ...extraProps } = this.props;
    const { open } = this.state;
    const wrapperCls = cx('wx-v2-collapsePanel', className);
    const headerCls = cx('wx-v2-collapsePanel-header', headerClassName);
    const bodyCls = cx('wx-v2-collapsePanel-body', {
      'wx-v2-collapse-panel-hide': !open,
    }, bodyClassName);
    return (
      <div className={wrapperCls} {...extraProps}>
        <div style={headerStyle} className={headerCls} onClick={this.handleClick}>{header}</div>
        <div style={bodyStyle} className={bodyCls}>{body}</div>
      </div>
    );
  }
}

export default CollapsePanel;
