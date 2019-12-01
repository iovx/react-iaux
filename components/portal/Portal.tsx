import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

interface BaseProps {
  className?:string;
}

export type PortalProps = {
  onOpen?: (node: HTMLElement | null) => void;
} & BaseProps;


class Portal extends React.Component<PortalProps, {}> {
  static propTypes = {
    onOpen: PropTypes.func,
  };

  private node: HTMLElement | null;

  constructor(props) {
    super(props);
    this.state = {
      active: false,
    }
  }

  getPrefixCls(suffix?: string) {
    return `wx-v2-portal${suffix ? '-' + suffix : ''}`;
  }
  open(props = this.props) {
    this.setState({active: true});
    this.renderPortal(props);
    const {onOpen} = this.props;
    if (onOpen) {
      onOpen(this.node);
    }
  }

  close() {
    if (this.node) {
      ReactDOM.unmountComponentAtNode(this.node);
      document.body.removeChild(this.node);
    }
    this.node = null;
  }

  renderPortal(props) {
    if (typeof  document === 'undefined') {
      return null;
    }
    if (!this.node) {
      const cls = cx(this.getPrefixCls(), props.className);
      this.node = document.createElement('div');
      this.node.className = cls;
      document.body.appendChild(this.node);
    } else {

    }
    let {children} = props;
    if (typeof children === 'function') {
      children = React.cloneElement(children, {closePortal: this.close})
    }
    return ReactDOM.createPortal(children, this.node);
  }

  render() {
    return this.renderPortal(this.props);
  }
}

export default Portal;
