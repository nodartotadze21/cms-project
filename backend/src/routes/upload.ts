import express from 'express';
import { upload, uploadToCloudinary } from '../config/cloudinary.js';

const router = express.Router();

// სურათის ატვირთვის endpoint
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('📸 ფოტოს ატვირთვის მოთხოვნა მოვიდა');
    console.log('📦 ფაილი:', req.file?.originalname, '| ზომა:', req.file?.size, 'bytes');
    
    if (!req.file) {
      console.error('❌ ფაილი არ დაიპოვა');
      return res.status(400).json({ error: 'სურათი არ არის ატვირთული' });
    }

    console.log('🚀 Cloudinary-ზე ატვირთვა იწყება...');
    // სურათის Cloudinary-ზე ატვირთვა
    const imageUrl = await uploadToCloudinary(req.file.buffer, 'cms-uploads');

    console.log('✅ სურათი წარმატებით ატვირთულია:', imageUrl);
    res.json({ url: imageUrl });
  } catch (error) {
    console.error('❌ სურათის ატვირთვის შეცდომა:', error);
    res.status(500).json({ error: 'სურათის ატვირთვა ვერ მოხერხდა: ' + (error as any).message });
  }
});

export default router;
