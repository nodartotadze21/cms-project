import React from 'react';
import { Post } from '../../types';

interface NewsPageProps {
  posts: Post[];
}

export const NewsPage: React.FC<NewsPageProps> = ({ posts }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold text-gray-800">Latest News</h2>
      {posts.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow text-center text-gray-500">
          <p className="text-xl">No news posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid gap-8">
          {posts.map(post => (
            <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              {post.image && (
                <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
              )}
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">{new Date(post.date).toLocaleDateString()}</div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">{post.title}</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
