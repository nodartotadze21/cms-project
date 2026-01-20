import { Router } from 'express';
import { News } from '../models/News.js';

const router = Router();

// Get all news
router.get('/news', async (_req, res) => {
  try {
    const news = await News.find({ published: true }).sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Get all news (admin - including unpublished)
router.get('/news/admin/all', async (_req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Create news
router.post('/news', async (req, res) => {
  try {
    const { title, content, image, author, category, date, published } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content required' });
    }
    const newsItem = new News({
      title,
      content,
      image: image || '',
      author: author || 'Admin',
      category: category || 'General',
      date: date || new Date().toISOString(),
      published: published !== undefined ? published : true,
    });
    await newsItem.save();
    res.json(newsItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create news' });
  }
});

// Get single news
router.get('/news/:id', async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) return res.status(404).json({ error: 'News not found' });
    res.json(newsItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Update news
router.put('/news/:id', async (req, res) => {
  try {
    const { title, content, image, author, category, date, published } = req.body;
    const newsItem = await News.findByIdAndUpdate(
      req.params.id,
      { title, content, image, author, category, date, published },
      { new: true }
    );
    if (!newsItem) return res.status(404).json({ error: 'News not found' });
    res.json(newsItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update news' });
  }
});

// Delete news
router.delete('/news/:id', async (req, res) => {
  try {
    const newsItem = await News.findByIdAndDelete(req.params.id);
    if (!newsItem) return res.status(404).json({ error: 'News not found' });
    res.json({ message: 'News deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete news' });
  }
});

export default router;
