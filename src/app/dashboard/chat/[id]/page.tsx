import AlreadyUploaded from "@/components/alreadyUploaded";
import VideoUploadForm from "@/components/formUpload";

export default async function MainContent({ params }: { params: Promise<{ id: string }> }){
    const { id } = await params;
    return(<AlreadyUploaded id={id}/>)
}