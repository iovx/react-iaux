import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import { svgCheck } from './assets';

interface BaseProps {
  className?: string;
}

export type OptionProps = {
  style?: React.CSSProperties;
  children?: React.ReactText;
  selected?: boolean;
  disabled?: boolean;
  onClick?(): void;
} & BaseProps;


class Option extends React.Component<OptionProps, any> {
  static propTypes = {
    className: PropTypes.string,
    selected: PropTypes.bool,
  };
  static defaultProps = {
    selected: false,
  };

  render() {
    const { children, className, style, disabled, onClick, selected } = this.props;
    const wrapperCls = cx('wx-v2-select-option', className, {
      'wx-v2-select-option-selected': selected,
      'wx-v2-select-option-disabled': disabled,
    });
    return (
      <div className={wrapperCls} style={style} onClick={onClick}>
        {selected && <div className='wx-v2-select-option-prefix-icon' dangerouslySetInnerHTML={{ __html: svgCheck }}/>}
        <span className='wx-v2-select-option-text'>{children}</span>
      </div>
    );
  }
}

export default Option;
