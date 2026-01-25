import React, { useState } from 'react';
import { NewsItem } from '../../types';
import { Calendar, User } from 'lucide-react';
import { NewsDetailModal } from '../modals/NewsDetailModal';

interface NewsPageProps {
  news: NewsItem[];
  isAdmin?: boolean;
  onTogglePublish?: (id: string) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ news, isAdmin = false, onTogglePublish }) => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">უახლესი სიახლეები</h2>
        <p className="text-xl text-gray-600">გაეცანით ჩვენი ცენტრის სიახლეებს და მიღწევებს</p>
      </div>
      {news.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl shadow-lg text-center text-gray-500">
          <p className="text-xl">სიახლეები ჯერ არ არის დამატებული. დაბრუნდით მოგვიანებით!</p>
        </div>
      ) : (
        <div className="grid gap-8">
          {news.map(item => (
            <article key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1">
              {item.image && (
                <img src={item.image} alt={item.title} className="w-full h-72 object-cover" />
              )}
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={16} />
                    {new Date(item.date).toLocaleDateString('ka-GE')}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User size={16} />
                    {item.author}
                  </div>
                  <div className={`text-xs px-3 py-1 rounded-full font-semibold ${item.published ? 'text-green-700 bg-green-100' : 'text-yellow-700 bg-yellow-100'}`}>
                    {item.published ? 'გამოქვეყნებული' : 'გამოუქვეყნებელი'}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedNews(item);
                    setShowDetail(true);
                  }}
                  className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 hover:text-blue-600 transition text-left w-full"
                >
                  {item.title}
                </button>
                <p className="text-gray-700 whitespace-pre-wrap text-lg leading-relaxed mb-4 line-clamp-3">{item.content}</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setSelectedNews(item);
                      setShowDetail(true);
                    }}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition"
                  >
                    ვრცლად
                  </button>
                  {isAdmin && onTogglePublish && (
                    <button
                      onClick={() => onTogglePublish(item.id)}
                      className={`px-6 py-3 rounded-lg text-white font-semibold transition-all transform hover:scale-105 ${item.published ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'}`}
                    >
                      {item.published ? 'გამოქვეყნების გაუქმება' : 'გამოქვეყნება'}
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <NewsDetailModal
        isOpen={showDetail}
        onClose={() => {
          setShowDetail(false);
          setSelectedNews(null);
        }}
        newsItem={selectedNews}
      />
    </div>
  );
};
