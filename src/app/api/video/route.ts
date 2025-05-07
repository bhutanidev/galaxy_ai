import { dbConnect } from "@/lib/db/connection";
import { IFormDetails, Image } from "@/lib/db/videoModel";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { uploadImageFromUrl } from "@/helper/cloudinaryUpload";
import { fal } from "@fal-ai/client";

fal.config({
  credentials: process.env.FAL_KEY
});

export async function GET(req:NextRequest){
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  
    await dbConnect();
  
    try {
        const image = await Image.find({ clerkId })
        .sort({ createdAt: -1 })
        .select('originalFileName') 
        .lean();
        const formattedimage = image.map(video => ({
            id: video._id.toString(),
            title: video.originalFileName,
          }));
      
        return NextResponse.json(formattedimage);
    } catch (error) {
      console.error('Error fetching image:', error);
      return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
export async function POST(req: NextRequest) {
    await dbConnect()
    const {userId}=await auth()
    if(!userId)return NextResponse.json({error:"no userid"})
    const res = await req.json()
    const{url,formDetails,originalFileName}:{url:string,formDetails:IFormDetails,originalFileName:string} = res
    if (!url || !formDetails){
        return NextResponse.json({error:"fields not provided"})
    }
    const newentry ={
        uploaded_url:url,
        clerkId:userId,
        originalFileName,
        generatedUrl:"",
        formdetails:formDetails
    } 
    try {
        const imageModel = Image
        const newImage = await imageModel.create({
            ...newentry
        })
        const {uploaded_url , formdetails} = newImage
        const result = await fal.subscribe("fal-ai/flux/dev/image-to-image", {
          input: {
            image_url: uploaded_url,
            prompt:formdetails.prompt,
            strength:formdetails.strength,
            num_images:formdetails.num_images,
            num_inference_steps:formdetails.num_inference_steps,
            guidance_scale:formdetails.guidance_scale
          },
          logs: true,
          onQueueUpdate: (update) => {
            if (update.status === "IN_PROGRESS") {
              update.logs.map((log) => log.message).forEach(console.log);
            }
          },
        });
        console.log(result.data);
        console.log(result.requestId);
        const cloudinary_generated_url = await uploadImageFromUrl(result.data.images[0].url)
        const update_url = await  imageModel.findByIdAndUpdate(newImage.id,{generatedUrl:cloudinary_generated_url.secure_url},{new:true})
        return NextResponse.json({...update_url})
    } catch (error) {
        return NextResponse.json({statuscode:500,error:error})
    }
}