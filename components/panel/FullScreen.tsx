import * as React from 'react';
import * as PropTypes from 'prop-types';

interface BaseProps {
  className?: string;
}

export type FullScreenProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;


class FullScreen extends React.Component<FullScreenProps, any> {
  static propTypes = {
    className: PropTypes.string,
  };
  handleFullScreen = (e) => {
    const ele = e.target.nextSibling;
    if (document.body.requestFullscreen) {
      ele.requestFullscreen();
    }
  }

  render() {
    return (
      <div className="wx-v2-wrapper-full">
        <div>
          <div onClick={this.handleFullScreen}>全屏</div>
          <div id='fullScreen' className='"wx-v2-wrapper-full-content"'>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
export default FullScreen;
