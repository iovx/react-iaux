import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

interface BaseProps {
  className?: string;
  title?: React.ReactNode;
}

export type SectionProps = {} & BaseProps;


class Section extends React.Component<SectionProps, any> {
  static propTypes = {
    title: PropTypes.node,
  };

  render() {
    const {title, className, ...props} = this.props;
    const clsName = cx("wx-section", "ws-default", className);
    return (
      <div className={clsName} {...props}>
        <div className="wx-section-title ws-red">{title}</div>
        <div className="wx-section-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Section;
