import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import { FileNode } from './interface';
import { FileState } from './constant';


interface BaseProps {
  multiple?: boolean;
  repeat?: boolean;
  override?: boolean;
  disabled?: boolean;
  selectOnly?: boolean;
  dragOnly?: boolean;
  maxLength?: number;
  selectText?: React.ReactElement<any>;
  dropText?: React.ReactNode;
  onFileChange?: (fileList: FileNode[]) => void;
  onDragEnter?: React.DragEventHandler;
  onDrop?: React.DragEventHandler;
  onDragOver?: React.DragEventHandler;
  onDragLeave?: React.DragEventHandler;
  activeClassName?: string;
  accept?: string;
}

export type FileSelectorProps = {} & BaseProps & React.HTMLAttributes<HTMLElement>;

export interface FileSelectorState {
  dropOver: boolean;
  isFocused: boolean;
  fileList: FileNode[],
}

class FileSelector extends React.Component<FileSelectorProps, FileSelectorState> {
  static defaultProps = {
    multiple: false,
    repeat: false,
    override: false,
    disabled: false,
    selectOnly: false,
    dragOnly: false,
    selectText: 'Select Files',
    dropText: 'Drop Files',
  };
  static propTypes = {
    onFileChange: PropTypes.func,
    // 多选
    multiple: PropTypes.bool,

    disabled: PropTypes.bool,
    // 允许重名文件
    repeat: PropTypes.bool,
    // 单次选择覆盖
    override: PropTypes.bool,
    // 单次选择覆盖
    dragOnly: PropTypes.bool,
    // 单次选择覆盖
    SelectOnly: PropTypes.bool,
    selectText: PropTypes.node,
    dropText: PropTypes.node,
  };
  uniqueId: string;
  state = {
    dropOver: false,
    isFocused: false,
    fileList: [] as FileNode[],
  };

  constructor(props: FileSelectorProps) {
    super(props);
    this.uniqueId = `wx-v2-upload-files-${Date.now()}-${Math.floor(Math.random() * 999999999 + 1000000)}`;
  }

  isFileSelected = (file: File) => {
    const { fileList } = this.state;
    return fileList.findIndex(({ name, lastModified, size }) => file.size === size && name === file.name && lastModified === file.lastModified) !== -1;
  };
  packFile = (file: File, props: any): FileNode => {
    const { name, size, lastModified } = file;
    const { status, id } = props;
    return { id, file, name, size, lastModified, status };
  };
  onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) {
      return;
    }
    const fileList: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        fileList.push(file);
      }
    }
    this.onChange(fileList);
  };
  onChange = (files: File[]) => {
    const { fileList } = this.state;
    const { multiple, repeat, override, maxLength } = this.props;
    if (multiple && override || !multiple) {
      fileList.length = 0;
    }
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (repeat || (!repeat && !this.isFileSelected(file))) {
        if (!('maxLength' in this.props) || fileList.length < (maxLength as number)) {
          const packedFile = this.packFile(file, { status: FileState.SELECTED, id: file.name });
          fileList.push(packedFile);
        }
      }
    }
    const { onFileChange } = this.props;
    this.setState({ fileList }, () => {
      if (onFileChange) {
        onFileChange(fileList);
      }
    });
  };
  onFileSelected = () => {
    const el = document.getElementById(this.uniqueId);
    if (el !== null) {
      el.click();
    }
  };
  onDragEnter = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
    e.persist();
    this.setState({ dropOver: true });
    const { onDragEnter } = this.props;
    if (onDragEnter) {
      onDragEnter(e);
    }
  };
  onDragOver = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const { onDragOver } = this.props;
    this.setState({ dropOver: true }, () => {
      if (onDragOver) {
        onDragOver(e);
      }
    });
  };
  onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.persist();
    const { onDragLeave } = this.props;
    this.setState({ dropOver: false }, () => {
      if (onDragLeave) {
        onDragLeave(e);
      }
    });
  };
  onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const { onDrop, multiple } = this.props;
    e.stopPropagation();
    e.preventDefault();
    const dataTransfer = e.dataTransfer;
    const files = dataTransfer.files;
    this.setState({ dropOver: false }, () => {
      if (onDrop) {
        onDrop(e);
      }
      if (files.length) {
        const fileArr: File[] = [];
        for (let i = 0; i < files.length; i++) {
          const item = files.item(i);
          if (item) {
            fileArr.push(item);
          }
        }
        this.onChange(!multiple ? [files[0]] : fileArr);
      }
    });
    return true;
  };
  onBlur = () => {
    this.setState({ isFocused: false });
  };
  onFocus = () => {
    this.setState({ isFocused: true });
  };
  onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (this.state.isFocused) {
      if (e.keyCode === 13) {
        this.onFileSelected();
      }
    }
  };
  remove = (file: FileNode) => {
    const nextFileList = this.state.fileList.filter(item => item.id !== file.id);
    this.setState(() => ({
      fileList: nextFileList,
    }), () => this.onChange(nextFileList.map(item => item.file)));
  };
  truncate = () => {
    const el = document.getElementById(this.uniqueId);
    if (el) {
      const fileInputEle = el as HTMLInputElement;
      fileInputEle.value = '';
      this.onChange([]);
    }
  };

  render() {
    const { className: clsName, multiple, tabIndex, dragOnly, selectText, dropText, selectOnly, disabled, onClick, override, repeat, onFileChange, activeClassName, onDrop, onDragEnter, onDragOver, onDragLeave, ...extraProps } = this.props;
    const { isFocused, dropOver } = this.state;
    const className = cx('wx-v2-file-selector', {
        'wx-v2-file-selector-focused': isFocused,
      },
      dropOver ? `wx-v2-file-selector-dropOver ${activeClassName || ''}` : clsName);
    let props: FileSelectorProps = { className };
    if (disabled) {
      props = {
        className,
        onClick: this.onFileSelected,
        draggable: false,
        onDrop: this.onDrop,
        onDragEnter: this.onDragEnter,
        onDragOver: this.onDragOver,
        onDragLeave: this.onDragLeave,
      };
      if (selectOnly && !dragOnly) {
        props.onDrop = onDrop;
        props.onDragEnter = onDragEnter;
        props.onDragOver = onDragOver;
        props.onDragLeave = onDragLeave;
      }
      if (!selectOnly && dragOnly) {
        props.onClick = onClick;
      }
    }
    return (
      <div className={className}>
        {dragOnly && !selectOnly || disabled ? null : (
          <div>
            <input type='file' className='wx-v2-file-selector-hide' id={this.uniqueId} multiple={multiple}
                   onChange={this.onFileChange} {...extraProps} />
          </div>
        )}
        <div className='wx-v2-file-selector-tabHolder' onKeyUp={this.onKeyUp} tabIndex={tabIndex} onFocus={this.onFocus}
             onBlur={this.onBlur} />
        <div
          className='wx-v2-file-selector-trigger'
          onClick={this.onFileSelected}
          draggable={false}
          onDrop={this.onDrop}
          onDragEnter={this.onDragEnter}
          // onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
          onDragEnd={this.onDragLeave}
        >
          {dropOver ? dropText : (selectText && React.cloneElement(selectText, {
            disabled,
          }))}
        </div>
      </div>
    );
  }
}


export default FileSelector;
