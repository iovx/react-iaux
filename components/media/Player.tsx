import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

interface BaseProps {
  src?: string;
  onTimeUpdate?: (currentTime: number, duration: number, e) => void;
  onProgress?: (e) => void;
}

export type PlayerProps = {} & BaseProps & React.HTMLAttributes<HTMLAudioElement>;

class Player extends React.Component<PlayerProps, any> {
  static propTypes = {
    src:PropTypes.string,
  };

  onPlay = (e) => {
    console.log(e.target);
    console.log('onPlay');
  }
  onProgress = (e) => {
    console.log(e.target)
  }
  onTimeUpdate = (e) => {
    const {onTimeUpdate} = this.props;
    const {target} = e;
    const {currentTime, duration} = target;
    if (onTimeUpdate) {
      onTimeUpdate(currentTime, duration, e);
    }
  }

  render() {
    const {src, className, onTimeUpdate, ...extraProps} = this.props;
    const cls = cx('x-v2-media-player', className);
    return (
      <div className={cls} >
        <audio
          {...extraProps}
          src={src}
          onPlay={this.onPlay}
          onTimeUpdate={this.onTimeUpdate}
          onProgress={this.onProgress}
        />
      </div>
    );
  }
}
export default Player;
