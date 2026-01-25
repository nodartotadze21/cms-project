import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { FormData, Post } from '../../types';

interface PostFormModalProps {
  isOpen: boolean;
  editingPost: Post | null;
  formData: FormData;
  onFormChange: (data: FormData) => void;
  onSubmit: (imageFile?: File) => void;
  onClose: () => void;
}

export const PostFormModal: React.FC<PostFormModalProps> = ({
  isOpen,
  editingPost,
  formData,
  onFormChange,
  onSubmit,
  onClose
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(formData.image || '');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full my-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">{editingPost ? 'პოსტის რედაქტირება' : 'ახალი პოსტის შექმნა'}</h3>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">სურათი (არასავალდებულო)</label>
            <div className="flex items-center gap-4">
              <label className="flex-1 cursor-pointer">
                <div className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition">
                  <Upload size={20} className="text-gray-500" />
                  <span className="text-gray-600">
                    {imageFile ? imageFile.name : 'აირჩიეთ სურათი...'}
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            {(imagePreview || formData.image) && (
              <div className="mt-3">
                <img
                  src={imagePreview || formData.image}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}
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
              onClick={() => onSubmit(imageFile || undefined)}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {editingPost ? 'განახლება' : 'შექმნა'}
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
