const API_BASE_URL = ((import.meta as any).env?.VITE_API_URL as string) || 'http://localhost:4000/api';

function normalizePost(doc: any) {
  return {
    id: (doc.id ?? doc._id)?.toString(),
    title: doc.title,
    content: doc.content,
    image: doc.image ?? '',
    date: doc.date,
    createdAt: (doc.createdAt ?? new Date().toISOString()).toString(),
  };
}

function normalizeNews(doc: any) {
  const author = doc.author ?? 'ადმინი';
  const category = doc.category ?? 'ზოგადი';
  return {
    id: (doc.id ?? doc._id)?.toString(),
    title: doc.title,
    content: doc.content,
    image: doc.image ?? '',
    author: author === 'Admin' ? 'ადმინი' : author,
    category: category === 'General' ? 'ზოგადი' : category,
    date: doc.date,
    published: Boolean(doc.published),
    createdAt: (doc.createdAt ?? new Date().toISOString()).toString(),
  };
}

export async function fetchPosts() {
  const res = await fetch(`${API_BASE_URL}/posts`);
  if (!res.ok) throw new Error('პოსტების ჩატვირთვა ვერ მოხერხდა');
  const data = await res.json();
  return Array.isArray(data) ? data.map(normalizePost) : [];
}

export async function createPost(data: { title: string; content: string; image: string; date: string }) {
  const res = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('პოსტის შექმნა ვერ მოხერხდა');
  const json = await res.json();
  return normalizePost(json);
}

export async function updatePost(id: string, data: { title: string; content: string; image: string; date: string }) {
  const res = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('პოსტის განახლება ვერ მოხერხდა');
  const json = await res.json();
  return normalizePost(json);
}

export async function deletePost(id: string) {
  const res = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('პოსტის წაშლა ვერ მოხერხდა');
  return res.json();
}

export async function fetchNews() {
  const res = await fetch(`${API_BASE_URL}/news`);
  if (!res.ok) throw new Error('სიახლეების ჩატვირთვა ვერ მოხერხდა');
  const data = await res.json();
  return Array.isArray(data) ? data.map(normalizeNews) : [];
}

export async function createNews(data: { title: string; content: string; image?: string; author?: string; category?: string; date: string }) {
  const res = await fetch(`${API_BASE_URL}/news`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('სიახლის შექმნა ვერ მოხერხდა');
  const json = await res.json();
  return normalizeNews(json);
}

export async function updateNews(id: string, data: { title: string; content: string; image?: string; author?: string; category?: string; date: string; published?: boolean }) {
  const res = await fetch(`${API_BASE_URL}/news/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('სიახლის განახლება ვერ მოხერხდა');
  const json = await res.json();
  return normalizeNews(json);
}

export async function deleteNews(id: string) {
  const res = await fetch(`${API_BASE_URL}/news/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('სიახლის წაშლა ვერ მოხერხდა');
  return res.json();
}
