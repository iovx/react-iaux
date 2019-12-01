import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import PopOver from '../popOver/PopOver';


interface BaseProps {

}

export type ToolTipProps = {
  style?: React.CSSProperties;
  className?: string;
  title: string;
} & BaseProps;

export interface ToolTipState {

}

class ToolTip extends React.Component<ToolTipProps, ToolTipState> {
  static propTypes = {
    title: PropTypes.string,
  };
  static defaultProps = {};

  render() {
    const { title, children, className } = this.props;
    const wrapperCls = cx('wx-v2-tool-tip');
    const contentCls = cx('wx-v2-tool-tip-content', className);
    return (
      <PopOver
        contentClassName={contentCls}
        wrapperClassName={wrapperCls}
        content={title}
        trigger='hover'>
        {children}
      </PopOver>
    );
  }
}

export default ToolTip;
