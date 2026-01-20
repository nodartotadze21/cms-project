import React from 'react';
import { NewsItem } from '../../types';

interface NewsPageProps {
  news: NewsItem[];
  isAdmin?: boolean;
  onTogglePublish?: (id: string) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ news, isAdmin = false, onTogglePublish }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold text-gray-800">Latest News</h2>
      {news.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow text-center text-gray-500">
          <p className="text-xl">No news posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid gap-8">
          {news.map(item => (
            <article key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              {item.image && (
                <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
              )}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</div>
                  <div className="text-xs px-2 py-1 rounded-full border ${item.published ? 'text-green-700 border-green-300 bg-green-50' : 'text-yellow-700 border-yellow-300 bg-yellow-50'}">
                    {item.published ? 'Published' : 'Unpublished'}
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">{item.title}</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{item.content}</p>
                {isAdmin && onTogglePublish && (
                  <div className="mt-4">
                    <button
                      onClick={() => onTogglePublish(item.id)}
                      className={`px-4 py-2 rounded text-white ${item.published ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'}`}
                    >
                      {item.published ? 'Unpublish' : 'Publish'}
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
