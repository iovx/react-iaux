import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import * as moment from 'moment';
import * as filesize from 'filesize';
import { FileNode } from './interface';
import { FileState } from './constant';
import Svg from '../icon/Svg';

interface BaseProps {
  itemClassName?: string;
}

function getStateText(status: number) {
  switch (status) {
    case FileState.ERROR:
      return '上传出错';
    case FileState.SELECTED:
      return '等待上传';
    case FileState.COMPUTING:
      return '正在计算';
    case FileState.UPLOADING:
      return '正在上传';
    case FileState.COMPLETE:
      return '上传完成';
    case FileState.WAITING:
      return '服务排队';
    case FileState.SERVER_DEALING:
      return '服务处理中';
    default:
      return '未知';
  }
}

export type UploadListProps = {
  data: FileNode[];
  onDelete?(file: FileNode): void;
} & BaseProps & React.HTMLAttributes<HTMLDivElement>;


class UploadList extends React.Component<UploadListProps, any> {
  static propTypes = {
    data: PropTypes.array,
  };
  static defaultProps = {
    data: [],
  };
  handleDeleteClick = (item: FileNode) => {
    return () => {
      const { onDelete } = this.props;
      if (typeof onDelete === 'function') {
        onDelete({ ...item });
      }
    };
  };

  render() {
    const { data, className, itemClassName, ...extraProps } = this.props;
    const wrapperCls = cx('wx-v2-upload-list', className);
    const itemCls = cx('wx-v2-upload-list-item', itemClassName);
    if (!data.length) {
      return null;
    }
    return (
      <div className={wrapperCls} {...extraProps}>
        <div className={itemCls}>
          <div className='wx-v2-upload-list-item-num'>序号</div>
          <div className='wx-v2-upload-list-item-name'>名称</div>
          <div className='wx-v2-upload-list-item-status'>状态</div>
          <div className='wx-v2-upload-list-item-size'>大小</div>
          <div className='wx-v2-upload-list-item-time'>修改时间</div>
          <div className='wx-v2-upload-list-item-action'>操作</div>
        </div>
        {
          data.map((item, index) => {
            const { id, lastModified, name, status, size } = item;
            return (
              <div key={id} className={itemCls}>
                <div className='wx-v2-upload-list-item-num'>{index + 1}</div>
                <div className='wx-v2-upload-list-item-name' title={name}>{name}</div>
                <div className='wx-v2-upload-list-item-status'>{getStateText(status)}</div>
                <div className='wx-v2-upload-list-item-size'>{filesize(size)}</div>
                <div className='wx-v2-upload-list-item-time'>{moment(lastModified).format('YYYY-MM-DD HH:mm')}</div>
                <div className='wx-v2-upload-list-item-action'>
                  <Svg type='delete' onClick={this.handleDeleteClick(item)} />
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default UploadList;
