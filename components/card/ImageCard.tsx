import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames'

interface BaseImageCardProps {
  alt?: string;
  className?: string;
  imageStyle?: React.CSSProperties;
  imageClassName?: string;
  picUrl?: string;
  title?: React.ReactNode;
  titleStyle?: React.CSSProperties;
  titleClassName?: string;
}

export type ImageCardProps = {} & BaseImageCardProps & React.HTMLAttributes<HTMLDivElement>;

class ImageCard extends React.Component<ImageCardProps, any> {
  static defaultProps = {}
  static propTypes = {
    imageStyle: PropTypes.object,
    imageClassName: PropTypes.string,
    titleStyle: PropTypes.object,
    titleClassName: PropTypes.string,
    alt: PropTypes.string,
  }

  render() {
    const {className, imageStyle, imageClassName, alt, titleStyle, titleClassName, picUrl, title, ...extraProps} = this.props;
    const clsName = cx('wx-v2-card ws-hr', className)
    const imageCls = cx(imageClassName);
    const titleCls = cx('wx-v2-card-title', titleClassName)
    return (
      <div className={clsName} {...extraProps}>
        <div className='wx-v2-card-image'>
          <img src={picUrl} style={imageStyle}
               className={imageCls} alt={alt}/>
        </div>
        <div style={titleStyle} className={titleCls}>
          {title}
        </div>
      </div>
    );
  }
}


export default ImageCard;
