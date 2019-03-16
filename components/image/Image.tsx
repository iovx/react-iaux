import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import BlobImage from "./BlobImage";

interface BaseProps {
  wrapperStyle?: React.CSSProperties;
  alt?: string;
}

export type ImageProps = {} & BaseProps & React.HTMLAttributes<HTMLImageElement>;


class Image extends React.Component<ImageProps, any> {
  static BlobImage: typeof BlobImage;
  static propTypes = {
    wrapperStyle: PropTypes.object,
  };

  render() {
    const {className, wrapperStyle, ...props} = this.props;
    const wrapperCls = cx('wx-v2-image', className);
    return (
      <div className={wrapperCls} style={wrapperStyle}>
        <img {...props} />
      </div>
    );
  }
}


export default Image;
