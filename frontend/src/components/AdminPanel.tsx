import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
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

const ITEMS_PER_PAGE = 10;

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
  const [postPage, setPostPage] = useState(1);
  const [newsPage, setNewsPage] = useState(1);

  // ბლოგების pagination
  const totalPostPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const startPostIndex = (postPage - 1) * ITEMS_PER_PAGE;
  const paginatedPosts = posts.slice(startPostIndex, startPostIndex + ITEMS_PER_PAGE);

  // სიახლეების pagination
  const totalNewsPages = Math.ceil(news.length / ITEMS_PER_PAGE);
  const startNewsIndex = (newsPage - 1) * ITEMS_PER_PAGE;
  const paginatedNews = news.slice(startNewsIndex, startNewsIndex + ITEMS_PER_PAGE);

  const PaginationButtons = ({ page, totalPages, onPageChange, color = 'blue' }: any) => {
    const bgColor = color === 'green' ? 'bg-green-600' : 'bg-blue-600';
    return (
      <div className="flex items-center justify-center gap-2 mt-4">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="p-2 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-10 h-10 rounded font-semibold transition ${
                p === page
                  ? `${bgColor} text-white`
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="p-2 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold text-gray-800 mb-8">ფენიქსი - ადმინისტრატორის პანელი</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* მარცხენა მხარე - ბლოგი */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">ბლოგი</h3>
              <button
                onClick={onNewPost}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
              >
                <Plus size={18} /> ახალი ბლოგი
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
                    {paginatedPosts.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                          პოსტები ჯერ არ არის
                        </td>
                      </tr>
                    ) : (
                      paginatedPosts.map(post => (
                        <tr key={post.id}>
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900 text-sm">{post.title}</div>
                            <div className="text-xs text-gray-500 sm:hidden">
                              {new Date(post.date).toLocaleDateString('ka-GE')}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-500 hidden sm:table-cell text-sm">
                            {new Date(post.date).toLocaleDateString('ka-GE')}
                          </td>
                          <td className="px-6 py-4 text-right space-x-1">
                            <button
                              onClick={() => onEditPost(post)}
                              className="text-blue-600 hover:text-blue-800 p-2 inline-flex items-center"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => onDeletePost(post.id)}
                              className="text-red-600 hover:text-red-800 p-2 inline-flex items-center"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {totalPostPages > 1 && <PaginationButtons page={postPage} totalPages={totalPostPages} onPageChange={setPostPage} color="blue" />}
            <div className="text-xs text-gray-600 text-center">
              სულ: {posts.length} ბლოგი
            </div>
          </div>

          {/* მარჯვენა მხარე - სიახლეები */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">სიახლეები</h3>
              {onNewNews && (
                <button
                  onClick={onNewNews}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
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
                    {paginatedNews.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                          სიახლეები ჯერ არ არის
                        </td>
                      </tr>
                    ) : (
                      paginatedNews.map(item => (
                        <tr key={item.id}>
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900 text-sm">{item.title}</div>
                            <div className="text-xs text-gray-500 sm:hidden">
                              {new Date(item.date).toLocaleDateString('ka-GE')}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-500 hidden sm:table-cell text-sm">
                            {new Date(item.date).toLocaleDateString('ka-GE')}
                          </td>
                          <td className="px-6 py-4 text-gray-500 hidden md:table-cell text-sm">
                            {item.published ? 'გამოქვეყნებული' : 'გამოუქვეყნებელი'}
                          </td>
                          <td className="px-6 py-4 text-right space-x-1">
                            {onEditNews && (
                              <button
                                onClick={() => onEditNews(item)}
                                className="text-blue-600 hover:text-blue-800 p-2 inline-flex items-center"
                              >
                                <Edit2 size={16} />
                              </button>
                            )}
                            {onDeleteNews && (
                              <button
                                onClick={() => onDeleteNews(item.id)}
                                className="text-red-600 hover:text-red-800 p-2 inline-flex items-center"
                              >
                                <Trash2 size={16} />
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

            {totalNewsPages > 1 && <PaginationButtons page={newsPage} totalPages={totalNewsPages} onPageChange={setNewsPage} color="green" />}
            <div className="text-xs text-gray-600 text-center">
              სულ: {news.length} სიახლე
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
