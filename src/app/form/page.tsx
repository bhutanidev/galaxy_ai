"use client"
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Upload , CheckCircle } from "lucide-react";
import SignedUpload from "@/components/fileUpload";
import axios from "axios";


export default function VideoUploadForm() {
  const [expanded, setExpanded] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const urlRef = useRef<string>("");
  const fileNameRef = useRef<string>("");
  const [fileName , setFileName]=useState("")
  const [isDisabled , setIsDisabled] = useState(false)
  const [formData, setFormData] = useState({
    prompt: "",
    num_inference_steps: 20,
    aspect_ratio: "16:9",
    resolution: "720",
    num_frames: 129,
    enable_safety_checker: true,
    strength: 0.8,
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsDisabled(true)
    setExpanded(true)
    const { prompt, resolution, num_inference_steps, num_frames, strength, aspect_ratio } = formData;

    if (urlRef.current.trim()==="") return alert("Please upload a video file.");
    if (fileNameRef.current.trim()==="") return alert("Please upload a video file.");
    if (!prompt.trim()) return alert("Prompt is required.");

    const numSteps = Number(num_inference_steps);
    const frames = Number(num_frames);
    const res = Number(resolution);
    const str = Number(strength);

    const validResolutions = [480, 580, 720];
    const validFrames = [85, 129];
    const validRatios = ["16:9", "9:16"];

    if (isNaN(numSteps) || numSteps < 2 || numSteps > 30) return alert("Inference steps must be between 2 and 30.");
    if (!validFrames.includes(frames)) return alert("Frames must be either 85 or 129.");
    if (!validResolutions.includes(res)) return alert("Resolution must be 480, 580, or 720.");
    if (!validRatios.includes(aspect_ratio)) return alert("Aspect ratio must be 16:9 or 9:16.");
    if (isNaN(str) || str < 0.01 || str > 1) return alert("Strength must be between 0.01 and 1.");
    try {
        const result = await axios.post('/api/video-upload',{url:urlRef.current, originalFileName : fileNameRef.current  ,formDetails:{prompt, resolution, num_inference_steps, num_frames, strength, aspect_ratio}})
        if(result.data?.error){
            alert(result.data?.error)
            setIsDisabled(false)
            setExpanded(false)
            return
        }  
    } catch (error) {
        //call delete and reset entire form
        setExpanded(false)
        setIsDisabled(false)
    }
    console.log("Valid submission:", formData);
    console.log(urlRef.current)
    console.log(fileNameRef.current)
    alert("Video submitted successfully!");
  }

  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <form onSubmit={handleSubmit} ref={formRef} className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 bg-muted p-6 rounded-xl shadow">
        {/* Upload Video */}
        <div className="border p-4 rounded-md bg-background">
        <fieldset disabled={isDisabled}>
          <Label className="block mb-2 text-lg font-semibold">Upload Video</Label>
          <div className="border-dashed border-2 border-gray-300 rounded-md p-6 text-center">
            {!fileName ?
            <> 
            <Upload className="mx-auto mb-2 text-gray-500" />
            <SignedUpload urlRef={urlRef} fileNameRef={fileNameRef} setFileName={setFileName}/>
            </>
            :
            <div className="flex items-center justify-center gap-2 text-green-600">
            <Upload className="text-green-600" />
            <span className="text-sm">{fileName}</span>
            <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            }
          </div>

          <div className="mt-4">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              name="prompt"
              value={formData.prompt}
              onChange={handleInputChange}
              placeholder="Describe your transformation"
              className="mt-1"
            />
          </div>

          <Collapsible open={expanded} onOpenChange={setExpanded} className="mt-4">
            <CollapsibleTrigger asChild>
              <Button variant="outline"   type="button">Advanced Settings</Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="grid gap-4 mt-4">
              <div>
                <Label>Inference Steps (2-30)</Label>
                <Input type="number" name="num_inference_steps" value={formData.num_inference_steps} onChange={handleInputChange} />
              </div>
              <div>
                <Label>Aspect Ratio (16:9 or 9:16)</Label>
                <Input name="aspect_ratio" value={formData.aspect_ratio} onChange={handleInputChange} />
              </div>
              <div>
                <Label>Resolution (480 / 580 / 720)</Label>
                <Input type="number" name="resolution" value={formData.resolution} onChange={handleInputChange} />
              </div>
              <div>
                <Label>Number of Frames (85 / 129)</Label>
                <Input type="number" name="num_frames" value={formData.num_frames} onChange={handleInputChange} />
              </div>
              <div className="flex items-center gap-2">
                <Switch name="enable_safety_checker" disabled={true} checked={formData.enable_safety_checker} onCheckedChange={(val) => handleInputChange({ target: { name: 'enable_safety_checker', type: 'checkbox', checked: val } } as any)} />
                <Label>Enable Safety Checker</Label>
              </div>
              <div>
                <Label>Strength (0.01 to 1)</Label>
                <Input type="number" step="0.01" name="strength" value={formData.strength} onChange={handleInputChange} />
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Button type="submit" className="mt-6 w-full">Generate Captions</Button>
        </fieldset>
        </div>
        {/* Preview Placeholder */}
        <div className="flex items-center justify-center border bg-background rounded-md text-center">
          <div>
            <Upload className="mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Ready to Create Your Video</h2>
            <p className="text-muted-foreground">Enter details of the video you want to create</p>
          </div>
        </div>
      </form>
    </div>
  );
}
