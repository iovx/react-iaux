import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

type sizeType = "sm" | "nm" | "lg";
type alignType = "left" | "right";

interface BaseProps {
  data: {
    picUrl: string;
    url: string;
    title: string;
    description: string;
    id: string;
  }
  align?: alignType;
  size?: sizeType;
}

export type PicDescItemProps = {} & BaseProps;


class PicDescItem extends React.Component<PicDescItemProps, any> {
  static defaultProps = {
    align: 'left',
    size: 'nm',
    data: {},
  }
  static propTypes = {
    data: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      picUrl: PropTypes.string,
      url: PropTypes.string,
    }),
    align: PropTypes.string,
    size: PropTypes.string,
  };

  render() {
    const {data: {picUrl, url, title, description, id}, align, size, ...props} = this.props;
    const wrapperCls = cx('wx-v2-list-tw-item', `ws-${align}`, `ws-${size}`, 'clear');
    return (
      <div className={wrapperCls} key={id} {...props}>
        <div className="wx-xs-tw-photo img-fill">
          <img src={picUrl} alt={title}/>
          <a href={url} className="mask-link">&nbsp;</a>
        </div>
        <div className="wx-xs-tw-content o2-sl">
          <div className="item-title">{title}</div>
          <div className="item-desc">{description}</div>
        </div>
      </div>
    )
  }
}

export default PicDescItem;
