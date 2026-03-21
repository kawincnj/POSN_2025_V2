import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { categories, topics } from '../data/curriculum';
import { useUser } from '../contexts/UserContext';
import { ArrowLeft, ChevronRight, BookOpen, CheckCircle2, Filter, Clock, Tag } from 'lucide-react';

const CategoryPage = () => {
  const { id } = useParams();
  const category = categories.find(c => c.id === id);
  const categoryTopics = topics.filter(t => t.categoryId === id);
  const { completedTopics } = useUser();
  const [filter, setFilter] = useState('all'); // all, beginner, intermediate, advanced, completed, incomplete

  if (!category) {
    return <Navigate to="/" replace />;
  }

  const catCompleted = categoryTopics.filter(t => completedTopics.includes(t.id)).length;
  const pct = categoryTopics.length > 0 ? (catCompleted / categoryTopics.length) * 100 : 0;

  const filteredTopics = categoryTopics.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'completed') return completedTopics.includes(t.id);
    if (filter === 'incomplete') return !completedTopics.includes(t.id);
    return t.difficulty.toLowerCase() === filter;
  });

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'beginner', label: 'Beginner' },
    { key: 'intermediate', label: 'Intermediate' },
    { key: 'advanced', label: 'Advanced' },
    { key: 'completed', label: 'Completed' },
    { key: 'incomplete', label: 'To Do' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 border-b pb-6">
        <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Categories
        </Link>
        <h1 className="text-4xl font-bold">{category.title}</h1>
        <p className="text-xl text-muted-foreground">{category.description}</p>

        {/* Progress bar */}
        <div className="space-y-2 max-w-md">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-bold text-primary">{catCompleted}/{categoryTopics.length} mastered ({Math.round(pct)}%)</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-muted-foreground" />
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === f.key
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-muted text-muted-foreground hover:bg-accent'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredTopics.map(topic => {
          const isCompleted = completedTopics.includes(topic.id);
          return (
            <Link
              key={topic.id}
              to={`/topic/${topic.id}`}
              className={`group flex items-center justify-between p-6 bg-card border rounded-xl hover:border-primary/50 hover:bg-accent/50 transition-all duration-200 shadow-sm ${
                isCompleted ? 'border-green-200 dark:border-green-900/30' : ''
              }`}
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                    ${topic.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' :
                      topic.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30' :
                      'bg-red-100 text-red-700 dark:bg-red-900/30'}`}>
                    {topic.difficulty}
                  </span>
                  {topic.timeComplexity && (
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="w-3 h-3" />{topic.timeComplexity}
                    </span>
                  )}
                  {isCompleted && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                </div>
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{topic.title}</h3>
                <p className="text-muted-foreground line-clamp-1 text-sm">{topic.description}</p>
                {topic.tags && topic.tags.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {topic.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 ml-4" />
            </Link>
          );
        })}

        {filteredTopics.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground border border-dashed rounded-xl">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>{filter === 'all' ? `More topics for ${category.title} coming soon!` : `No ${filter} topics found.`}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
