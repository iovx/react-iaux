import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import { tuple } from '../_utils/type';
import { getIcon } from './util';

const SvgType = tuple();
const svgMap: { [index: string]: string } = {};

interface BaseProps {
  content?: any;
  className?: string;
  type?: typeof SvgType[number];
}


export type SvgProps = {} & BaseProps & React.HTMLAttributes<HTMLSpanElement>;


class Svg extends React.Component<SvgProps, any> {
  static propTypes = {
    content: PropTypes.any,
    type: PropTypes.string,
  };

  render() {
    const { content, className, type, ...extraProps } = this.props;
    const cls = cx('wx-v2-svg-icon', className);
    let inner = content ? getIcon(content) : (type && svgMap[type]);
    return (
      <span
        {...extraProps}
        className={cls}
        dangerouslySetInnerHTML={{ __html: inner || '' }}
      />
    );
  }
}

export default Svg;
