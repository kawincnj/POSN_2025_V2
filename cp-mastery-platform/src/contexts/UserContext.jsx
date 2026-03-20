import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [completedTopics, setCompletedTopics] = useState(() => {
    try {
      const saved = localStorage.getItem('cp-completed');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse completed topics", e);
      return [];
    }
  });

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('cp-bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse bookmarks", e);
      return [];
    }
  });

  const [darkMode, setDarkMode] = useState(() => {
    try {
      if (localStorage.getItem('theme') === 'dark' || 
         (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('cp-completed', JSON.stringify(completedTopics));
  }, [completedTopics]);

  useEffect(() => {
    localStorage.setItem('cp-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTopic = (id) => {
    setCompletedTopics(prev => {
      const current = Array.isArray(prev) ? prev : [];
      return current.includes(id) ? current.filter(t => t !== id) : [...current, id];
    });
  };

  const toggleBookmark = (id) => {
    setBookmarks(prev => {
      const current = Array.isArray(prev) ? prev : [];
      return current.includes(id) ? current.filter(b => b !== id) : [...current, id];
    });
  };

  return (
    <UserContext.Provider value={{
      completedTopics: Array.isArray(completedTopics) ? completedTopics : [],
      toggleTopic,
      bookmarks: Array.isArray(bookmarks) ? bookmarks : [],
      toggleBookmark,
      darkMode,
      setDarkMode
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
