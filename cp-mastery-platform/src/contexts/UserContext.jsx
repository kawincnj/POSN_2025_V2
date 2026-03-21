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

  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('cp-notes');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("Failed to parse notes", e);
      return {};
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
    localStorage.setItem('cp-notes', JSON.stringify(notes));
  }, [notes]);

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

  const setNote = (topicId, text) => {
    setNotes(prev => ({ ...prev, [topicId]: text }));
  };

  const getNote = (topicId) => {
    return notes[topicId] || '';
  };

  const exportProgress = () => {
    const data = {
      completedTopics,
      bookmarks,
      notes,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cp-mastery-progress-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importProgress = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.completedTopics) setCompletedTopics(data.completedTopics);
      if (data.bookmarks) setBookmarks(data.bookmarks);
      if (data.notes) setNotes(data.notes);
      return true;
    } catch (e) {
      console.error("Failed to import progress", e);
      return false;
    }
  };

  return (
    <UserContext.Provider value={{
      completedTopics: Array.isArray(completedTopics) ? completedTopics : [],
      toggleTopic,
      bookmarks: Array.isArray(bookmarks) ? bookmarks : [],
      toggleBookmark,
      notes,
      setNote,
      getNote,
      exportProgress,
      importProgress,
      darkMode,
      setDarkMode
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
