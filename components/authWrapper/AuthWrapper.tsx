import * as React from 'react';
import * as PropTypes from 'prop-types';

interface BaseProps {

}

export type AuthWrapperProps = {
  access: boolean;
} & BaseProps;


class AuthWrapper extends React.Component<AuthWrapperProps, any> {
  static propTypes = {
    access: PropTypes.bool.isRequired,
  };

  render() {

    return (
      <React.Fragment>
        {this.props.access ? this.props.children : null}
      </React.Fragment>
    );
  }
}

export default AuthWrapper;
