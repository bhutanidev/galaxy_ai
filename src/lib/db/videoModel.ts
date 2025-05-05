import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFormDetails {
  prompt: string;
  num_inference_steps: number;
  aspect_ratio: string;
  resolution: string;
  num_frames: number;
  enable_safety_checker: boolean;
  strength: number;
}

export interface IVideo extends Document {
  uploaded_url: string;
  generatedUrl: string;
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
    num_inference_steps: {
      type: Number,
      default: 30,
    },
    aspect_ratio: {
      type: String,
      default: '16:9',
    },
    resolution: {
      type: String,
      default: '720p',
    },
    num_frames: {
      type: Number,
      default: 129,
    },
    enable_safety_checker: {
      type: Boolean,
      default: true,
    },
    strength: {
      type: Number,
      default: 0.85,
    },
  },
  { _id: false } // Prevents creation of a subdocument _id for formdetails
);

const VideoSchema: Schema<IVideo> = new Schema(
  {
    uploaded_url: { type: String, required: true },
    generatedUrl: { type: String, default: '' },
    clerkId: { type: String, required: true },
    formdetails: {
      type: FormDetailsSchema,
      required: true,
    },
  },
  { timestamps: true }
);

export const Video: Model<IVideo> =
  mongoose.models.Video || mongoose.model<IVideo>('Video', VideoSchema);
