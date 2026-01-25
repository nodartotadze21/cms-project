import React from 'react';
import { Calendar, User, ChevronLeft } from 'lucide-react';
import { NewsItem } from '../../types';

interface NewsDetailPageProps {
  newsItem: NewsItem | null;
  onBack: () => void;
}

export const NewsDetailPage: React.FC<NewsDetailPageProps> = ({ newsItem, onBack }) => {
  if (!newsItem) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">სიახლე ვერ მოიძებნა</p>
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
        {newsItem.image && (
          <img
            src={newsItem.image}
            alt={newsItem.title}
            className="w-full h-96 object-cover"
          />
        )}

        <div className="p-8 sm:p-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
            {newsItem.title}
          </h1>

          <div className="flex flex-wrap gap-6 mb-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{new Date(newsItem.date).toLocaleDateString('ka-GE')}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>{newsItem.author}</span>
            </div>
            <div className={`text-xs px-3 py-1 rounded-full font-semibold ${newsItem.published ? 'text-green-700 bg-green-100' : 'text-yellow-700 bg-yellow-100'}`}>
              {newsItem.published ? 'გამოქვეყნებული' : 'გამოუქვეყნებელი'}
            </div>
          </div>

          <div className="border-t-2 border-gray-200 pt-8">
            <div className="text-gray-700 whitespace-pre-wrap text-lg leading-relaxed">
              {newsItem.content}
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
