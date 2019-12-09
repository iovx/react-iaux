import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import Popup from '../popup/Popup';
import { getOffset, getRestBounds } from '../utils/dom';
import Option, { OptionProps } from './Option';
import { svgArrow, svgClose } from './assets';
import { Omit } from '../_utils/type';


interface BaseProps {

}

export interface ISelectOptionData {
  value: string;
  text: string;
}

export type SelectProps = {
  value?: string | string[];
  defaultValue?: string | string[];
  children?: React.ReactElement<OptionProps> | React.ReactElement<OptionProps>[];
  onChange?(value: string | string[]): void;
  multiple?: boolean;
  disabled?: boolean;
} & BaseProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>;

export interface SelectState {
  isMouseIn: boolean;
  isInPop: boolean;
  top: number;
  left: number;
  dir: boolean;
  width: number;
  value: string | string[];
}

function strToArr(obj: string | string[]) {
  if (Array.isArray(obj)) {
    return obj;
  }
  return [obj];
}

function arrToStr(obj: string | string[]) {
  if (Array.isArray((obj))) {
    return obj.length ? obj[0] : '';
  }
  return obj;
}

class Select extends React.Component<SelectProps, SelectState> {
  static propTypes = {
    title: PropTypes.string,
  };
  static defaultProps = {};
  static Option: typeof Option;
  wrappedEleRef = React.createRef<HTMLDivElement>();
  popupEleRef = React.createRef<Popup>();
  timer: any;
  top: number = -1000;
  left: number = -1000;
  width: number = 100;

  constructor(props: SelectProps) {
    super(props);
    const { value, defaultValue, multiple } = props;
    this.state = {
      isMouseIn: false,
      isInPop: false,
      top: 0,
      left: 0,
      dir: true,
      width: this.width,
      value: multiple ? (strToArr(value || defaultValue || [])) : arrToStr(value || defaultValue || ''),
    };
  }


  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.init();
      window.addEventListener('resize', this.handleResize);
    }
  }

  static getDerivedStateFromProps(props: SelectProps) {
    if ('value' in props) {
      return {
        value: props.multiple ? strToArr(props.value || []) : arrToStr(props.value || []),
      };
    }
    return null;
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize);
    }
  }

  init() {
    const { top, left } = getOffset(this.wrappedEleRef.current as HTMLDivElement);
    this.top = top;
    this.left = left;
    this.width = parseInt(getComputedStyle(this.wrappedEleRef.current as HTMLDivElement).width || '0');
    this.setState({ dir: this.getProperDir(), width: this.width });
  }

  handleResize = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.init();
    }, 100);
  };

  getOffset() {
    this.width = parseInt(getComputedStyle(this.wrappedEleRef.current as HTMLDivElement).width || '0');
    const dir = this.getProperDir();
    const popStyle = getComputedStyle((this.popupEleRef.current)!.getPopupEle() as HTMLDivElement);
    const popHeight = popStyle.height;
    const style = getComputedStyle(this.wrappedEleRef.current as HTMLDivElement);
    const h = style.height;
    let { top, left } = getOffset(this.wrappedEleRef.current as HTMLDivElement);
    this.top = top;
    this.left = left;
    // let left = this.left, top = this.top;
    const padding = 4;
    if (dir) {
      top = this.top + parseInt(h || '0') + padding;
    } else {
      top = this.top - parseInt(popHeight || '0') - padding;
    }
    return {
      left,
      top,
      dir,
      width: this.width,
    };
  }

  getProperDir() {
    const { top, bottom } = getRestBounds(this.wrappedEleRef.current as HTMLDivElement);
    return bottom > top;
  }

  handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const { onMouseEnter } = this.props;
    if (onMouseEnter) {
      onMouseEnter(e);
    }
  };
  handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    this.setState({ isMouseIn: false });
    const { onMouseLeave } = this.props;
    if (onMouseLeave) {
      onMouseLeave(e);
    }
  };
  handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (this.state.isMouseIn) {
      this.setState({
        isMouseIn: false,
      });
      return;
    }
    this.setState({ isMouseIn: true }, () => {
      const { dir, left, width, top } = this.getOffset();
      this.setState(() => ({
        dir,
        top,
        width,
        left,
      }));
    });
    const { onClick } = this.props;
    if (onClick) {
      onClick(e);
    }
  };
  handlePopMouseEnter = () => {
    this.setState({ isInPop: true });
  };
  handlePopMouseLeave = () => {
    this.setState({ isInPop: false });
  };
  handleOptionClick = (dataItem: ISelectOptionData) => {
    const { value } = this.state;
    const { multiple, disabled } = this.props;
    const isInControl = 'value' in this.props;
    if (disabled) {
      this.setState({ isInPop: false });
      return;
    }
    if (multiple) {
      const mulValue = value as string[];
      const nextValue = (value.indexOf(dataItem.value) > -1) ? mulValue.filter(item => item !== dataItem.value) : (mulValue.concat([dataItem.value]));
      if (isInControl) {
        this.setState({ isInPop: false });
        this.triggerChange(nextValue);
        return;
      }
      this.setState(() => ({
        isInPop: false,
        value: nextValue,
      }));
      return;
    }
    if (dataItem.value === this.state.value) {
      this.setState({ isInPop: false });
      return;
    }
    if (isInControl) {
      this.setState({ isInPop: false });
      this.triggerChange(dataItem.value);
      return;
    }
    this.setState({ value: dataItem.value, isInPop: false }, () => this.triggerChange(this.state.value));
  };

  handleUnSelect = (e: React.MouseEvent<HTMLDivElement>, dataItem: ISelectOptionData) => {
    e.stopPropagation();
    this.handleOptionClick(dataItem);
  };

  triggerChange(value) {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  }

  getExtraProps() {
    const { value, disabled, defaultValue, className, onClick, onMouseEnter, onMouseLeave, onChange, multiple, ...extraProps } = this.props;
    return extraProps;
  }

  render() {
    const { children, multiple, disabled } = this.props;
    const { isMouseIn, top, left, isInPop, dir, width, value } = this.state;
    const wrapperCls = cx('wx-v2-select-option-wrapper', 'wx-v2-select-option-wrapper-' + (dir ? 'bt' : 'tp'));
    const options: React.ReactElement[] = [];
    const data: ISelectOptionData[] = [];
    const open = isMouseIn || isInPop;
    const selectCls = cx({
      'wx-v2-select': true,
      'wx-v2-select-open': open,
      'wx-v2-select-disabled': disabled,
    });
    React.Children.forEach<React.ReactElement<OptionProps>>(children as (React.ReactElement<OptionProps> | React.ReactElement<OptionProps>[]), child => {
      const dataItem: ISelectOptionData = {
        value: `${child.key || child.props.children}`,
        text: `${child.props.children}`,
      };
      options.push(React.cloneElement(child, {
        disabled,
        style: { width },
        onClick: () => this.handleOptionClick(dataItem),
        selected: (multiple && (this.state.value as string[]).indexOf(dataItem.value) > -1),
      }));
      data.push(dataItem);
    });
    const item = data.filter(item => !multiple ? item.value === value : value.indexOf(item.value) > -1);
    return (
      <React.Fragment>
        <Popup
          className={wrapperCls}
          show={open}
          top={top}
          left={left}
          ref={this.popupEleRef}
          onMouseEnter={this.handlePopMouseEnter}
          onMouseLeave={this.handlePopMouseLeave}
        >
          {options}
        </Popup>
        <div
          {...this.getExtraProps()}
          className={selectCls}
          ref={this.wrappedEleRef}
          onClick={this.handleClick}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          {
            multiple ? (
              item.map(it => {
                return (
                  <div key={it.value} className='wx-v2-select-text-tag'>
                    <span>{it.text}</span>
                    <div
                      className='wx-v2-select-text-tag-close'
                      onClick={(e) => this.handleUnSelect(e, it)}
                      dangerouslySetInnerHTML={{ __html: svgClose }} />
                  </div>
                );
              })
            ) : (
              <div className='wx-v2-select-text'>
                <span>{item.length ? item[0].text : value}</span>
              </div>
            )
          }
          <div className='wx-v2-select-arrow' dangerouslySetInnerHTML={{ __html: svgArrow }} />
        </div>
      </React.Fragment>
    );
  }
}

export default Select;
