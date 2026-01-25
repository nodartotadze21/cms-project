import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, default: '' },
    author: { type: String, default: 'ადმინი' },
    category: { type: String, default: 'ზოგადი' },
    date: { type: String, required: true },
    published: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const News = mongoose.model('News', newsSchema);
