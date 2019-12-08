import * as React from 'react';
import OverLengthText from './OverLengthText';

interface BaseProps {

}

export type TextProps = {} & BaseProps;


class Text extends React.Component<TextProps, any> {
  static propTypes = {};
  static OverLengthText: typeof OverLengthText;

  render() {
    const { children } = this.props;
    return children;
  }
}

export default Text;
