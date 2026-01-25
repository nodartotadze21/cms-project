import { v2 as cloudinary } from 'cloudinary';
import { Request } from 'express';
import multer from 'multer';

// Cloudinary კონფიგურაცია
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer კონფიგურაცია (მეხსიერებაში შენახვა)
const storage = multer.memoryStorage();

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('მხოლოდ სურათების ატვირთვაა შესაძლებელი!'));
    }
  },
});

// სურათის Cloudinary-ზე ატვირთვის ფუნქცია
export const uploadToCloudinary = (fileBuffer: Buffer, folder: string = 'cms-uploads'): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve(result.secure_url);
        } else {
          reject(new Error('ატვირთვა ვერ მოხერხდა'));
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
};

export default cloudinary;
