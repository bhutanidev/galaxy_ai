import { NextRequest, NextResponse } from "next/server";

export function GET(req:NextRequest){
    NextResponse.json({message:"hi there"})
}