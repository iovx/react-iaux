import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';

interface BaseProps {

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
    if (!this.node) {
      this.node = document.createElement('div');
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
