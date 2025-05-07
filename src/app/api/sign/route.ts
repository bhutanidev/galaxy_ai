import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";
 
 
export async function POST(request: Request) {
  const body = await request.json();
  const { paramsToSign } = body;
  const { fileType, fileSize } = body;
  console.log(fileType)
  console.log(fileSize)
  const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET as string);
  return Response.json({ signature });
}