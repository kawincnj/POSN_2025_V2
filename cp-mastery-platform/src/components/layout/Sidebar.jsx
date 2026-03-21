import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { categories, topics } from '../../data/curriculum';
import * as LucideIcons from 'lucide-react';
import { cn } from '../../lib/utils';

const Sidebar = ({ isOpen }) => {
  const { completedTopics } = useUser();
  const [expandedCategories, setExpandedCategories] = React.useState([]);

  const toggleCategory = (id) => {
    setExpandedCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <aside className={cn(
      "fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-64 border-r bg-card transition-transform duration-300 ease-in-out z-30 overflow-y-auto",
      isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
    )}>
      <div className="p-4 space-y-6">
        <NavLink
          to="/"
          end
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all",
            isActive ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "hover:bg-accent text-muted-foreground"
          )}
        >
          <LucideIcons.LayoutGrid className="w-4 h-4" />
          Category Explorer
        </NavLink>

        {/* Tools Section */}
        <div className="space-y-1">
          <h3 className="px-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2">
            Tools
          </h3>
          <NavLink
            to="/roadmap"
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-bold transition-all",
              isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent"
            )}
          >
            <LucideIcons.Map className="w-3.5 h-3.5" />
            Learning Roadmap
          </NavLink>
          <NavLink
            to="/cheatsheet"
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-bold transition-all",
              isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent"
            )}
          >
            <LucideIcons.FileText className="w-3.5 h-3.5" />
            Cheat Sheet
          </NavLink>
          <NavLink
            to="/comparisons"
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-bold transition-all",
              isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent"
            )}
          >
            <LucideIcons.GitCompare className="w-3.5 h-3.5" />
            Comparisons
          </NavLink>
        </div>

        <div className="space-y-4">
          <h3 className="px-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
            Curriculum
          </h3>
          
          {categories.map(cat => {
            const Icon = LucideIcons[cat.icon] || LucideIcons.HelpCircle;
            const isExpanded = expandedCategories.includes(cat.id);
            const catTopics = topics.filter(t => t.categoryId === cat.id);

            return (
              <div key={cat.id} className="space-y-1">
                <button 
                  onClick={() => toggleCategory(cat.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-2 text-xs font-bold rounded-lg transition-colors",
                    isExpanded ? "text-foreground bg-muted/50" : "text-muted-foreground hover:bg-accent"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" />
                    {cat.title}
                  </span>
                  {isExpanded ? (
                    <LucideIcons.ChevronDown className="w-3 h-3" />
                  ) : (
                    <LucideIcons.ChevronRight className="w-3 h-3" />
                  )}
                </button>

                {isExpanded && (
                  <div className="mt-1 space-y-0.5">
                    {catTopics.map(topic => (
                      <NavLink
                        key={topic.id}
                        to={`/topic/${topic.id}`}
                        className={({ isActive }) => cn(
                          "group flex items-center justify-between pl-9 pr-4 py-1.5 text-xs rounded-md transition-all",
                          isActive 
                            ? "text-primary font-bold bg-primary/5" 
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        )}
                      >
                        <span className="truncate">{topic.title}</span>
                        {completedTopics.includes(topic.id) && (
                          <LucideIcons.CheckCircle2 className="w-3 h-3 text-green-500" />
                        )}
                      </NavLink>
                    ))}
                    {catTopics.length === 0 && (
                      <div className="pl-9 pr-4 py-1.5 text-[10px] text-muted-foreground italic">
                        Coming soon...
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
