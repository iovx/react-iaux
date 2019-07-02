import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';


interface BaseProps {
  className?: string;
}

export type FooterProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;


class Footer extends React.PureComponent<FooterProps, any> {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const {className, children, ...props} = this.props;
    const footerCls = cx('wx-v2-footer', className);
    return (
      <div className={footerCls} {...props}>
        {children}
      </div>
    );
  }
}

export default Footer;
