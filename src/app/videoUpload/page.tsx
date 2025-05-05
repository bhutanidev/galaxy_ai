"use client";
import { CldUploadWidget } from 'next-cloudinary';
import { useRef, useState } from 'react';
import axios from 'axios'
export const SignedUpload = () => {
  const [resource, setResource] = useState<any>();
  const urlRef = useRef("")
  const idRef = useRef("")

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
        idRef.current = result?.info?.id
        const res = await axios.post('/api/video-upload',{url:urlRef.current,formDetails:{prompt:"test prompt 2"}})
        console.log(res.data)
      }}
      onQueuesEnd={(result, { widget }) => {
        widget.close();
      }}
      onError={(error,{widget})=>{
        console.log(error)
        widget.close()
      }}
      options={{
        sources: ['local'],
        multiple: false,
        maxFiles: 1,
        resourceType: 'video', 
        clientAllowedFormats: ['mp4', 'webm', 'mov'], 
        maxFileSize: 50 * 1024 * 1024,
      }}
    >
      {({ open }) => {
        function handleOnClick() {
          setResource(undefined);
          open();
        }

        return (
          <button onClick={handleOnClick}>
            Upload a Video
          </button>
        );
      }}
    </CldUploadWidget>
  );
};

export default SignedUpload;
