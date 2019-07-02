import * as React from 'react';
import * as PropTypes from 'prop-types';
import FileImage from "./FileImage";
import FileSelector from "./FileSelector";

interface BaseProps {

}

export type UploadProps = {} & BaseProps & React.HTMLAttributes<HTMLInputElement>;


class Upload extends React.Component<UploadProps, any> {
  static FileImage: typeof FileImage;
  static FileSelector: typeof FileSelector;
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return (
      <div>
        <input type='file' {...this.props}/>
      </div>
    );
  }
}

export default Upload;
