import { dbConnect } from "@/lib/db/connection";
import { IFormDetails, Image } from "@/lib/db/videoModel";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { uploadImageFromUrl } from "@/helper/cloudinaryUpload";
import { fal } from "@fal-ai/client";

// Configure FAL client with API key
fal.config({
  credentials: process.env.FAL_KEY,
});

/**
 * GET handler to fetch all images associated with the currently authenticated user.
 */
export async function GET(req: NextRequest) {
  // Get authenticated user
  const { userId: clerkId } = await auth();

  // Return 401 if user is not authenticated
  if (!clerkId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // Connect to MongoDB
  await dbConnect();

  try {
    // Fetch user's images, sorted by creation date in descending order
    const image = await Image.find({ clerkId })
      .sort({ createdAt: -1 })
      .select('originalFileName')
      .lean();

    // Format response with id and title
    const formattedimage = image.map((video) => ({
      id: video._id.toString(),
      title: video.originalFileName,
    }));

    return NextResponse.json(formattedimage);
  } catch (error) {
    console.error('Error fetching image:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

/**
 * POST handler to:
 *  1. Save uploaded image data to the database
 *  2. Use FAL API to transform the image
 *  3. Upload generated image to Cloudinary
 *  4. Update the DB with generated image URL
 */
export async function POST(req: NextRequest) {
  // Connect to MongoDB
  await dbConnect();

  // Get authenticated user
  const { userId } = await auth();

  // Return error if user is not logged in
  if (!userId) return NextResponse.json({ error: "no userid" });

  // Extract fields from request body
  const res = await req.json();
  const {
    url,
    formDetails,
    originalFileName,
  }: { url: string; formDetails: IFormDetails; originalFileName: string } = res;

  // Validate fields
  if (!url || !formDetails) {
    return NextResponse.json({ error: "fields not provided" });
  }

  // Create new image entry object
  const newentry = {
    uploaded_url: url,
    clerkId: userId,
    originalFileName,
    generatedUrl: "",
    formdetails: formDetails,
  };

  try {
    const imageModel = Image;

    // Save uploaded image info to DB
    const newImage = await imageModel.create({ ...newentry });

    // Destructure uploaded image fields
    const { uploaded_url, formdetails } = newImage;

    // Send image to FAL image-to-image API for generation
    const result = await fal.subscribe("fal-ai/flux/dev/image-to-image", {
      input: {
        image_url: uploaded_url,
        prompt: formdetails.prompt,
        strength: formdetails.strength,
        num_images: formdetails.num_images,
        num_inference_steps: formdetails.num_inference_steps,
        guidance_scale: formdetails.guidance_scale,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });

    // Upload generated image to Cloudinary
    const cloudinary_generated_url = await uploadImageFromUrl(result.data.images[0].url);

    // Update DB entry with generated image URL
    const update_url = await imageModel.findByIdAndUpdate(
      newImage.id,
      { generatedUrl: cloudinary_generated_url.secure_url },
      { new: true }
    );
    return NextResponse.json({ generatedUrl:update_url?.generatedUrl });
  } catch (error) {
    return NextResponse.json({ statuscode: 500, error: error });
  }
}
