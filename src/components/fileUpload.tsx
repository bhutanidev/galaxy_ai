"use client";
import { CldUploadWidget } from 'next-cloudinary';
import React, { useRef, useState } from 'react';
import axios from 'axios'
export const SignedUpload = ({urlRef, fileNameRef,setFileName}:{urlRef: React.RefObject<string>,fileNameRef: React.RefObject<string>,setFileName: (name: string) => void;}) => {
  const [resource, setResource] = useState<any>();

  return (
    <CldUploadWidget
      signatureEndpoint="/api/sign"
      uploadPreset="galaxy_ai_cloudinary"
      onSuccess={async(result, { widget }) => {
        console.log("Upload successful: ", result);
        // const url = result?.info
        setResource(result?.info);
        const url = result?.info?.url as string
        urlRef.current = url 
        fileNameRef.current = result?.info?.original_filename as string
        setFileName(fileNameRef.current)
      }}
      onQueuesEnd={(result, { widget }) => {
        widget.close();
      }}
      onError={(error,{widget})=>{
        console.log(error)
        alert(error?.statusText)
        widget.close()
      }}
      options={{
        sources: ['local'],
        multiple: false,
        maxFiles: 1,
        resourceType: 'video', 
        clientAllowedFormats: ['mp4', 'webm', 'mov'], 
        maxFileSize: 15 * 1024 * 1024,
      }}
    >
      {({ open }) => {
        function handleOnClick() {
          setResource(undefined);
          open();
        }

        return (
          <button type='button' onClick={handleOnClick}>
            Upload a Video
          </button>
        );
      }}
    </CldUploadWidget>
  );
};

export default SignedUpload;
