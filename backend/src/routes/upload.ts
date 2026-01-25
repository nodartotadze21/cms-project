import express from 'express';
import { upload, uploadToCloudinary } from '../config/cloudinary.js';

const router = express.Router();

// სურათის ატვირთვის endpoint
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'სურათი არ არის ატვირთული' });
    }

    // სურათის Cloudinary-ზე ატვირთვა
    const imageUrl = await uploadToCloudinary(req.file.buffer, 'cms-uploads');

    res.json({ url: imageUrl });
  } catch (error) {
    console.error('სურათის ატვირთვის შეცდომა:', error);
    res.status(500).json({ error: 'სურათის ატვირთვა ვერ მოხერხდა' });
  }
});

export default router;
