"use client";
import { CldUploadWidget } from 'next-cloudinary';
import React, { useRef, useState } from 'react';
import axios from 'axios'
import { toast } from 'sonner';
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
        toast(error?.statusText)
        widget.close()
      }}
      options={{
        sources: ['local'],
        multiple: false,
        maxFiles: 1,
        resourceType: 'image',
        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
        maxFileSize: 5 * 1024 * 1024, // 5 MB
      }}      
    >
      {({ open }) => {
        function handleOnClick() {
          setResource(undefined);
          open();
        }

        return (
          <button type='button' onClick={handleOnClick}>
            Upload an Image
          </button>
        );
      }}
    </CldUploadWidget>
  );
};

export default SignedUpload;
