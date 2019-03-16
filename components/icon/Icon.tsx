import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames' ;
import Font from "./Font";

interface BaseProps {
  iconClassName?: string;
  iconStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  icon?: string;
  text?: React.ReactNode;
  font?: string;
}

export type IconProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;


class Icon extends React.Component<IconProps, any> {
  static Font: typeof Font;
  static propTypes = {
    iconClassName: PropTypes.string,
    contentStyle: PropTypes.object,
    iconStyle: PropTypes.object,
    icon: PropTypes.string,
    font: PropTypes.string,
    text: PropTypes.node,
  };

  render() {
    const {className: pcn, iconClassName = '', iconStyle, contentStyle, icon = '', text, children, font, ...props} = this.props;
    const fontClass = cx(font || 'iconfont', icon, iconClassName);
    const valueText = children || text;
    return (
      <div className={pcn} {...props}>
        <i className={fontClass} style={iconStyle}/>
        {valueText ? <span style={contentStyle}>{valueText}</span> : ''}
      </div>
    )
  }
}


export default Icon;
