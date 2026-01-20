import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { MainPage } from './components/pages/MainPage';
import { NewsPage } from './components/pages/NewsPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { LoginModal } from './components/modals/LoginModal';
import { PostFormModal } from './components/modals/PostFormModal';
import { NewsFormModal } from './components/modals/NewsFormModal';
import { storage } from './utils/storage';
import { DEFAULT_ADMIN_PASSWORD, STORAGE_KEYS } from './utils/constants';
import { Post, FormData, NewsItem, NewsFormData } from './types';
import * as api from './utils/api';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('main');
  const [posts, setPosts] = useState<Post[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    image: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [newsForm, setNewsForm] = useState<NewsFormData>({
    title: '',
    content: '',
    image: '',
    author: 'Admin',
    category: 'General',
    date: new Date().toISOString().split('T')[0],
    published: true,
  });

  // Load posts and admin status from storage
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Try loading from API first
      try {
        const [postsFromApi, newsFromApi] = await Promise.all([
          api.fetchPosts(),
          api.fetchNews(),
        ]);
        setPosts(postsFromApi);
        setNews(newsFromApi);
      } catch (error) {
        // Fallback to localStorage for posts
        console.log('API unavailable, loading from localStorage');
        const postsResult = await storage.get(STORAGE_KEYS.POSTS);
        if (postsResult) {
          setPosts(JSON.parse(postsResult.value));
        }
      }

      // Admin session from localStorage
      const adminResult = await storage.get(STORAGE_KEYS.ADMIN_SESSION);
      if (adminResult && adminResult.value === 'true') {
        setIsAdmin(true);
      }
    } catch (error) {
      console.log('Loading initial data');
    } finally {
      setLoading(false);
    }
  };

  const saveData = async (updatedPosts: Post[]) => {
    try {
      setPosts(updatedPosts);
      // Save to localStorage as fallback
      await storage.set(STORAGE_KEYS.POSTS, JSON.stringify(updatedPosts));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleLogin = async () => {
    const configuredPassword =
      (await storage.get(STORAGE_KEYS.ADMIN_PASSWORD))?.value ?? DEFAULT_ADMIN_PASSWORD;

    if (adminPassword === configuredPassword) {
      setIsAdmin(true);
      setShowLogin(false);
      setAdminPassword('');
      try {
        await storage.set(STORAGE_KEYS.ADMIN_SESSION, 'true');
      } catch (error) {
        console.error('Error saving session:', error);
      }
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = async () => {
    setIsAdmin(false);
    setCurrentPage('main');
    try {
      await storage.delete(STORAGE_KEYS.ADMIN_SESSION);
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  };

  const handleSubmitPost = async () => {
    if (!formData.title || !formData.content) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      let updatedPost: Post;
      if (editingPost) {
        // Update existing post
        updatedPost = await api.updatePost(editingPost.id.toString(), {
          title: formData.title,
          content: formData.content,
          image: formData.image || '',
          date: formData.date
        });
        const updatedPosts = posts.map(p => (p.id === editingPost.id ? updatedPost : p));
        await saveData(updatedPosts);
      } else {
        // Create new post
        updatedPost = await api.createPost({
          title: formData.title,
          content: formData.content,
          image: formData.image || '',
          date: formData.date
        });
        await saveData([updatedPost, ...posts]);
      }

      setShowPostForm(false);
      setEditingPost(null);
      setFormData({
        title: '',
        content: '',
        image: '',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save post. Please try again.');
    }
  };

  const handleDeletePost = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await api.deletePost(id);
        const updatedPosts = posts.filter(p => p.id !== id);
        await saveData(updatedPosts);
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again.');
      }
    }
  };

  const handleTogglePublish = async (id: string) => {
    try {
      const item = news.find(n => n.id === id);
      if (!item) return;
      const updated = await api.updateNews(id, {
        title: item.title,
        content: item.content,
        image: item.image,
        author: item.author,
        category: item.category,
        date: item.date,
        published: !item.published,
      });
      setNews(prev => prev.map(n => (n.id === id ? updated : n)));
    } catch (error) {
      console.error('Error toggling publish:', error);
      alert('Failed to update publish state.');
    }
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      image: post.image || '',
      date: post.date
    });
    setShowPostForm(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isAdmin={isAdmin}
        onLogout={handleLogout}
        onLoginClick={() => setShowLogin(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'main' && <MainPage onNewsClick={() => setCurrentPage('news')} />}
        {currentPage === 'news' && <NewsPage news={news} isAdmin={isAdmin} onTogglePublish={handleTogglePublish} />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'admin' && isAdmin && (
          <AdminPanel
            posts={posts}
            onNewPost={() => {
              setShowPostForm(true);
              setEditingPost(null);
            }}
            onEditPost={handleEditPost}
            onDeletePost={handleDeletePost}
            news={news}
            onNewNews={() => {
              setShowNewsForm(true);
              setEditingNews(null);
              setNewsForm({
                title: '',
                content: '',
                image: '',
                author: 'Admin',
                category: 'General',
                date: new Date().toISOString().split('T')[0],
                published: true,
              });
            }}
            onEditNews={(item) => {
              setEditingNews(item);
              setNewsForm({
                title: item.title,
                content: item.content,
                image: item.image,
                author: item.author,
                category: item.category,
                date: item.date,
                published: item.published,
              });
              setShowNewsForm(true);
            }}
            onDeleteNews={async (id) => {
              if (window.confirm('Delete this news item?')) {
                try {
                  await api.deleteNews(id);
                  setNews(prev => prev.filter(n => n.id !== id));
                } catch (e) {
                  alert('Failed to delete news.');
                }
              }
            }}
          />
        )}
      </main>

      <LoginModal
        isOpen={showLogin}
        password={adminPassword}
        onPasswordChange={setAdminPassword}
        onLogin={handleLogin}
        onClose={() => {
          setShowLogin(false);
          setAdminPassword('');
        }}
      />

      <PostFormModal
        isOpen={showPostForm}
        editingPost={editingPost}
        formData={formData}
        onFormChange={setFormData}
        onSubmit={handleSubmitPost}
        onClose={() => {
          setShowPostForm(false);
          setEditingPost(null);
        }}
      />

      <NewsFormModal
        isOpen={showNewsForm}
        editingNews={editingNews}
        formData={newsForm}
        onFormChange={setNewsForm}
        onSubmit={async () => {
          if (!newsForm.title || !newsForm.content) {
            alert('Please fill in required fields');
            return;
          }
          try {
            if (editingNews) {
              const updated = await api.updateNews(editingNews.id, {
                title: newsForm.title,
                content: newsForm.content,
                image: newsForm.image,
                author: newsForm.author,
                category: newsForm.category,
                date: newsForm.date,
                published: newsForm.published,
              });
              setNews(prev => prev.map(n => (n.id === editingNews.id ? updated : n)));
            } else {
              const created = await api.createNews({
                title: newsForm.title,
                content: newsForm.content,
                image: newsForm.image,
                author: newsForm.author,
                category: newsForm.category,
                date: newsForm.date,
              });
              setNews(prev => [created, ...prev]);
            }
            setShowNewsForm(false);
            setEditingNews(null);
          } catch (e) {
            console.error(e);
            alert('Failed to save news item');
          }
        }}
        onClose={() => {
          setShowNewsForm(false);
          setEditingNews(null);
        }}
      />

      <Footer />
    </div>
  );
};

export default App;
