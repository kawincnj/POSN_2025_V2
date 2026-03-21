import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Sun, Moon, Menu, GraduationCap, ArrowRight, Clock, Zap } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { topics, categories } from '../../data/curriculum';

const DIFFICULTY_COLORS = {
  Beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

const Navbar = ({ onMenuClick }) => {
  const { darkMode, setDarkMode } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const suggestions = useMemo(() => {
    if (!searchTerm.trim() || searchTerm.length < 1) return [];
    const lower = searchTerm.toLowerCase();

    // Score results by relevance
    const scored = topics.map(topic => {
      const titleLower = topic.title.toLowerCase();
      const descLower = topic.description.toLowerCase();
      let score = 0;

      if (titleLower === lower) score = 100;
      else if (titleLower.startsWith(lower)) score = 80;
      else if (titleLower.includes(lower)) score = 60;
      else if (descLower.includes(lower)) score = 30;
      else if (topic.content.toLowerCase().includes(lower)) score = 10;
      else if (topic.tags && topic.tags.some(t => t.toLowerCase().includes(lower))) score = 40;

      return { topic, score };
    }).filter(s => s.score > 0);

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 8);
  }, [searchTerm]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setShowSuggestions(false);
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      const selected = suggestions[selectedIndex];
      setShowSuggestions(false);
      setSearchTerm('');
      navigate(`/topic/${selected.topic.id}`);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
    setSelectedIndex(-1);
  };

  // Highlight matching text
  const highlightMatch = (text, query) => {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span className="text-primary font-bold bg-primary/10 rounded px-0.5">{text.slice(idx, idx + query.length)}</span>
        {text.slice(idx + query.length)}
      </>
    );
  };

  return (
    <nav className="fixed top-0 z-40 w-full h-14 border-b bg-card/80 backdrop-blur-sm">
      <div className="flex h-14 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 text-muted-foreground hover:bg-accent rounded-md"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center gap-2 font-bold text-lg text-primary">
            <GraduationCap className="w-6 h-6" />
            <span className="hidden sm:inline-block">CP Mastery</span>
          </Link>
        </div>

        <div className="flex items-center gap-4 flex-1 max-w-xl px-4" ref={searchRef}>
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              ref={inputRef}
              data-search-input
              type="text"
              placeholder="Search topics... (Ctrl+K)"
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={() => searchTerm.trim() && setShowSuggestions(true)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              className="w-full h-9 rounded-md border border-input bg-background pl-9 pr-4 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            />

            {/* Search Suggestions Dropdown */}
            {showSuggestions && searchTerm.trim() && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-xl shadow-xl overflow-hidden z-50 max-h-[420px] overflow-y-auto">
                {suggestions.length > 0 ? (
                  <>
                    <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b bg-muted/30">
                      <Zap className="w-3 h-3 inline mr-1" />
                      {suggestions.length} result{suggestions.length !== 1 ? 's' : ''} found
                    </div>
                    {suggestions.map(({ topic, score }, idx) => {
                      const category = categories.find(c => c.id === topic.categoryId);
                      return (
                        <Link
                          key={topic.id}
                          to={`/topic/${topic.id}`}
                          onClick={() => { setShowSuggestions(false); setSearchTerm(''); }}
                          className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-colors hover:bg-accent/50 ${
                            idx === selectedIndex ? 'bg-accent' : ''
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold truncate">
                                {highlightMatch(topic.title, searchTerm)}
                              </span>
                              <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider shrink-0 ${DIFFICULTY_COLORS[topic.difficulty]}`}>
                                {topic.difficulty}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] text-primary font-medium">{category?.title}</span>
                              <span className="text-[10px] text-muted-foreground truncate">{topic.description}</span>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        </Link>
                      );
                    })}
                    <Link
                      to={`/search?q=${encodeURIComponent(searchTerm)}`}
                      onClick={() => { setShowSuggestions(false); }}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold text-primary border-t bg-muted/20 hover:bg-accent/50 transition-colors"
                    >
                      <Search className="w-3 h-3" />
                      View all results for "{searchTerm}"
                    </Link>
                  </>
                ) : (
                  <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                    <Search className="w-6 h-6 mx-auto mb-2 opacity-30" />
                    <p>No topics found for "<span className="font-medium">{searchTerm}</span>"</p>
                    <p className="text-xs mt-1">Try "BFS", "DP", "Sorting", or "Graph"</p>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 text-muted-foreground hover:bg-accent rounded-full transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
