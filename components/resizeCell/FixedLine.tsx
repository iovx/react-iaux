import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import {tuple} from "../_utils/type";
import {LINE_POS} from "./constant";

const posType = tuple('left', 'top', 'right', 'bottom');

interface BaseProps {
  className?: string;
  pos?: typeof posType[number];
}

export type FixedLineProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;


class FixedLine extends React.Component<FixedLineProps, any> {
  static defaultProps = {
    pos: LINE_POS.LEFT,
  }
  static propTypes = {
    pos: PropTypes.string,
  };

  render() {
    const {className, pos, ...extraProps} = this.props;
    const clsName = cx('wx-v2-resize-cell-line', pos, className);
    return (
      <div className={clsName} {...extraProps} />
    )
  }
}

export default FixedLine;
