import *as  React from 'react';
import * as PropTypes from 'prop-types';
import Icon, { IconProps } from './Icon';
import icons from './icons';

interface BaseProps {
  type?: string;
}

export type FontProps = {} & BaseProps & IconProps;


class Font extends React.PureComponent<FontProps, any> {
  static defaultProps = {};
  static propTypes = {
    text: PropTypes.node,
    font: PropTypes.string,
    icon: PropTypes.string,
    type: PropTypes.string,
  };

  render() {
    const { text, font, icon, type, ...props } = this.props;
    let nFont = font;
    let nIcon = icon;
    if (!(font && icon) && type && icons[type]) {
      const [iFont, iIcon] = icons[type];
      nFont = iFont;
      nIcon = iIcon;
    }
    return (<Icon icon={nIcon} font={nFont} contentStyle={{ margin: '0 5px' }} text={text} {...props} />);
  }
}


export default Font;
