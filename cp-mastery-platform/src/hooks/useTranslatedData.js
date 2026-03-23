import { useMemo } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { categories as categoriesEn, topics as topicsEn } from '../data/curriculum';
import { categoriesTh, topicsTh } from '../data/curriculumTh';
import { topicsTh2 } from '../data/curriculumTh2';
import { topicsTh3 } from '../data/curriculumTh3';
import { topicEnhancementsTh } from '../data/topicEnhancementsTh';

// Merge all Thai topic translations
const allTopicsTh = { ...topicsTh, ...topicsTh2, ...topicsTh3 };

// Merge enhancement translations (whyLearn, whenToUse, etc.) into topic translations
for (const [id, fields] of Object.entries(topicEnhancementsTh)) {
  allTopicsTh[id] = { ...(allTopicsTh[id] || {}), ...fields };
}

export const useTranslatedCategories = () => {
  const { lang } = useLang();

  return useMemo(() => {
    if (lang === 'en') return categoriesEn;
    return categoriesEn.map(cat => ({
      ...cat,
      ...(categoriesTh[cat.id] || {}),
    }));
  }, [lang]);
};

export const useTranslatedTopics = () => {
  const { lang } = useLang();

  return useMemo(() => {
    if (lang === 'en') return topicsEn;
    return topicsEn.map(topic => ({
      ...topic,
      ...(allTopicsTh[topic.id] || {}),
    }));
  }, [lang]);
};
