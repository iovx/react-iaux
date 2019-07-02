import * as React from 'react';
import Player from "./Player";

interface BaseProps {

}

export type MediaProps = {} & BaseProps;


class Media extends React.Component<MediaProps, any> {
  static Player: typeof Player;
  static propTypes = {};

  render() {
    const {children, ...extraProps} = this.props;
    return (
      <div {...extraProps}>
        {children}
      </div>
    );
  }
}

export default Media;
