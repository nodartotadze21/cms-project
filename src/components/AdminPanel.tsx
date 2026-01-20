import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Post } from '../types';

interface AdminPanelProps {
  posts: Post[];
  onNewPost: () => void;
  onEditPost: (post: Post) => void;
  onDeletePost: (id: number) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  posts,
  onNewPost,
  onEditPost,
  onDeletePost
}) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-bold text-gray-800">Admin Panel</h2>
        <button
          onClick={onNewPost}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <Plus size={20} /> New Post
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                    No posts yet
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
    </div>
  );
};
