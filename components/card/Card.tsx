import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import ImageCard from './ImageCard';

declare interface BaseProps {
  header: React.ReactNode,
}

export type CardProps = {
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  headerClassName?: string;
  bodyClassName?: string;
} & BaseProps & React.HTMLAttributes<HTMLDivElement>;

class Card extends React.PureComponent<CardProps, {}> {
  static ImageCard: typeof ImageCard;
  static propTypes = {
    title: PropTypes.node,
  };

  render() {
    const { header, children, className, headerStyle, bodyStyle, headerClassName, bodyClassName, ...extraProps } = this.props;
    const wrapperCls = cx('wx-v2-card', className);
    const headerCls = cx('wx-v2-card-header', headerClassName);
    const bodyCls = cx('wx-v2-card-body', bodyClassName);
    return (
      <div className={wrapperCls} {...extraProps}>
        <div style={headerStyle} className={headerCls}>{header}</div>
        <div style={bodyStyle} className={bodyCls}>{children}</div>
      </div>
    );
  }
}

export default Card;
