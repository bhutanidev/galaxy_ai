import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Upload, CheckCircle, Download } from "lucide-react";
import { dbConnect } from "@/lib/db/connection";
import { Image } from "@/lib/db/videoModel";
import ImageViewer from "./ui/videoplayer";
import transformCloudinaryURL from "@/utils/downloadableUrl";



  
export default async function AlreadyUploaded({ id }: { id: string }) {
  try {
    await dbConnect();
    const res = await Image.findById(id);

    // @ts-ignore
    const {
      uploaded_url,
      generatedUrl,
      originalFileName,
      formdetails,
    }: {
      uploaded_url: any;
      generatedUrl: any;
      originalFileName: any;
      formdetails: any;
    } = res;
    const downloadUrl = transformCloudinaryURL(generatedUrl)
    return (
      <div className="min-h-screen p-8 bg-background text-foreground">
        <form className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 bg-muted p-6 rounded-xl shadow">
          {/* Upload Image */}
          <div className="border w-96 p-4 rounded-md bg-background">
            <fieldset disabled={true}>
              <Label className="block mb-2 text-lg font-semibold">
                Uploaded Image
              </Label>
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
                  placeholder="Describe the transformation"
                  className="mt-1"
                />
              </div>

              <Collapsible open={true} className="mt-4">
                <CollapsibleTrigger asChild>
                  <Button variant="outline" type="button">
                    Advanced Settings
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="grid gap-4 mt-4">
                  <div>
                    <Label>Inference Steps (2-30)</Label>
                    <Input
                      type="number"
                      name="num_inference_steps"
                      defaultValue={formdetails.num_inference_steps}
                    />
                  </div>
                <div>
                  <Label>CFG Scale (1–20)</Label>
                  <Input
                    type="number"
                    name="guidance_scale"
                    defaultValue={formdetails.guidance_scale}
                  />
                  </div>
                  <div>
                    <Label>Number of Images</Label>
                    <Input
                      type="number"
                      name="num_images"
                      defaultValue={formdetails.num_images}
                    />
                  </div>
                  <div>
                    <Label>Strength (0.01 to 1)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      name="strength"
                      defaultValue={formdetails.strength}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground italic">
                  Safety checker is always enabled.
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </fieldset>
          </div>

          {/* Image Preview */}
          <div className="flex flex-col items-center justify-center border bg-background rounded-md text-center">
            <a className=" absolute top-40 right-48" href={downloadUrl}><Download/></a> 
            <div>
              <ImageViewer src={generatedUrl} />
            </div>
          </div>
        </form>
      </div>
    );
  } catch (error) {
    console.error("Error fetching image:", error);
    return <div>Image not found.</div>;
  }
}
