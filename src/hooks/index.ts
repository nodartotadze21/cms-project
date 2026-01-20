import { useState, useCallback } from 'react';
import { Post, FormData } from '../types';
import { storage } from '../utils/storage';
import { STORAGE_KEYS } from '../utils/constants';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const saveData = useCallback(async (updatedPosts: Post[]) => {
    try {
      await storage.set(STORAGE_KEYS.POSTS, JSON.stringify(updatedPosts));
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }, []);

  const loadPosts = useCallback(async () => {
    try {
      const postsResult = await storage.get(STORAGE_KEYS.POSTS);
      if (postsResult) {
        setPosts(JSON.parse(postsResult.value));
      }
    } catch (error) {
      console.log('Loading initial posts');
    }
  }, []);

  const addPost = useCallback((newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
    saveData([newPost, ...posts]);
  }, [posts, saveData]);

  const updatePost = useCallback((updatedPost: Post) => {
    const updatedPosts = posts.map(p => p.id === updatedPost.id ? updatedPost : p);
    saveData(updatedPosts);
  }, [posts, saveData]);

  const deletePost = useCallback((id: number) => {
    const updatedPosts = posts.filter(p => p.id !== id);
    saveData(updatedPosts);
  }, [posts, saveData]);

  return { posts, loadPosts, addPost, updatePost, deletePost };
};

export const useAdminSession = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const loadSession = useCallback(async () => {
    try {
      const adminResult = await storage.get(STORAGE_KEYS.ADMIN_SESSION);
      if (adminResult && adminResult.value === 'true') {
        setIsAdmin(true);
      }
    } catch (error) {
      console.log('Loading session');
    }
  }, []);

  const logout = useCallback(async () => {
    setIsAdmin(false);
    try {
      await storage.delete(STORAGE_KEYS.ADMIN_SESSION);
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  }, []);

  return { isAdmin, setIsAdmin, loadSession, logout };
};
