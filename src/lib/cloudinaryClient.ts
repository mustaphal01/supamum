import { Cloudinary } from 'cloudinary-core';

const cloudinary = new Cloudinary({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
});

export async function uploadImageToCloudinary(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET); // Use the correct upload preset name

    fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.secure_url) {
          console.log('Image uploaded successfully:', data.secure_url); // Log the secure URL
          resolve(data.secure_url);
        } else {
          console.error('Failed to upload image:', data); // Log the error response
          reject(new Error('Failed to upload image'));
        }
      })
      .catch(error => {
        console.error('Error uploading image:', error); // Log the error
        reject(error);
      });
  });
}