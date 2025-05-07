"use server"
import cloudinary from "@/lib/cloudinary"; // Make sure this is server-only


export async function uploadImageFromUrl(imageUrl: string) {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: "your-folder-name", // Replace with your folder if needed
      resource_type: "image",
    });

    console.log("Uploaded Image URL:", result.secure_url);
    return result;
  } catch (error: any) {
    console.error("Cloudinary upload failed:", error?.message || error);
    throw new Error("Upload to Cloudinary failed");
  }
}


