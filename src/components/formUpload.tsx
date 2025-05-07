"use client";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Upload, CheckCircle } from "lucide-react";
import SignedUpload from "@/components/fileUpload";
import axios from "axios";
import { toast } from "sonner";

export default function VideoUploadForm() {
  const [expanded, setExpanded] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const urlRef = useRef<string>("");
  const fileNameRef = useRef<string>("");
  const [fileName, setFileName] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const [formData, setFormData] = useState({
    prompt: "",
    strength: 0.95,
    num_inference_steps: 40,
    guidance_scale: 3.5,
    num_images: 1,
    enable_safety_checker: true,
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { prompt, num_inference_steps, strength, guidance_scale, num_images } = formData;

    if (urlRef.current.trim() === "") return toast("Please upload a video file.");
    if (fileNameRef.current.trim() === "") return toast("Please upload a video file.");
    if (!prompt.trim()) return toast("Prompt is required.");

    const numSteps = Number(num_inference_steps);
    const str = Number(strength);
    const cfg = Number(guidance_scale);
    const nImgs = Number(num_images);

    if (isNaN(numSteps) || numSteps < 10 || numSteps > 50)
      return toast("Inference steps must be between 10 and 50.");
    if (isNaN(str) || str < 0.01 || str > 1)
      return toast("Strength must be between 0.01 and 1.");
    if (isNaN(cfg) || cfg < 1 || cfg > 20)
      return toast("Guidance scale (CFG) must be between 1 and 20.");
    if (isNaN(nImgs) || nImgs < 1)
      return toast("Number of images must be at least 1.");

    setIsDisabled(true);
    setExpanded(true);

    try {
      const result = await axios.post("/api/video", {
        url: urlRef.current,
        originalFileName: fileNameRef.current,
        formDetails: {
          prompt,
          strength,
          num_inference_steps,
          guidance_scale,
          num_images,
          enable_safety_checker: true,
        },
      });

      if (result.data?.error) {
        toast(result.data?.error);
        setIsDisabled(false);
        setExpanded(false);
        return;
      }
    } catch (error) {
      toast("Something went wrong during submission.");
      setExpanded(false);
      setIsDisabled(false);
    }

    toast("Video submitted successfully!");
  }

  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 bg-muted p-6 rounded-xl shadow"
      >
        {/* Upload Section */}
        <div className="border w-96 p-4 rounded-md bg-background">
          <fieldset disabled={isDisabled}>
            <Label className="block mb-2 text-lg font-semibold">Upload Video</Label>
            <div className="border-dashed border-2 border-gray-300 rounded-md p-6 text-center">
              {!fileName ? (
                <>
                  <Upload className="mx-auto mb-2 text-gray-500" />
                  <SignedUpload
                    urlRef={urlRef}
                    fileNameRef={fileNameRef}
                    setFileName={setFileName}
                  />
                </>
              ) : (
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <Upload className="text-green-600" />
                  <span className="text-sm">{fileName}</span>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              )}
            </div>

            {/* Prompt */}
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

            {/* Advanced Settings */}
            <Collapsible open={expanded} onOpenChange={setExpanded} className="mt-4">
              <CollapsibleTrigger asChild>
                <Button variant="outline" type="button">
                  Advanced Settings
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="grid gap-4 mt-4">
                <div>
                  <Label>Inference Steps (10–50)</Label>
                  <Input
                    type="number"
                    name="num_inference_steps"
                    value={formData.num_inference_steps}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label>CFG Scale (1–20)</Label>
                  <Input
                    type="number"
                    name="guidance_scale"
                    value={formData.guidance_scale}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label>Number of Images</Label>
                  <Input
                    type="number"
                    name="num_images"
                    value={formData.num_images}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label>Strength (0.01–1)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    name="strength"
                    value={formData.strength}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="text-sm text-muted-foreground italic">
                  Safety checker is always enabled.
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Button type="submit" className="mt-6 w-full">
              Generate Image
            </Button>
          </fieldset>
        </div>

        {/* Preview / Info Section */}
        <div className="flex items-center justify-center border bg-background rounded-md text-center">
          <div>
            <Upload className="mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Ready to Create Your Image</h2>
            <p className="text-muted-foreground">Enter details of the image you want to create</p>
          </div>
        </div>
      </form>
    </div>
  );
}
