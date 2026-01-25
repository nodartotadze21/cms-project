import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Post, NewsItem } from '../types';

interface AdminPanelProps {
  posts: Post[];
  onNewPost: () => void;
  onEditPost: (post: Post) => void;
  onDeletePost: (id: string) => void;
  news?: NewsItem[];
  onNewNews?: () => void;
  onEditNews?: (item: NewsItem) => void;
  onDeleteNews?: (id: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  posts,
  onNewPost,
  onEditPost,
  onDeletePost,
  news = [],
  onNewNews,
  onEditNews,
  onDeleteNews
}) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-bold text-gray-800">ადმინისტრატორის პანელი</h2>
        <button
          onClick={onNewPost}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <Plus size={20} /> ახალი ბლოგი
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">სათაური</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">თარიღი</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">მოქმედებები</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                    პოსტები ჯერ არ არის
                  </td>
                </tr>
              ) : (
                posts.map(post => (
                  <tr key={post.id}>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{post.title}</div>
                      <div className="text-sm text-gray-500 sm:hidden">
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 hidden sm:table-cell">
                      {new Date(post.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => onEditPost(post)}
                        className="text-blue-600 hover:text-blue-800 p-2 inline-flex items-center"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => onDeletePost(post.id)}
                        className="text-red-600 hover:text-red-800 p-2 inline-flex items-center"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-between items-center mt-12">
        <h3 className="text-2xl font-bold text-gray-800">სიახლეები</h3>
        {onNewNews && (
          <button
            onClick={onNewNews}
            className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
          >
            <Plus size={18} /> ახალი სიახლე
          </button>
        )}
      </div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">სათაური</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">თარიღი</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">სტატუსი</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">მოქმედებები</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {news.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">სიახლეები ჯერ არ არის</td>
                </tr>
              ) : (
                news.map(item => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{item.title}</div>
                      <div className="text-sm text-gray-500 sm:hidden">
                        {new Date(item.date).toLocaleDateString('ka-GE')}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 hidden sm:table-cell">
                      {new Date(item.date).toLocaleDateString('ka-GE')}
                    </td>
                    <td className="px-6 py-4 text-gray-500 hidden md:table-cell">
                      {item.published ? 'გამოქვეყნებული' : 'გამოუქვეყნებელი'}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      {onEditNews && (
                        <button
                          onClick={() => onEditNews(item)}
                          className="text-blue-600 hover:text-blue-800 p-2 inline-flex items-center"
                        >
                          <Edit2 size={18} />
                        </button>
                      )}
                      {onDeleteNews && (
                        <button
                          onClick={() => onDeleteNews(item.id)}
                          className="text-red-600 hover:text-red-800 p-2 inline-flex items-center"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
