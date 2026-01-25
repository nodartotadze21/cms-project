import React from 'react';
import { X } from 'lucide-react';
import { NewsItem } from '../../types';

interface NewsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  newsItem: NewsItem | null;
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({
  isOpen,
  onClose,
  newsItem
}) => {
  if (!isOpen || !newsItem) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{newsItem.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={28} />
          </button>
        </div>

        {newsItem.image && (
          <img
            src={newsItem.image}
            alt={newsItem.title}
            className="w-full h-96 object-cover rounded-lg mb-6"
          />
        )}

        <div className="space-y-4 mb-6">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div>
              <span className="font-semibold">თარიღი:</span> {new Date(newsItem.date).toLocaleDateString('ka-GE')}
            </div>
            <div>
              <span className="font-semibold">ავტორი:</span> {newsItem.author}
            </div>
            <div>
              <span className="font-semibold">კატეგორია:</span> {newsItem.category}
            </div>
          </div>
        </div>

        <div className="text-gray-700 whitespace-pre-wrap text-lg leading-relaxed mb-6">
          {newsItem.content}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition"
        >
          დახურვა
        </button>
      </div>
    </div>
  );
};
