import * as React from 'react';
import * as PropTypes from 'prop-types';
import ImageCard from "./ImageCard";

declare interface BaseProps {
  title: React.ReactNode,
}

export type CardProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;

class Card extends React.PureComponent<CardProps, {}> {
  static ImageCard: typeof ImageCard;
  static propTypes = {
    title: PropTypes.node,
  };

  render() {
    const {title, children, ...extraProps} = this.props;
    return (
      <div {...extraProps}>
        <div>{title}</div>
        <div>{children}</div>
      </div>
    );
  }
}

export default Card;
