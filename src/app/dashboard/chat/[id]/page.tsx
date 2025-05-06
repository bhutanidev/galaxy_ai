import AlreadyUploaded from "@/components/alreadyUploaded";
import VideoUploadForm from "@/components/formUpload";

export default async function MainContent({ params }: { params: { id: string } }){
    const { id } = await params;
    if(id.trim().length === 0){
        return(<VideoUploadForm/>)
    }else return(<AlreadyUploaded id={id}/>)
}