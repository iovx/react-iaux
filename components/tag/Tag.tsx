import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames'
import TagItem from "./TagItem";

interface BaseProps {
  className?: string;
}

export type TagProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;

class Tag extends React.Component<TagProps, any> {
  static Item: typeof TagItem;
  static propTypes = {
    className: PropTypes.string,
  }

  render() {
    const {className, children, ...extraProps} = this.props;
    const clsName = cx('wx-v2-tags', className);
    return (
      <div className={clsName} {...extraProps}>
        {children}
      </div>
    );
  }
}


export default Tag;
