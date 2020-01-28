import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import { cutStr, getLength } from './util';

interface BaseProps extends React.HTMLAttributes<HTMLDivElement> {

}

export type OverLengthTextProps = {
  content?: string;
  maxLength?: number;
  btnClassName?: string;
  btnStyle?: React.CSSProperties;
} & BaseProps;

export interface OverLengthTextState {
  open: boolean;
}

class OverLengthText extends React.Component<OverLengthTextProps, OverLengthTextState> {
  static propTypes = {
    content: PropTypes.string,
  };
  static defaultProps = {
    content: '',
  };
  state = {
    open: false,
  };


  isOverLength() {
    const { content, maxLength } = this.props;
    if (!('maxLength' in this.props) || !content) {
      return false;
    }
    const len = getLength(content);
    return len > (maxLength as number);
  }

  handleClick = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

  render() {
    const { content, maxLength, className, btnClassName, btnStyle, ...extraProps } = this.props;
    const isOverLen = this.isOverLength();
    const { open } = this.state;
    const wrapperCls = cx('wx-v2-text-overLength', className);
    const btnCls = cx('wx-v2-text-overLength-fold-btn', btnClassName);
    return (
      <div className={wrapperCls} {...extraProps}>
        <span>
          {isOverLen && !open ? cutStr(content || '', maxLength) : content}
        </span>
        {isOverLen ? (
          <span className={btnCls} style={btnStyle} onClick={this.handleClick}>
            {open ? '收起全文>' : '展开全文>'}
          </span>
        ) : null}
      </div>
    );
  }
}

export default OverLengthText;
