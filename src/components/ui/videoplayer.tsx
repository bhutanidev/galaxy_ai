import React from "react";

interface ImageViewerProps {
  src: string;
  alt?: string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ src, alt = "Uploaded image" }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{ width: "100%", borderRadius: "8px", objectFit: "cover" }}
    />
  );
};

export default ImageViewer;
