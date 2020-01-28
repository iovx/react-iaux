import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

interface BaseProps {
  text?: React.ReactNode;
  locked?: boolean;
  data?: any;
  lockedClassName?: string;
  onDragStart?: (data: any) => void;
}

export type DragItemProps = {} & BaseProps & React.HTMLAttributes<HTMLElement>;


class DragItem extends React.Component<DragItemProps, any> {
  static propTypes = {};
  static defaultProps: Partial<DragItemProps> = {
    locked: false,
  };
  handleDrag = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    return true;
  };
  handleDragStart = (data: any) => {
    const { onDragStart } = this.props;
    return (ev: React.DragEvent<HTMLDivElement>) => {
      ev.stopPropagation();
      ev.dataTransfer.dropEffect = 'copy';
      if (onDragStart) {
        onDragStart(data);
      }
      if (data) {
        ev.dataTransfer.setData('data', JSON.stringify(data));
      }
      return true;
    };
  };

  render() {
    const { text, locked, data, className, style, lockedClassName, ...props } = this.props;
    const myProps: any = { style, ...props };
    if (!('locked' in this.props) || !locked) {
      myProps.className = cx('wx-drag-item', className);
      if (this.props.draggable || !('draggable' in this.props)) {
        myProps.draggable = true;
        myProps.onDragStart = this.handleDragStart(data);
        myProps.onDrag = this.handleDrag;
      }
    } else {
      myProps.className = cx('wx-drag-item-locked', className, lockedClassName);
    }
    return (
      <div {...myProps}>
        <div>{this.props.children || text}</div>
      </div>
    );
  }

}

DragItem.propTypes = {
  text: PropTypes.node,
  locked: PropTypes.bool,
  data: PropTypes.object,
  lockedClassName: PropTypes.string,
};

export default DragItem;
