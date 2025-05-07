import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFormDetails {
    prompt: string;
    strength: number;
    num_inference_steps: number;
    guidance_scale: number;
    num_images: number;
    enable_safety_checker: boolean;
  }

export interface IImage extends Document {
  uploaded_url: string;
  generatedUrl: string;
  originalFileName:string;
  clerkId: string;
  formdetails: IFormDetails;
  createdAt: Date;
  updatedAt: Date;
}

const FormDetailsSchema: Schema<IFormDetails> = new Schema(
    {
      prompt: {
        type: String,
        required: true,
      },
      strength: {
        type: Number,
        default: 0.95,
      },
      num_inference_steps: {
        type: Number,
        default: 40,
      },
      guidance_scale: {
        type: Number,
        default: 3.5,
      },
      num_images: {
        type: Number,
        default: 1,
      },
      enable_safety_checker: {
        type: Boolean,
        default: true,
      },
    },
    { _id: false } // Prevents creation of a subdocument _id
  );
const ImageSchema: Schema<IImage> = new Schema(
  {
    uploaded_url: { type: String, required: true },
    generatedUrl: { type: String, default: '' },
    originalFileName:{ type:String, required:true},
    clerkId: { type: String, required: true },
    formdetails: {
      type: FormDetailsSchema,
      required: true,
    },
  },
  { timestamps: true }
);

export const Image: Model<IImage> =
  mongoose.models.Image || mongoose.model<IImage>('Image', ImageSchema);
