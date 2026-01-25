import React from 'react';
import { X } from 'lucide-react';
import { Post } from '../../types';

interface BlogDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
}

export const BlogDetailModal: React.FC<BlogDetailModalProps> = ({
  isOpen,
  onClose,
  post
}) => {
  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{post.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={28} />
          </button>
        </div>

        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg mb-6"
          />
        )}

        <div className="text-sm text-gray-600 mb-6 font-semibold">
          თარიღი: {new Date(post.date).toLocaleDateString('ka-GE')}
        </div>

        <div className="text-gray-700 whitespace-pre-wrap text-lg leading-relaxed mb-6">
          {post.content}
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
