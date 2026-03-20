import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { topics, categories } from '../data/curriculum';
import { Search, ArrowRight, BookOpen } from 'lucide-react';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = useMemo(() => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return topics.filter(topic => 
      topic.title.toLowerCase().includes(lowerQuery) ||
      topic.description.toLowerCase().includes(lowerQuery) ||
      topic.content.toLowerCase().includes(lowerQuery)
    );
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
            return (
              <Link 
                key={topic.id} 
                to={`/topic/${topic.id}`}
                className="group flex flex-col p-6 bg-card border rounded-2xl hover:border-primary/50 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-2 py-1 rounded">
                    {category?.title || 'General'}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                    ${topic.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                      topic.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                    {topic.difficulty}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {topic.title}
                </h3>
                
                <p className="text-muted-foreground line-clamp-2 mb-4 flex-grow">
                  {topic.description}
                </p>

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
          <p className="text-sm mt-2">Try searching for "BFS", "Sorting", or "Tree"</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
