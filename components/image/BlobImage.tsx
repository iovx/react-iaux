import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';


interface BaseProps {
  src: string;
  wrapperStyle?: React.CSSProperties;
  alt?: string;
  onError: () => void;
  onLoad: () => void;
  onLoaded: () => void;
  loadingTip?: React.ReactNode;
  errorTip?: React.ReactNode;
  wrapperClassName?: string;
}

export type BlobImageProps = {} & BaseProps & React.HTMLAttributes<HTMLImageElement>;


class BlobImage extends React.Component<BlobImageProps, any> {
  static defaultProps: Partial<BlobImageProps> = {
    loadingTip: null,
    errorTip: '图像加载出错',
  };
  static propTypes = {
    src: PropTypes.string.isRequired,
    loadingTip: PropTypes.node,
    errorTip: PropTypes.node,
    wrapperClassName: PropTypes.string,
  };
  state = {
    error: false,
    dataUrl: '',
    loading: false,
    errorText: '图像加载出错',
  };

  componentDidMount() {
    const { src } = this.props;
    this.setState({ errorText: null, loading: true }, () => {
      this.onLoad();
      fetch(src).then(res => res.blob()).then(blob => {
        const url = URL.createObjectURL(blob);
        this.setState({ dataUrl: url, loading: false }, () => {
          this.onLoaded();
        });
      }).catch(e => {
        this.setState({ error: true, loading: false }, () => {
          this.onError();
        });
      });
    });
  }

  onLoad = () => {
    const { onLoad } = this.props;
    if (onLoad) {
      onLoad();
    }
  };
  onLoaded = () => {
    const { onLoaded } = this.props;
    if (onLoaded) {
      onLoaded();
    }
  };
  onError = () => {
    const { onError } = this.props;
    if (onError) {
      onError();
    }
  };

  render() {
    const { src, loadingTip, errorTip, wrapperClassName, ...extraProps } = this.props;
    const { error, loading } = this.state;
    const clsName = cx('wx-blob-image', wrapperClassName);
    return (
      <div className={clsName}>
        {loading ? '图像加载中....' : <div className='wx-v2-blob-image-loading'>{loadingTip}</div>}
        {error ? <div className='wx-v2-blob-image-error'>{errorTip}</div> :
          <img {...extraProps} src={this.state.dataUrl} />}
      </div>
    );
  }
}

export default BlobImage;
