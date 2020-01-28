import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import { getOffset } from '../utils/dom';

interface BaseProps {
  offsetX: number;
  offsetY: number;
  width?: number;
  onDrag: (data: DragWrapperState) => void;
  onDragEnd: (data: DragWrapperState) => void;
}

export type DragWrapperProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;

type Pos = {
  x: number;
  y: number;
}

export interface DragWrapperState {
  isMoving: boolean,
  isMouseDown: boolean,
  pos: Pos,
  clickPos: Pos,
}

class DragWrapper extends React.Component<DragWrapperProps, DragWrapperState> {
  static defaultProps: Partial<DragWrapperProps> = {
    offsetX: 10,
    offsetY: 10,
    width: 600,
  };
  static propTypes = {
    title: PropTypes.node,
    offsetX: PropTypes.number,
    offsetY: PropTypes.number,
    width: PropTypes.number,
    onDragStart: PropTypes.func,
    onDrag: PropTypes.func,
    onDragEnf: PropTypes.func,
  };

  state = {
    isMoving: false,
    isMouseDown: false,
    pos: { x: 0, y: 0 },
    clickPos: { x: 0, y: 0 },
  };

  componentDidMount() {

  }

  onPointerDown = (e: React.PointerEvent) => {
    e.persist();
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    const isMouseDown = true;
    const offset = getOffset(e.target as HTMLElement);
    const clickPos = {
      x: e.pageX - offset.left,
      y: e.pageY - offset.top,
    };
    this.setState({ isMouseDown, clickPos });
  };
  onPointerLeave = (e: React.PointerEvent) => {
    e.stopPropagation();
    const isMouseDown = false;
    this.setState({ isMouseDown }, () => {
      this.onDragEnd();
    });
  };
  onPointerUp = (e: React.PointerEvent) => {
    e.persist();
    const isMouseDown = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
    this.setState({ isMouseDown }, () => {
      this.onDragEnd();
    });
  };
  onPointerMove = (e: React.PointerEvent) => {
    let tmpX, tmpY, maxX, maxY;
    const { isMouseDown, clickPos } = this.state;
    const { offsetX, offsetY } = this.props;
    const { currentTarget: target } = e;
    if (isMouseDown) {
      tmpX = e.pageX - clickPos.x; //  - window.scrollX;
      maxX = window.scrollX + window.innerWidth - target.clientWidth;
      tmpY = e.pageY - clickPos.y; //  - window.scrollY;
      maxY = window.scrollY + window.innerHeight - target.clientHeight;
      tmpX = tmpX < offsetX ? 0 : tmpX > maxX - offsetX ? maxX : tmpX;
      tmpY = tmpY < offsetY ? 0 : tmpY > maxY - offsetY ? maxY : tmpY;
      this.setState({ pos: { x: tmpX, y: tmpY } }, () => {
        this.onDrag();
      });
    }
  };
  onDrag = () => {
    const { onDrag } = this.props;
    if (onDrag) {
      onDrag(this.state);
    }
  };
  onDragEnd = () => {
    const { onDragEnd } = this.props;
    if (onDragEnd) {
      onDragEnd(this.state);
    }
  };

  render() {
    const { isMouseDown, pos } = this.state;
    const { x, y } = pos;
    const style = { top: y + 'px', left: x + 'px' };
    const wrapperCls = cx('wx-v2-drag-wrapper', isMouseDown ? 'ws-moving' : '');
    const { title, width } = this.props;
    return (
      <div
        className={wrapperCls}
        style={style}
        onPointerLeave={this.onPointerLeave}
        onPointerDown={this.onPointerDown}
        onPointerUp={this.onPointerUp}
        onPointerMove={this.onPointerMove}
      >
        <div className='wx-v2-drag-wrapper-title'>{title}</div>
        <div className='wx-v2-drag-wrapper-body' style={{ width }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}


export default DragWrapper;
