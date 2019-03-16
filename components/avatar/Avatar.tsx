import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

interface BaseProps {
  src?: string;
  onAvatarClick?: React.MouseEventHandler;
  round?: boolean;
}

export type AvatarProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;

class Avatar extends React.Component<AvatarProps, any> {
  static propTypes = {
    src: PropTypes.string,
    circle: PropTypes.bool,
    onAtClick: PropTypes.func,
  };

  render() {
    const {src, className, onAvatarClick, children, round = true, ...props} = this.props;
    const clsName = cx('wx-v2-avatar', className);
    return (
      <div className={clsName} {...props}>
        <div className="wx-v2-avatar-face" onClick={onAvatarClick}>
          {src ? <img src={src} className={round ? 'ws-round' : ''}/> : null}
        </div>
        <div className="wx-v2-avatar-content">{children}</div>
      </div>
    )
  }
}

export default Avatar;
