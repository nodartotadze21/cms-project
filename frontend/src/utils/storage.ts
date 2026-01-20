import { StorageAPI } from '../types';

// NOTE: This app was originally written to use a host-provided `window.storage` API.
// To make it work in a normal browser build, we fall back to `localStorage`.
export const storage: StorageAPI = {
  async get(key: string): Promise<{ value: string } | null> {
    const anyWindow = window as any;
    if (anyWindow?.storage?.get) return await anyWindow.storage.get(key);
    const value = window.localStorage.getItem(key);
    return value == null ? null : { value };
  },
  async set(key: string, value: string): Promise<void> {
    const anyWindow = window as any;
    if (anyWindow?.storage?.set) return await anyWindow.storage.set(key, value);
    window.localStorage.setItem(key, value);
  },
  async delete(key: string): Promise<void> {
    const anyWindow = window as any;
    if (anyWindow?.storage?.delete) return await anyWindow.storage.delete(key);
    window.localStorage.removeItem(key);
  }
};
