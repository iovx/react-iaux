import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import {tuple} from "../_utils/type";

const statusType = tuple('success', 'info', 'warning', 'error', 'default', 'primary', 'pure', 'loading');

interface BaseProps {
  status?: typeof statusType[number];
  icon?: React.ReactNode;
  title?: React.ReactNode;
  content?: React.ReactNode;
}

export type NoticeProps = {} & BaseProps;


class Notice extends React.Component<NoticeProps, any> {
  static propTypes = {
    status: PropTypes.oneOf(statusType),
    icon: PropTypes.node,
    title: PropTypes.string,
    content: PropTypes.node,
  };

  static defaultProps = {
    title: '你收到一条消息',
    icon: <i className="wx-iconfont icon-info"/>,
    content: null,
    status: 'primary',
  }

  render() {
    const {status, icon, title, content} = this.props;
    const wrapperCls = cx('wx-v2-notification', `ws-${status}`);
    return (
      <div>
        <div className={wrapperCls}>
          <div className="wx-xs-header">
            <div className="wx-xs-icon">{icon}</div>
            <div className="wx-xs-title">{title}~</div>
          </div>
          <div className="wx-xs-content wx-xs-text">{content || this.props.children}</div>
        </div>
      </div>
    );
  }
}


export default Notice;
