import React from 'react';
import { X } from 'lucide-react';
import { NewsFormData, NewsItem } from '../../types';

interface NewsFormModalProps {
  isOpen: boolean;
  editingNews: NewsItem | null;
  formData: NewsFormData;
  onFormChange: (data: NewsFormData) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export const NewsFormModal: React.FC<NewsFormModalProps> = ({
  isOpen,
  editingNews,
  formData,
  onFormChange,
  onSubmit,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full my-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">{editingNews ? 'სიახლის რედაქტირება' : 'ახალი სიახლის შექმნა'}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">სათაური *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => onFormChange({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="შეიყვანეთ სათაური"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">თარიღი</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => onFormChange({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ავტორი</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => onFormChange({ ...formData, author: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ადმინი"
              />
            </div>
            <div className="flex items-center gap-2 mt-6 sm:mt-0">
              <input
                id="published"
                type="checkbox"
                checked={formData.published}
                onChange={(e) => onFormChange({ ...formData, published: e.target.checked })}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="published" className="text-sm text-gray-700">გამოქვეყნებული</label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">კატეგორია</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => onFormChange({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="ზოგადი"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">სურათის URL (არასავალდებულო)</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => onFormChange({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ტექსტი *</label>
            <textarea
              value={formData.content}
              onChange={(e) => onFormChange({ ...formData, content: e.target.value })}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="შეიყვანეთ ტექსტი"
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={onSubmit}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {editingNews ? 'განახლება' : 'შექმნა'}
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              გაუქმება
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
