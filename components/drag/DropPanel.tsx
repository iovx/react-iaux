import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames'

interface BaseProps {
  onDrop?: (data: any, e: React.DragEvent) => void;
  activeClassName?: string;
  activeStyle?: React.CSSProperties;
}

export type DropPanelProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;


class DropPanel extends React.Component<DropPanelProps, any> {
  static propTypes = {
    onDrop: PropTypes.func,
    onDragLeave: PropTypes.func,
    onDragOver: PropTypes.func,
    activeStyle: PropTypes.object,
    activeClassName: PropTypes.string,
  };
  static defaultProps = {
    onDrop: null,
    onDragLeave: null,
    onDragOver: null,
    activeStyle: null,
    activeClassName: '',
  }
  state = {
    active: false,
  }
  onDrop = () => {
    const {onDrop} = this.props;
    return (e: React.DragEvent) => {
      e.preventDefault();
      e.persist();
      const data = JSON.parse(e.dataTransfer.getData('data'));
      this.setState({active: false}, () => {
        if (onDrop) {
          onDrop(data, e);
        }
      });
    }
  }
  onDragOver = () => {
    return ev => {
      ev.preventDefault();
      this.setState({active: true});
    };
  };
  onDragLeave = () => {
    return ev => {
      ev.preventDefault();
      this.setState({active: false});
    };
  };

  render() {
    const {active} = this.state;
    const {className, activeClassName, onDrop, onDragLeave, onDragOver, style, activeStyle, ...extraProps} = this.props;
    const wrapperCls = cx('wx-drop-wrapper', active ? activeClassName : className);
    return (
      <div
        onDrop={this.onDrop()}
        onDragLeave={this.onDragLeave()}
        onDragOver={this.onDragOver()}
        className={wrapperCls}
        style={active ? activeStyle : style}
        {...extraProps}
      >
        {this.props.children}
      </div>
    );
  }
}

export default DropPanel;
