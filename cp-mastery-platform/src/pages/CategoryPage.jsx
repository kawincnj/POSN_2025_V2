import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { categories, topics } from '../data/curriculum';
import { ArrowLeft, ChevronRight, BookOpen } from 'lucide-react';

const CategoryPage = () => {
  const { id } = useParams();
  const category = categories.find(c => c.id === id);
  const categoryTopics = topics.filter(t => t.categoryId === id);

  if (!category) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 border-b pb-6">
        <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Categories
        </Link>
        <h1 className="text-4xl font-bold">{category.title}</h1>
        <p className="text-xl text-muted-foreground">{category.description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {categoryTopics.map(topic => (
          <Link 
            key={topic.id} 
            to={`/topic/${topic.id}`}
            className="group flex items-center justify-between p-6 bg-card border rounded-xl hover:border-primary/50 hover:bg-accent/50 transition-all duration-200 shadow-sm"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                  ${topic.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 
                    topic.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30' :
                    'bg-red-100 text-red-700 dark:bg-red-900/30'}`}>
                  {topic.difficulty}
                </span>
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{topic.title}</h3>
              </div>
              <p className="text-muted-foreground line-clamp-1">{topic.description}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
        
        {categoryTopics.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground border border-dashed rounded-xl">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>More topics for {category.title} coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
