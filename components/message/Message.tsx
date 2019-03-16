import * as React from 'react';
import * as PropTypes from 'prop-types';
import Notice from "./Notice";
import toast from "./toast";

interface BaseProps {
  icon?: React.ReactNode;
  content?: React.ReactNode;
}

export type MessageProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;


class Message extends React.Component<MessageProps, any> {
  static Notice: typeof Notice;
  static toast = toast;
  static defaultProps = {
    icon: <i className="wx-iconfont icon-warn"></i>,
  }
  static propTypes = {
    icon: PropTypes.node,
    content: PropTypes.node,
  };

  render() {
    const {icon, content, ...extraProps} = this.props;
    return (
      <div  {...extraProps} className="wx-v2-message wx-xs-warning">
        <div className="wx-xs-icon">{icon}</div>
        <div className="wx-xs-content">{content}</div>
      </div>
    );
  }
}


export default Message;
