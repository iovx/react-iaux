import * as React from 'react';
import * as PropTypes from 'prop-types';

interface BaseProps {
  className?: string;
}

export type WrapperProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;

class Wrapper extends React.Component<WrapperProps, any> {
  static defaultProps = {
    style: {
      borderRadius: 2,
    }
  }
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const {className, ...props} = this.props;
    return (
      <div className={className} {...props}>
        {this.props.children}
      </div>
    );
  }
}

export default Wrapper;
