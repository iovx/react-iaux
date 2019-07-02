import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import {tuple} from "../_utils/type";

const statusType = tuple('success', 'info', 'warning', 'error', 'default', 'primary', 'pure');

interface BaseProps {
  className?: string;
  text?: React.ReactNode;
  status?: typeof statusType[number];
}

export type TipProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;


class Tip extends React.PureComponent<TipProps, any> {
  static propTypes = {
    text: PropTypes.node,
    status: 'primary',
  };

  render() {
    const {className, text, status, ...extraProps} = this.props;
    const clsName = cx('wx-v2-tip', `ws-${status}`, className);
    return (
      <div {...extraProps}>
        <div className={clsName}>{text}</div>
      </div>
    );
  }
}

export default Tip;
