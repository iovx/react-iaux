import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import FixedMark from "./FixedMark";
import FixedLine from "./FixedLine";
import {LINE_POS, MARK_POS, RESIZE_TYPE} from "./constant";
import {tuple} from "../_utils/type";

function getShowStyle(shouldShow) {
  return shouldShow ? {} : {display: 'none'};
}

const TriggerType = tuple('click', 'focus');

interface BaseProps {
  onMarkPointerLeave?: (e: React.PointerEvent) => void;
  onLinePointerDown?: (e: React.PointerEvent) => void;
  onLinePointerLeave?: (e: React.PointerEvent) => void
  onLinePointerUp?: (e: React.PointerEvent) => void;
  onEnter?: React.MouseEventHandler
  onFocus?: React.MouseEventHandler<FocusEvent>;
  onMouseDown?: React.MouseEventHandler<PointerEvent>;
  type?: typeof TriggerType[number];
  className?: string;
}

export type ResizeCellProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;

export interface ResizeCellState {
  isEnter?: boolean,
  isMarkMouseDown?: boolean,
  isLineMouseDown?: boolean,
  isFocused?: boolean,
  startPos: { x: number, y: number },
  width?: number,
  height?: number,
}

class ResizeCell extends React.Component<ResizeCellProps, ResizeCellState> {
  static ResizeType = RESIZE_TYPE;
  static LinPos = LINE_POS;
  static MarkPos = MARK_POS;
  static defaultProps = {
    type: RESIZE_TYPE.CLICK,
  }
  static propTypes = {
    type: PropTypes.oneOf(TriggerType)
  };
  private cell: HTMLElement;
  private activeLine: HTMLElement;
  private activeLineId: any;
  private activeMark: HTMLElement;
  private activeMarkId: any;

  constructor(props) {
    super(props);
    this.state = {
      isEnter: false,
      isMarkMouseDown: false,
      isLineMouseDown: false,
      isFocused: false,
      startPos: {x: 0, y: 0},
      width: 0,
      height: 0,
    }
  }


  componentWillMount() {
    const {style} = this.props;
    let {width, height} = this.state;
    if (style) {
      const styleWidth = parseFloat(style.width as string)
      const styleHeight = parseFloat(style.width as string)
      width = isNaN(styleWidth) ? width : styleWidth;
      height = isNaN(styleWidth) ? height : styleHeight;
      this.initSize(width, height);
    }
  }

  componentDidMount() {
    const {clientWidth: width, clientHeight: height} = this.cell;
    this.initSize(width, height);
  }

  shouldComponentUpdate(nextState){
    if (this.state.width === nextState.width || this.state.height === nextState.height) {
      return false;
    }
    return true;
  }
  initSize = (width, height) => {
    const initStyle: { width?, height? } = {};
    let changed = false;
    if (width) {
      initStyle.width = width;
      changed = true;
    }
    if (height) {
      initStyle.height = height;
      changed = true;
    }
    if (changed) {
      this.setState(initStyle);
    }
  }
  onEnter = (e: React.MouseEvent) => {
    const {onEnter} = this.props;
    this.setState({isEnter: true}, () => {
      if (onEnter) {
        onEnter(e);
      }
    });
  }
  onMouseLeave = (e) => {
    const {onMouseLeave} = this.props;
    this.setState({isEnter: false}, () => {
      if (onMouseLeave) {
        onMouseLeave(e);
      }
    });
  }
  onMouseMove = (e) => {
    const {onMouseMove} = this.props;
    const {isLineMouseDown, isMarkMouseDown, startPos: {x: startX, y: startY}} = this.state;
    const {pageX, pageY} = e;
    let {height = 0, width = 0} = this.state;
    const nextStartX = pageX;
    const nextStartY = pageY;
    let changed = true;
    let isMouseDown = false;
    if (isLineMouseDown) {
      isMouseDown = true;
      switch (this.activeLineId) {
        case LINE_POS.BOTTOM:
          height = pageY - startY + height;
          break;
        case LINE_POS.TOP:
          height = startY - pageY + height;
          break;
        case LINE_POS.RIGHT:
          width = pageX - startX + width;
          break;
        case LINE_POS.LEFT:
          width = startX - pageX + width;
          break;
        default:
          changed = false;
          break;
      }
    } else if (isMarkMouseDown) {
      isMouseDown = true;
      switch (this.activeMarkId) {
        case MARK_POS.RIGHT_BOTTOM:
          width = pageX - startX + width;
          height = pageY - startY + height;
          break;
        case MARK_POS.RIGHT_TOP:
          width = pageX - startX + width;
          height = startY - pageY + height;
          break;
        case MARK_POS.LEFT_BOTTOM:
          width = startX - pageX + width;
          height = pageY - startY + height;
          break;
        case MARK_POS.LEFT_TOP:
          width = startX - pageX + width;
          height = startY - pageY + height;
          break;
        case MARK_POS.BOTTOM_CENTER:
          height = pageY - startY + height;
          break;
        case MARK_POS.TOP_CENTER:
          height = startY - pageY + height;
          break;
        case MARK_POS.RIGHT_CENTER:
          width = pageX - startX + width;
          break;
        case MARK_POS.LEFT_CENTER:
          width = startX - pageX + width;
          break;
        default:
          changed = false;
          break;
      }
    }
    if (isMouseDown) {
      if (window && window.getSelection && window.getSelection()) {
          window.getSelection()!.removeAllRanges();
      } else {
        if (document.getSelection() !== null) {
          document.getSelection()!.empty();
        }
      }
      if (changed) {
        // console.log(pageX, startX, width, this.activeLineId,this.activeMarkId);
        this.setState({width, height, startPos: {x: nextStartX, y: nextStartY}});
      }
    }
    if (onMouseMove) {
      onMouseMove(e);
    }
  }
  onClick = (e) => {
    const {onClick, type} = this.props;
    if (type === RESIZE_TYPE.CLICK) {
      this.setState({isFocused: true});
    }
    if (onClick) {
      onClick(e);
    }
  }
  onFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    const {onFocus} = this.props;
    this.setState({isFocused: true}, () => {
      if (onFocus) {
        onFocus(e);
      }
    })
  }
  onBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const {onBlur} = this.props;
    this.setState({isFocused: false}, () => {
      if (onBlur) {
        onBlur(e);
      }
    })
  }

  onMarkPointerDown = (markPos) => {
    return (e: React.PointerEvent) => {
      e.persist();
      e.stopPropagation();
      this.activeMarkId = markPos;
      const {pageX: x, pageY: y} = e;
      this.activeMark = e.currentTarget as HTMLElement;
      if (this.activeMark !== null) {
        this.activeMark.setPointerCapture(e.pointerId);
        this.setState({isMarkMouseDown: true, startPos: {x, y}});
      }
    }
  }
  onMarkPointerUp = (e: React.PointerEvent) => {
    e.persist();
    e.stopPropagation();
    this.setState({isMarkMouseDown: false}, () => {
      if (this.activeMark) {
        this.activeMark.releasePointerCapture(e.pointerId);
      }
    });
  }
  onMarkPointerLeave = (e: React.PointerEvent) => {
    const {onMarkPointerLeave} = this.props;
    if (onMarkPointerLeave) {
      onMarkPointerLeave(e);
    }
  }
  onLineMouseDown = (linePos) => {
    return (e: React.PointerEvent) => {
      e.persist();
      e.stopPropagation();
      this.activeLineId = linePos;
      const {onLinePointerDown} = this.props;
      const {pageX: x, pageY: y} = e;
      this.activeLine = e.currentTarget as HTMLDivElement;
      this.activeLine.setPointerCapture(e.pointerId);
      this.setState({isLineMouseDown: true, startPos: {x, y}}, () => {
        if (onLinePointerDown) {
          onLinePointerDown(e);
        }
      });
    }
  }
  onLinePointerLeave = (e: React.PointerEvent) => {
    const {onLinePointerLeave} = this.props;
    if (onLinePointerLeave) {
      onLinePointerLeave(e);
    }
  }
  onLinePointerUp = (e: React.PointerEvent) => {
    e.persist();
    e.stopPropagation();
    const {onLinePointerUp} = this.props;
    this.setState({isLineMouseDown: false}, () => {
      this.activeLine.releasePointerCapture(e.pointerId);
      if (onLinePointerUp) {
        onLinePointerUp(e);
      }
    });
  }

  render() {
    const {isEnter, isFocused, width, height} = this.state;
    const {className, style, type, ...extraProps} = this.props;
    const clsName = cx('wx-v2-resize-cell', isEnter ? 'wx-v2-resize-cell-active' : '', className);
    const wrapperStyle: React.CSSProperties = {
      ...style,
    };
    if (width) {
      wrapperStyle.width = width;
    }
    if (height) {
      wrapperStyle.height = height;
    }
    return (
      <div
        {...extraProps}
        className={clsName}
        onMouseEnter={this.onEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseMove={this.onMouseMove}
        onClick={this.onClick}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        style={wrapperStyle}
        ref={(ref) => {
          this.cell = ref as HTMLDivElement;
        }}
        draggable={false}
      >
        <div className='wx-v2-resize-cell-holder'>
          <div style={getShowStyle(type === RESIZE_TYPE.CLICK ? isEnter : isFocused)}>
            <FixedLine
              pos='left'
              onPointerDown={this.onLineMouseDown(LINE_POS.LEFT)}
              onPointerUp={this.onLinePointerUp}
              onPointerLeave={this.onLinePointerLeave}
            />
            <FixedLine
              pos='right'
              onPointerDown={this.onLineMouseDown(LINE_POS.RIGHT)}
              onPointerUp={this.onLinePointerUp}
              onPointerLeave={this.onLinePointerLeave}
            />
            <FixedLine
              pos='top'
              onPointerDown={this.onLineMouseDown(LINE_POS.TOP)}
              onPointerUp={this.onLinePointerUp}
              onPointerLeave={this.onLinePointerLeave}
            />
            <FixedLine
              pos='bottom'
              onPointerDown={this.onLineMouseDown(LINE_POS.BOTTOM)}
              onPointerUp={this.onLinePointerUp}
              onPointerLeave={this.onLinePointerLeave}
            />
            <FixedMark
              pos='lt'
              onPointerDown={this.onMarkPointerDown(MARK_POS.LEFT_TOP)}
              onPointerUp={this.onMarkPointerUp}
              onPointerLeave={this.onMarkPointerLeave}
            />
            <FixedMark
              pos='lb'
              onPointerDown={this.onMarkPointerDown(MARK_POS.LEFT_BOTTOM)}
              onPointerUp={this.onMarkPointerUp}
              onPointerLeave={this.onMarkPointerLeave}
            />
            <FixedMark
              pos='rt'
              onPointerDown={this.onMarkPointerDown(MARK_POS.RIGHT_TOP)}
              onPointerUp={this.onMarkPointerUp}
              onPointerLeave={this.onMarkPointerLeave}
            />
            <FixedMark
              pos='rb'
              onPointerDown={this.onMarkPointerDown(MARK_POS.RIGHT_BOTTOM)}
              onPointerUp={this.onMarkPointerUp}
              onPointerLeave={this.onMarkPointerLeave}
            />
            <FixedMark
              pos='rc'
              onPointerDown={this.onMarkPointerDown(MARK_POS.RIGHT_CENTER)}
              onPointerUp={this.onMarkPointerUp}
              onPointerLeave={this.onMarkPointerLeave}
            />
            <FixedMark
              pos='lc'
              onPointerDown={this.onMarkPointerDown(MARK_POS.LEFT_CENTER)}
              onPointerUp={this.onMarkPointerUp}
              onPointerLeave={this.onMarkPointerLeave}
            />
            <FixedMark
              pos='tc'
              onPointerDown={this.onMarkPointerDown(MARK_POS.TOP_CENTER)}
              onPointerUp={this.onMarkPointerUp}
              onPointerLeave={this.onMarkPointerLeave}
            />
            <FixedMark
              pos='bc'
              onPointerDown={this.onMarkPointerDown(MARK_POS.BOTTOM_CENTER)}
              onPointerUp={this.onMarkPointerUp}
              onPointerLeave={this.onMarkPointerLeave}
            />
          </div>
          <div className='wx-v2-resize-cell-wrapper'>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}


export default ResizeCell;
