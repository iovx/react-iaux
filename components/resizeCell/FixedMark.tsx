import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import {tuple} from "../_utils/type";
import {MARK_POS} from "./constant";

const posType = tuple('lt', 'lb', 'rt', 'rb', 'lc', 'rc', 'tc', 'bc');

interface BaseProps {
  className?: string;
  pos?: typeof posType[number];
}

export type FixedMarkProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;


class FixedMark extends React.Component<FixedMarkProps, any> {
  static defaultProps = {
    pos: MARK_POS.LEFT_TOP,
  }
  static propTypes = {
    className: PropTypes.string,
    pos: PropTypes.oneOf(posType)
  }

  render() {
    const {className, pos, ...extraProps} = this.props;
    const clsName = cx('wx-v2-resize-cell-mark', pos, className);
    return (
      <div className={clsName} {...extraProps} />
    )
  }
}

export default FixedMark;
