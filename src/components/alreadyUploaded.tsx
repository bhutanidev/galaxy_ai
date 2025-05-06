import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Upload , CheckCircle } from "lucide-react";
import SignedUpload from "@/components/fileUpload";
import axios from "axios";
import VideoPlayer from "./ui/videoplayer";
import { dbConnect } from "@/lib/db/connection";
import { Video } from "@/lib/db/videoModel";
import { error } from "console";


export default async function AlreadyUploaded({id}:{id:string}) {
    console.log(id)
    try {
            await dbConnect()
            const res = await Video.findById(id);
            // @ts-ignore
            const {uploaded_url,generatedUrl,originalFileName,formdetails}:{uploaded_url:any,generatedUrl:any,originalFileName:any,formdetails:any} = res
            return(
            <div className="min-h-screen p-8 bg-background text-foreground">
              <form  className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 bg-muted p-6 rounded-xl shadow">
                {/* Upload Video */}
                <div className="border w-96 p-4 rounded-md bg-background">
                <fieldset disabled={true}>
                  <Label className="block mb-2 text-lg font-semibold">Upload Video</Label>
                  <div className="border-dashed border-2 border-gray-300 rounded-md p-6 text-center">
                    <div className="flex items-center justify-center gap-2 text-green-600">
                    <Upload className="text-green-600" />
                    <span className="text-sm">{originalFileName}</span>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
        
                  <div className="mt-4">
                    <Label htmlFor="prompt">Prompt</Label>
                    <Textarea
                      id="prompt"
                      name="prompt"
                      defaultValue={formdetails.prompt}
                      placeholder="Describe your transformation"
                      className="mt-1"
                    />
                  </div>
        
                  <Collapsible open={true}  className="mt-4">
                    <CollapsibleTrigger asChild>
                      <Button variant="outline"   type="button">Advanced Settings</Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="grid gap-4 mt-4">
                      <div>
                        <Label>Inference Steps (2-30)</Label>
                        <Input type="number" name="num_inference_steps" defaultValue={formdetails.num_inference_steps}  />
                      </div>
                      <div>
                        <Label>Aspect Ratio (16:9 or 9:16)</Label>
                        <Input name="aspect_ratio" defaultValue={formdetails.aspect_ratio}  />
                      </div>
                      <div>
                        <Label>Resolution (480 / 580 / 720)</Label>
                        <Input type="number" name="resolution" defaultValue={formdetails.resolution} />
                      </div>
                      <div>
                        <Label>Number of Frames (85 / 129)</Label>
                        <Input type="number" name="num_frames" defaultValue={formdetails.num_frames}  />
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch name="enable_safety_checker" disabled={true} checked={formdetails.enable_safety_checker}  />
                        <Label>Enable Safety Checker</Label>
                      </div>
                      <div>
                        <Label>Strength (0.01 to 1)</Label>
                        <Input type="number" step="0.01" name="strength" defaultValue={formdetails.strength} />
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
        
                  <Button type="submit" className="mt-6 w-full">Generate Captions</Button>
                </fieldset>
                </div>
                {/* Preview Placeholder */}
                <div className="flex items-center justify-center border bg-background rounded-md text-center">
                  <div>
                    {/* <h2 className="text-xl font-semibold">Ready to Create Your Video</h2>
                    <p className="text-muted-foreground">Enter details of the video you want to create</p> */}
                    <VideoPlayer src={uploaded_url} />
                  </div>
                </div>
              </form>
            </div>
          );
    } catch (error) {
        console.error("Error fetching video:", error);
        return <div>Video Not found.</div>;
    }
}
