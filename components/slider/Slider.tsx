import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames'
import {getOffset} from "../utils/dom";
import {tuple} from "../_utils/type";

const directionType = tuple('horizontal', 'vertical')

interface BaseProps {
  onChange: (progress: number, value: number) => void;
  onDrag: (progress: number, value: number) => boolean | undefined;
  onSkip: (progress: number, value: number) => boolean | undefined;
  onMax: () => void;
  min: number,
  max: number,
  progress?: number,
  accuracy?: number,
  allowDrag?: boolean;
  allowSkip?: boolean;
  type?: typeof directionType[number];
}

export type SliderProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;


export interface SliderState {
  progress?: number;
  max?: number;
  min?: number;
  clickPos?: { x: number, y: number },
  isMouseDown?: boolean;
}

class Slider extends React.Component<SliderProps, SliderState> {
  static propTypes = {
    onChange: PropTypes.func,
    onDrag: PropTypes.func,
    onSkip: PropTypes.func,
    onMax: PropTypes.func,
    min: PropTypes.number,
    max: PropTypes.number,
    progress: PropTypes.number,
    accuracy: PropTypes.number,
    allowDrag: PropTypes.bool,
    allowSkip: PropTypes.bool,
    type: PropTypes.oneOf(directionType),
  };
  static Types = {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical',
  }
  static defaultProps = {
    progress: 0.7,
    min: 0,
    max: 100,
    allowDrag: true,
    allowSkip: true,
    type: Slider.Types.HORIZONTAL,
    onChange: null,
    onMax: null,
    onDrag: null,
    onSkip: null,
    accuracy: null,
  }
  state = {
    progress: 0.7,
    max: 100,
    min: 0,
    clickPos: {x: 0, y: 0},
    isMouseDown: false,
  }

  componentWillMount() {
    const {progress, min, max} = this.props;
    this.setState({progress, min, max});
  }

  componentWillReceiveProps(nextProps) {
    const {progress, min, max} = nextProps;
    this.setState({progress, min, max});
  }

  getProgress = () => {
    const {accuracy} = this.props;
    const {progress} = this.state;
    return accuracy ? parseFloat(progress.toFixed(accuracy)) : progress;
  };
  value = () => {
    return this.getProgress() * this.state.max;
  };
  //设置获取返回进度条表示最大值
  max = (max: number) => {
    if ((!max) || max <= 0) {
      return this.state.max;
    }
    this.setState({max});
  };
  onMax = () => {
    const {onMax} = this.props;
    if (onMax) {
      onMax();
    }
  }
  onChange = () => {
    const {onChange} = this.props;
    const {progress} = this.state;
    if (onChange) {
      onChange(progress, this.getProgress());
    }
  }
  //设置进度
  setProgress = (x) => {
    const progress = x > 1 ? 1 : x < 0 ? 0 : x;
    if (progress === 1) {
      this.onMax();
    }
    this.setState({progress}, () => {
      this.onChange();
    });
  }

  onMouseDown = (e: React.PointerEvent) => {
    if (this.props.allowDrag) {
      e.preventDefault();
      e.stopPropagation();
      e.persist();
      e.currentTarget.setPointerCapture(e.pointerId);
      const isMouseDown = true;
      const offset = getOffset(e.currentTarget as HTMLElement);
      const clickPos = {
        x: e.pageX - offset.left,
        y: e.pageY - offset.top,
      };
      this.setState({isMouseDown, clickPos})
    }
  }
  onMouseLeave = (e: React.PointerEvent) => {
    e.stopPropagation();
    const isMouseDown = false;
    this.setState({isMouseDown})
  };
  onMouseMove = (e: React.PointerEvent) => {
    this.onDrag(e);
  }
  onMouseUp = (e: React.PointerEvent) => {
    e.persist();
    e.stopPropagation();
    const isMouseDown = false;
    e.currentTarget.releasePointerCapture(e.pointerId)
    this.setState({isMouseDown});
  };
  onTouchStart = (e) => {
    if (this.props.allowDrag) {
      e.persist();
      e.preventDefault();
      e.stopPropagation();
      const {pageX, pageY} = e.touches[0];
      const isMouseDown = true;
      const offset = getOffset(e.target);
      const clickPos = {
        x: pageX - offset.left,
        y: pageY - offset.top,
      };
      this.setState({isMouseDown, clickPos})
    }
  }
  onTouchMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // const {pageX, pageY} = e.touches[0];
    // this.onDrag(e)
  }
  onTouchEnd = (e) => {
    e.stopPropagation();
    const isMouseDown = false;
    this.setState({isMouseDown})
  }
  onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const {onSkip, allowSkip, type} = this.props;
    const Types = Slider.Types;
    if (allowSkip) {
      const {pageX, pageY} = e;
      const target = e.currentTarget as HTMLElement;
      const sliderDragBtn = (target.offsetParent as HTMLElement).childNodes[3] as HTMLElement;
      if (target === sliderDragBtn || target.offsetParent == null) {
        return;
      }
      const {clientWidth: btnWidth, clientHeight: btnHeight} = sliderDragBtn;
      const {clientWidth: width, clientHeight: height} = target.offsetParent;
      const offset = getOffset(target);
      let tmp = 0;
      if (type === Types.VERTICAL) {
        tmp = (pageY - offset.top) / (height - btnHeight);
      } else {
        tmp = (pageX - offset.left) / (width - btnWidth);
      }
      if (!onSkip || (onSkip && onSkip(this.state.progress, this.getProgress()) !== false)) {
        this.setProgress(tmp);
      }
    }
  }
  onDrag = (e) => {
    const {isMouseDown} = this.state;
    if (isMouseDown) {
      const {pageX, pageY, target} = e;
      const {max, clickPos} = this.state;
      const offset = getOffset(target.parentNode);
      const pos = {
        x: pageX - offset.left - clickPos.x,
        y: pageY - offset.top - clickPos.y,
      }

      const {clientWidth: btnWidth, clientHeight: btnHeight} = target;
      const {clientWidth: width, clientHeight: height} = target.parentNode;

      const {type, onDrag} = this.props;
      if (type === Slider.Types.VERTICAL) {
        if (pos.y >= 0 && pos.y <= height) {
          const h = height - btnHeight;
          const progress = pos.y / h;
          //执行进度设置后的动作
          if (onDrag && onDrag(progress, max * progress) !== false) {
            this.setProgress(progress);
          }
        }
      } else {
        if (pos.x >= 0 && pos.x <= width) {
          const w = width - btnWidth;
          const progress = pos.x / w;
          //执行进度设置后的动作
          if (!onDrag || (onDrag && onDrag(progress, max * progress) !== false)) {
            this.setProgress(progress);
          }
        }
      }
    }
  }

  render() {
    const {progress, isMouseDown} = this.state;
    const length = `${progress * 100}%`;
    const sliderCls = cx('wx-v2-slider ws-hr', isMouseDown ? 'ws-active' : '');
    const dragBtnStyle = {
      left: length,
    };
    const fpStyle = {
      width: length,
    };
    const spStyle = {
      width: length,
    };
    const {onPointerLeave, onPointerMove, onTouchEnd, onClick, onTouchMove, ...props} = this.props;
    return (
      <div
        {...props}
        onPointerLeave={this.onMouseLeave}
        onPointerMove={this.onMouseMove}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
        onClick={this.onClick}
      >
        <div className={sliderCls}>
          <div className="wx-v2-slider-layer wx-v2-slider-bg"/>
          <div className="wx-v2-slider-layer wx-v2-slider-fp" style={fpStyle}/>
          <div className="wx-v2-slider-layer wx-v2-slider-sp" style={spStyle}/>
          <div
            className="wx-v2-slider-drag-btn"
            style={dragBtnStyle}
            onPointerDown={this.onMouseDown}
            onPointerUp={this.onMouseUp}
            onTouchStart={this.onTouchStart}

          />
        </div>
      </div>
    );
  }
}

export default Slider;
