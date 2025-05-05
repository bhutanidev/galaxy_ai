import {  SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function Page(){
    const {userId} = await auth()
    const {getToken , sessionId} = await auth()
    const token = await getToken({template:'testing-template'})
    console.log(token);
    
    return(
        <>
        {userId}
        <SignInButton/>
        <SignUpButton/>
        <SignOutButton/>
        
        </>
    )
}