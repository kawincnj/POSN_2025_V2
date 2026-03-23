import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('cp-lang') || 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    localStorage.setItem('cp-lang', lang);
  }, [lang]);

  const toggleLang = () => setLang(prev => prev === 'en' ? 'th' : 'en');

  const t = useCallback((key) => {
    const keys = key.split('.');
    let value = translations[lang];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || translations['en']?.[keys[0]]?.[keys[1]] || key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
