import Upload from './Upload';
import FileSelector from './FileSelector';
import FileImage from './FileImage';

export {UploadProps} from './Upload';
export {FileSelectorProps, FileSelectorState} from './FileSelector';
export {FileImageProps} from './FileImage';

Upload.FileImage = FileImage;
Upload.FileSelector = FileSelector;

export default Upload;
