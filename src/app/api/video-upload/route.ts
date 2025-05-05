import { dbConnect } from "@/lib/db/connection";
import { IFormDetails, IVideo, Video } from "@/lib/db/videoModel";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
export function GET(req:NextRequest){
    return NextResponse.json({message:"hi there"})
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
        const videoModel = Video
        const newurl = await videoModel.create({
            ...newentry
        })
        // make an api call to fal api
        return NextResponse.json({...newentry})
    } catch (error) {
        return NextResponse.json({statuscode:500,error:error})
    }
}