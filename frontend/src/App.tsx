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
import { storage } from './utils/storage';
import { DEFAULT_ADMIN_PASSWORD, STORAGE_KEYS } from './utils/constants';
import { Post, FormData } from './types';
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

  // Load posts and admin status from storage
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Try loading from API first
      try {
        const posts = await api.fetchPosts();
        setPosts(posts);
      } catch (error) {
        // Fallback to localStorage
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
        {currentPage === 'news' && <NewsPage posts={posts} />}
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

      <Footer />
    </div>
  );
};

export default App;
