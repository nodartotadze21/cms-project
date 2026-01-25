import React from 'react';
import { Calendar, ChevronLeft } from 'lucide-react';
import { Post } from '../../types';

interface BlogDetailPageProps {
  post: Post | null;
  onBack: () => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ post, onBack }) => {
  if (!post) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">ბლოგი პოსტი ვერ მოიძებნა</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition mb-6"
      >
        <ChevronLeft size={20} />
        უკან დაბრუნება
      </button>

      <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover"
          />
        )}

        <div className="p-8 sm:p-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            <Calendar size={18} />
            <span>{new Date(post.date).toLocaleDateString('ka-GE')}</span>
          </div>

          <div className="border-t-2 border-gray-200 pt-8">
            <div className="text-gray-700 whitespace-pre-wrap text-lg leading-relaxed">
              {post.content}
            </div>
          </div>
        </div>
      </article>

      <button
        onClick={onBack}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition"
      >
        უკან დაბრუნება
      </button>
    </div>
  );
};
