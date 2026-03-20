import React from 'react';
import { Link } from 'react-router-dom';
import { categories, topics } from '../data/curriculum';
import { useUser } from '../contexts/UserContext';
import * as LucideIcons from 'lucide-react';

const Home = () => {
  const { completedTopics } = useUser();
  const totalTopics = topics.length;
  const completedCount = completedTopics.length;

  return (
    <div className="space-y-12 animate-in fade-in duration-500 py-8">
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Master CP Concepts
        </h1>
        <p className="text-xl text-muted-foreground">
          A visual, interactive encyclopedia for Competitive Programming. Based on CP2 by Steven & Felix Halim.
        </p>
        {/* Progress bar */}
        <div className="max-w-md mx-auto space-y-2 pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-bold text-primary">{completedCount}/{totalTopics} topics mastered</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${totalTopics > 0 ? (completedCount / totalTopics) * 100 : 0}%` }} />
          </div>
        </div>
      </section>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((cat) => {
          const Icon = LucideIcons[cat.icon] || LucideIcons.HelpCircle;
          const catTopics = topics.filter(t => t.categoryId === cat.id);
          const catCompleted = catTopics.filter(t => completedTopics.includes(t.id)).length;
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
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-muted-foreground">{catCompleted}/{catTopics.length} mastered</span>
                  <div className="flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore
                    <LucideIcons.ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
