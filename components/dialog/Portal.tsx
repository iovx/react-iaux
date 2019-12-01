import * as  React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';

export type PortalProps = {
  visible: boolean;
}

class Portal extends React.PureComponent<PortalProps, any> {

  static propTypes = {
    visible: PropTypes.bool,
  };

  static defaultProps = {
    visible: true,
  };

  renderPortal() {
    const { visible, children } = this.props;
    return (
      <React.Fragment>
        {visible && children}
      </React.Fragment>
    );
  }

  render() {
    if (typeof  document !== 'undefined') {
      return ReactDOM.createPortal(this.renderPortal(), document.body);
    }
    return null;
  }
}

export default Portal;
