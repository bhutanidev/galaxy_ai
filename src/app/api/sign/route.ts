import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
 
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
 
export async function POST(request: Request) {
  const body = await request.json();
  const { paramsToSign } = body;
//   const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
  const { fileType, fileSize } = body;
  console.log(fileType)
  console.log(fileSize)
  
  
//   if (!allowedVideoTypes.includes(fileType)) {
//     return NextResponse.json({statuscode:400, error: 'Unsupported video format' });
//   }
//   const MAX_SIZE_MB = 50;
//   if (fileSize > MAX_SIZE_MB * 1024 * 1024) {
//     return NextResponse.json({statuscode:400, error: 'File is too large' });
//   }
  const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET as string);
  return Response.json({ signature });
}