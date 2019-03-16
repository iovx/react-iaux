import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import {getOffset} from "../utils/dom";

interface BaseProps {
  className?: string;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
  selectionBoxClassName?: string;
  selectionBoxStyle?: React.CSSProperties;
  onPointerUp: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerDown: (e: React.PointerEvent) => void;
}

export type SelectionProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;


class Selection extends React.Component<SelectionProps, any> {
  static propTypes = {
    contentClassName: PropTypes.string,
    contentStyle: PropTypes.object,
    selectionBoxClassName: PropTypes.string,
    selectionBoxStyle: PropTypes.object,
  };
  private selectionWrapper: HTMLDivElement;
  private selection: HTMLElement;
  private bounds = {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  }

  constructor(props) {
    super(props);
  }

  state = {
    isMouseDown: false,
    startPos: {x: 0, y: 0},
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    show: false,
  }

  componentDidMount() {
    this.bounds = this.getBounds(this.selectionWrapper);
  }

  inSelection = (point) => {
    const {x, y} = this.getSelectionPoint(point);
    const {width, height} = this.bounds;
    return x > 0 && x < width && y > 0 && y < height;
  }
  getSelectionPoint = (point) => {
    const {x, y} = point;
    const {left, top} = this.bounds;
    return {
      x: x - left,
      y: y - top,
    }
  }
  getBounds = (ele) => {
    return {
      width: ele.clientWidth,
      height: ele.clientHeight,
      ...getOffset(ele),
    }
  }
  onPointerDown = (e: React.PointerEvent) => {
    e.persist();
    e.preventDefault();
    e.stopPropagation();
    const {onPointerDown} = this.props;
    const {pageX: x, pageY: y} = e;
    this.selection = e.currentTarget as HTMLDivElement;
    this.selection.setPointerCapture(e.pointerId);
    this.setState({isMouseDown: true, startPos: {x, y}}, () => {
      if (onPointerDown) {
        onPointerDown(e);
      }
    });
  }
  onPointerMove = (e: React.PointerEvent) => {
    const {onPointerMove} = this.props;
    const {isMouseDown, startPos: {x: startX, y: startY}} = this.state;
    const {pageX, pageY} = e;
    if (isMouseDown && this.inSelection({x: pageX, y: pageY})) {
      if (window.getSelection) {
        window.getSelection().removeAllRanges();
      } else {
        // document.getSelection().empty();
      }
      let width = pageX - startX;
      let height = pageY - startY;
      const offset = getOffset(e.currentTarget as HTMLDivElement);
      let left = startX - offset.left;
      let top = startY - offset.top;
      if (width < 0) {
        left = left + width;
        width = -width;
      }
      if (height < 0) {
        top = top + height;
        height = -height;
      }

      this.setState({show: width > 0 && height > 0, width, height, left, top});
    }
    if (onPointerMove) {
      onPointerMove(e);
    }
  }
  onPointerUp = (e: React.PointerEvent) => {
    e.persist();
    const {onPointerUp} = this.props;
    this.setState({isMouseDown: false, show: false,}, () => {
      if (this.selection) {
        this.selection.releasePointerCapture(e.pointerId);
      }
      if (onPointerUp) {
        onPointerUp(e);
      }
    });
  }

  render() {
    const {className, contentClassName, contentStyle, selectionBoxClassName, selectionBoxStyle, onPointerUp, onPointerDown, onPointerMove, ...extraProps} = this.props;
    const clsName = cx('wx-v2-selection', className);
    const contentCls = cx('wx-v2-selection-content', contentClassName);
    const selectionBoxCls = cx('wx-v2-selection-select-box', selectionBoxClassName);
    const {show, width, height, left, top} = this.state;
    const selectBoxStyle: React.CSSProperties = {...selectionBoxStyle, width, height, left, top};
    if (!show) {
      selectBoxStyle.display = 'none';
    }
    return (
      <div
        className={clsName}
        onPointerDown={this.onPointerDown}
        onPointerUp={this.onPointerUp}
        onPointerMove={this.onPointerMove}
        ref={(ref) => {
          this.selectionWrapper = ref as HTMLDivElement
        }}
        {...extraProps}
      >
        <div className={contentCls} style={contentStyle}>
          {this.props.children}
        </div>
        <div className={selectionBoxCls} style={selectBoxStyle}/>
      </div>
    );
  }
}


export default Selection;
