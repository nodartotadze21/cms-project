import React from 'react';
import { Post } from '../../types';
import { Calendar } from 'lucide-react';

interface BlogPageProps {
  posts: Post[];
  onSelectPost?: (post: Post) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ posts, onSelectPost }) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">ბლოგი</h2>
        <p className="text-xl text-gray-600">წაიკითხეთ ჩვენი ბოლო ბლოგ-პოსტები</p>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl shadow-lg text-center text-gray-500">
          <p className="text-xl">ბლოგ პოსტები ჯერ არ არის დამატებული.</p>
        </div>
      ) : (
        <div className="grid gap-8">
          {posts.map(post => (
            <article
              key={post.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              {post.image && (
                <img src={post.image} alt={post.title} className="w-full h-72 object-cover" />
              )}
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <Calendar size={16} />
                  {new Date(post.date).toLocaleDateString('ka-GE')}
                </div>
                <button
                  onClick={() => onSelectPost?.(post)}
                  className="text-2xl sm:text-3xl font-bold mb-3 text-gray-800 hover:text-blue-600 transition text-left w-full"
                >
                  {post.title}
                </button>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed mb-4 line-clamp-3">{post.content}</p>
                <button
                  onClick={() => onSelectPost?.(post)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition"
                >
                  ვრცლად
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
