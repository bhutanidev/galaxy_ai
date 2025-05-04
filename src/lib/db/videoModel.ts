import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IVideo extends Document {
  link: string;
  generated: boolean;
  clerkId: string; // Clerk user ID, not a MongoDB reference
  createdAt: Date;
  updatedAt: Date;
}

const VideoSchema: Schema<IVideo> = new Schema(
  {
    link: { type: String, required: true },
    generated: { type: Boolean, default: false },
    clerkId: { type: String, required: true },
  },
  { timestamps: true }
);

export const Video: Model<IVideo> =
  mongoose.models.Video || mongoose.model<IVideo>('Video', VideoSchema);
