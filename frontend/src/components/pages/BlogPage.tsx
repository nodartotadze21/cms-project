import React from 'react';
import { Post } from '../../types';
import { Calendar } from 'lucide-react';

interface BlogPageProps {
  posts: Post[];
}

export const BlogPage: React.FC<BlogPageProps> = ({ posts }) => {
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
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-800">{post.title}</h3>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{post.content}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
