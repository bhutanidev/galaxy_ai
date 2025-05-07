import { dbConnect } from "@/lib/db/connection";
import { IFormDetails, Image } from "@/lib/db/videoModel";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
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
        const videoModel = Image
        const newurl = await videoModel.create({
            ...newentry
        })
        // make an api call to fal api
        return NextResponse.json({...newentry})
    } catch (error) {
        return NextResponse.json({statuscode:500,error:error})
    }
}