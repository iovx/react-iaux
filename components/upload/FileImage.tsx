import * as React from 'react';
import * as PropTypes from 'prop-types';

interface BaseProps {
  src?: string;
}

export type FileImageProps = {} & BaseProps & React.HTMLAttributes<HTMLImageElement>;


class FileImage extends React.Component<FileImageProps, any> {
  static propTypes = {
    src: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(File)]),
  };
  state = {
    src: null,
  }

  componentWillMount() {
    const {src} = this.props;
    this.loadSrc(src);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.loadSrc(nextProps.src);
    }
  }

  loadSrc = (src) => {
    if (src) {
      if (src instanceof File) {
        if (src.type.indexOf('image') === 0) {
          const reader = new FileReader();
          reader.onload = () => {
            this.setState({src: reader.result});
          }
          reader.readAsDataURL(src);
        }
      } else {
        this.setState({src});
      }
    }
  }

  render() {
    const {src, ...extraProps} = this.props;
    return (
      <img src={this.state.src || ''} {...extraProps} />
    );
  }
}


export default FileImage;
