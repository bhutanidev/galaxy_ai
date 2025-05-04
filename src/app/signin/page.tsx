import {  SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function Page(){
    const {userId} = await auth()
    return(
        <>
        {userId}
        <SignInButton/>
        <SignUpButton/>
        <SignOutButton/>
        
        </>
    )
}