import { useCallback, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui';

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string[];
};
const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string[]>(mediaUrl);
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      // Do something with the files
      console.log(acceptedFiles);
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      if (acceptedFiles?.length > 0) {
        setFileUrl(acceptedFiles.map((file: FileWithPath) => URL.createObjectURL(file)));
      }
    },
    [file]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.svg', '.jpeg', '.jpg'],
    },
    maxSize: 1024 * 1024 * 20,
    maxFiles: 3,
  });
  return (
    <div {...getRootProps()} className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer">
      <input {...getInputProps()} className="cursor-pointer" />
      {/*{isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}*/}
      {fileUrl && fileUrl.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full p-2">
            {fileUrl.map((url: string, index: number) => (
              <img key={index} src={url} alt="photo" className="file_uploader-img w-full h-[200px] md:h-[300px] " />
            ))}
          </div>
          <p className="file_uploader-label">Click or drag photo to replace</p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img src="/assets/icons/file-upload.svg" width={96} height={77} alt="upload" />
          <h3 className="text-light-3 mb-2 mt-6">Drag photo here</h3>
          <p className="text-light-4 small-regular mb-6">SVG,PNG,JPG</p>
          <Button type="button" variant="secondary">
            Select from local
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
