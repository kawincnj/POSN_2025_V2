import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslatedTopics, useTranslatedCategories } from '../hooks/useTranslatedData';
import { useUser } from '../contexts/UserContext';
import { useLang } from '../contexts/LanguageContext';
import * as LucideIcons from 'lucide-react';

const Home = () => {
  const { completedTopics, bookmarks } = useUser();
  const { t } = useLang();
  const topics = useTranslatedTopics();
  const categories = useTranslatedCategories();
  const totalTopics = topics.length;
  const completedCount = completedTopics.length;
  const bookmarkedTopics = topics.filter(t => bookmarks.includes(t.id));

  // Stats
  const difficultyStats = {
    Beginner: topics.filter(t => t.difficulty === 'Beginner'),
    Intermediate: topics.filter(t => t.difficulty === 'Intermediate'),
    Advanced: topics.filter(t => t.difficulty === 'Advanced'),
  };
  const completedByDifficulty = {
    Beginner: difficultyStats.Beginner.filter(t => completedTopics.includes(t.id)).length,
    Intermediate: difficultyStats.Intermediate.filter(t => completedTopics.includes(t.id)).length,
    Advanced: difficultyStats.Advanced.filter(t => completedTopics.includes(t.id)).length,
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 py-8">
      {/* Hero */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          {t('home.title')}
        </h1>
        <p className="text-xl text-muted-foreground">
          {t('home.subtitle')}
        </p>
      </section>

      {/* Stats Dashboard */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-5 bg-card border rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">{t('home.overallProgress')}</span>
            <LucideIcons.TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-black text-primary">{completedCount}<span className="text-lg text-muted-foreground font-medium">/{totalTopics}</span></div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${totalTopics > 0 ? (completedCount / totalTopics) * 100 : 0}%` }} />
          </div>
        </div>

        {Object.entries(difficultyStats).map(([diff, topicList]) => {
          const completed = completedByDifficulty[diff];
          const colors = diff === 'Beginner'
            ? { text: 'text-green-600 dark:text-green-400', bg: 'bg-green-500', bar: 'bg-green-100 dark:bg-green-900/30' }
            : diff === 'Intermediate'
            ? { text: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-500', bar: 'bg-yellow-100 dark:bg-yellow-900/30' }
            : { text: 'text-red-600 dark:text-red-400', bg: 'bg-red-500', bar: 'bg-red-100 dark:bg-red-900/30' };
          return (
            <div key={diff} className="p-5 bg-card border rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">{diff}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${colors.bar} ${colors.text}`}>
                  {topicList.length} {t('home.topics')}
                </span>
              </div>
              <div className={`text-3xl font-black ${colors.text}`}>{completed}<span className="text-lg text-muted-foreground font-medium">/{topicList.length}</span></div>
              <div className={`h-2 rounded-full overflow-hidden ${colors.bar}`}>
                <div className={`h-full rounded-full transition-all duration-500 ${colors.bg}`}
                  style={{ width: `${topicList.length > 0 ? (completed / topicList.length) * 100 : 0}%` }} />
              </div>
            </div>
          );
        })}
      </section>

      {/* Bookmarked Topics */}
      {bookmarkedTopics.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <LucideIcons.BookMarked className="w-5 h-5 text-yellow-500" />
            <h2 className="text-xl font-bold">{t('home.bookmarkedTopics')}</h2>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{bookmarkedTopics.length}</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {bookmarkedTopics.slice(0, 6).map(topic => {
              const cat = categories.find(c => c.id === topic.categoryId);
              return (
                <Link
                  key={topic.id}
                  to={`/topic/${topic.id}`}
                  className="group flex items-center gap-3 p-4 bg-card border rounded-xl hover:border-yellow-300 dark:hover:border-yellow-700 hover:shadow-sm transition-all"
                >
                  <LucideIcons.BookMarked className="w-4 h-4 text-yellow-500 shrink-0 fill-current" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">{topic.title}</h4>
                    <span className="text-[10px] text-muted-foreground">{cat?.title}</span>
                  </div>
                  {completedTopics.includes(topic.id) && (
                    <LucideIcons.CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Categories Grid */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">{t('home.categories')}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((cat) => {
            const Icon = LucideIcons[cat.icon] || LucideIcons.HelpCircle;
            const catTopics = topics.filter(t => t.categoryId === cat.id);
            const catCompleted = catTopics.filter(t => completedTopics.includes(t.id)).length;
            const pct = catTopics.length > 0 ? (catCompleted / catTopics.length) * 100 : 0;
            return (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="group relative overflow-hidden p-8 bg-card border rounded-2xl hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="flex flex-col h-full space-y-4">
                  <div className="p-3 w-fit rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {cat.title}
                    </h2>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{catCompleted}/{catTopics.length} {t('home.mastered')}</span>
                      <span className="text-xs font-bold text-primary">{Math.round(pct)}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
