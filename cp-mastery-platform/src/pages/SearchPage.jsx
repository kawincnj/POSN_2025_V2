import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { topics, categories } from '../data/curriculum';
import { useUser } from '../contexts/UserContext';
import { Search, ArrowRight, BookOpen, CheckCircle2, Clock, Tag } from 'lucide-react';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { completedTopics } = useUser();

  const results = useMemo(() => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();

    const scored = topics.map(topic => {
      const titleLower = topic.title.toLowerCase();
      const descLower = topic.description.toLowerCase();
      let score = 0;

      if (titleLower === lowerQuery) score = 100;
      else if (titleLower.startsWith(lowerQuery)) score = 80;
      else if (titleLower.includes(lowerQuery)) score = 60;
      else if (descLower.includes(lowerQuery)) score = 30;
      else if (topic.content.toLowerCase().includes(lowerQuery)) score = 10;
      else if (topic.tags && topic.tags.some(t => t.toLowerCase().includes(lowerQuery))) score = 40;

      return { topic, score };
    }).filter(s => s.score > 0);

    scored.sort((a, b) => b.score - a.score);
    return scored.map(s => s.topic);
  }, [query]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b pb-6">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <Search className="w-8 h-8 text-primary" />
          Search Results
        </h1>
        <p className="text-xl text-muted-foreground mt-2">
          Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
        </p>
      </div>

      {results.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {results.map(topic => {
            const category = categories.find(c => c.id === topic.categoryId);
            const isCompleted = completedTopics.includes(topic.id);
            return (
              <Link
                key={topic.id}
                to={`/topic/${topic.id}`}
                className={`group flex flex-col p-6 bg-card border rounded-2xl hover:border-primary/50 hover:shadow-md transition-all duration-200 ${
                  isCompleted ? 'border-green-200 dark:border-green-900/30' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-2 py-1 rounded">
                      {category?.title || 'General'}
                    </span>
                    {isCompleted && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                  </div>
                  <div className="flex items-center gap-2">
                    {topic.timeComplexity && (
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="w-3 h-3" />{topic.timeComplexity}
                      </span>
                    )}
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                      ${topic.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        topic.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                      {topic.difficulty}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {topic.title}
                </h3>

                <p className="text-muted-foreground line-clamp-2 mb-3 flex-grow text-sm">
                  {topic.description}
                </p>

                {topic.tags && topic.tags.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap mb-3">
                    {topic.tags.slice(0, 4).map(tag => (
                      <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                )}

                <div className="flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                  Read Topic <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-2xl text-muted-foreground">
          <BookOpen className="w-16 h-16 mb-4 opacity-20" />
          <p className="text-xl font-medium">No topics found</p>
          <p className="text-sm mt-2">Try searching for "BFS", "Sorting", "DP", or "Graph"</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
