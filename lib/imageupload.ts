import { v2 as cloudinary } from "cloudinary";
import { UploadApiResponse } from "cloudinary";

export async function uploadImageToCloudinary(
  image: File,
  folder: string = "eventmanagement",
) {
  const MAX_SIZE_IMAGE = 5 * 1024 * 1024;
  if (image.size > MAX_SIZE_IMAGE) {
    throw new Error("Image must be less than 5 MB");
  }

  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: "image",
        },
        (error, success) => {
          if (error) reject(error);
          else resolve(success as UploadApiResponse);
        },
      )
      .end(buffer);
  });

  return result.secure_url;
}
