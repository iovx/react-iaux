import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import FileImage from './FileImage';
import FileSelector from './FileSelector';
import Button from '../button/Button';
import { FileNode } from './interface';
import UploadList from './UploadList';
import { Omit } from '../_utils/type';
import { noop } from '../_utils/function';

interface BaseProps {
  multiple?: boolean;
  repeat?: boolean;
  override?: boolean;
  disabled?: boolean;
  selectOnly?: boolean;
  dragOnly?: boolean;
  maxLength?: number;
  selectText?: React.ReactElement;
  dropText?: React.ReactNode;
  showList?: boolean;
  accept?: string;

  onChange?(fileList: FileNode[]): void;
}

export interface IUploadListProps {

}

export type UploadProps = {
  value?: FileNode[];
  defaultValue?: FileNode[];
  children?: React.ReactElement<IUploadListProps>;

} & BaseProps & Omit<React.HTMLAttributes<HTMLInputElement>, 'onChange'>;

export interface UploadState {
  value: FileNode[];
}

class Upload extends React.Component<UploadProps, UploadState> {
  static FileImage: typeof FileImage;
  static FileSelector: typeof FileSelector;
  static defaultProps: Partial<UploadProps> = {
    selectText: <Button status='pure'>选择文件</Button>,
    onChange: noop,
    showList: true,
    selectOnly: true,
  };
  static propTypes = {
    className: PropTypes.string,
  };
  selectorRef: React.RefObject<FileSelector> = React.createRef();
  state = {
    value: this.props.value || this.props.defaultValue || [],
  };

  static getDerivedStateFromProps(props: UploadProps) {
    if ('value' in props) {
      return {
        value: props.value,
      };
    }
    return null;
  }

  handleDelete = (file: FileNode) => {
    if (this.selectorRef.current) {
      this.selectorRef.current.remove(file);
    }
    // const nextFileList = this.state.value.filter(item => item.id !== file.id);
    // if ('value' in this.props) {
    //   this.triggerChange(nextFileList);
    // } else {
    //   this.setState(() => ({
    //     value: nextFileList,
    //   }), () => this.triggerChange(nextFileList));
    // }
  };

  handleChange = (fileList: FileNode[]) => {
    if ('value' in this.props) {
      this.triggerChange(fileList);
    } else {
      this.setState(() => ({
        value: fileList,
      }), () => this.triggerChange(fileList));
    }
  };

  triggerChange(fileList: FileNode[]) {
    const { onChange } = this.props;
    if (onChange) {
      onChange([...fileList]);
    }
  }

  truncate = () => {
    if (this.selectorRef.current) {
      this.selectorRef.current.truncate();
    }
  };

  render() {
    const { onChange, className, showList, children, disabled, value, defaultValue, ...extraProps } = this.props;
    const wrapperCls = cx('wx-v2-upload', className);
    return (
      <div className={wrapperCls}>
        <FileSelector
          ref={this.selectorRef}
          onFileChange={this.handleChange}
          {...extraProps}
        />
        {showList ? (
          <UploadList
            onDelete={this.handleDelete}
            data={this.state.value}
            disabled={disabled}
          />) : (
          children && React.cloneElement(React.Children.only(children), {
            onDelete: this.handleDelete,
            data: this.state.value,
            disabled,
          })
        )}
      </div>
    );
  }
}

export default Upload;
