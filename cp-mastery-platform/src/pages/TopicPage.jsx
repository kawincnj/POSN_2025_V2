import React, { useState, lazy, Suspense, useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { topics, categories } from '../data/curriculum';
import { useUser } from '../contexts/UserContext';
import {
  BookMarked, CheckCircle2, Circle, ArrowLeft, Copy, Check, Terminal,
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
  Lightbulb, Target, AlertTriangle, Clock, ExternalLink, Tag,
  BookOpen, Layers, TrendingUp, Code2, Play, StickyNote
} from 'lucide-react';

// Lazy load visualizers
const SortingVisualizer = lazy(() => import('../components/visualizers/SortingVisualizer'));
const GraphVisualizer = lazy(() => import('../components/visualizers/GraphVisualizer'));
const DPVisualizer = lazy(() => import('../components/visualizers/DPVisualizer'));
const BinarySearchVisualizer = lazy(() => import('../components/visualizers/BinarySearchVisualizer'));
const BacktrackingVisualizer = lazy(() => import('../components/visualizers/BacktrackingVisualizer'));
const UnionFindVisualizer = lazy(() => import('../components/visualizers/UnionFindVisualizer'));
const SegmentTreeVisualizer = lazy(() => import('../components/visualizers/SegmentTreeVisualizer'));
const FenwickTreeVisualizer = lazy(() => import('../components/visualizers/FenwickTreeVisualizer'));
const DijkstraVisualizer = lazy(() => import('../components/visualizers/DijkstraVisualizer'));
const MSTVisualizer = lazy(() => import('../components/visualizers/MSTVisualizer'));
const FloydVisualizer = lazy(() => import('../components/visualizers/FloydVisualizer'));
const KMPVisualizer = lazy(() => import('../components/visualizers/KMPVisualizer'));
const ConvexHullVisualizer = lazy(() => import('../components/visualizers/ConvexHullVisualizer'));

const VISUALIZER_MAP = {
  sorting: SortingVisualizer,
  graph: GraphVisualizer,
  dp: DPVisualizer,
  binarysearch: BinarySearchVisualizer,
  backtracking: BacktrackingVisualizer,
  unionfind: UnionFindVisualizer,
  segmenttree: SegmentTreeVisualizer,
  fenwick: FenwickTreeVisualizer,
  dijkstra: DijkstraVisualizer,
  mst: MSTVisualizer,
  floyd: FloydVisualizer,
  kmp: KMPVisualizer,
  convexhull: ConvexHullVisualizer,
};

const VisualizerFallback = () => (
  <div className="flex items-center justify-center h-32 text-muted-foreground">
    <div className="animate-pulse">Loading visualizer...</div>
  </div>
);

// Collapsible Section component
const CollapsibleSection = ({ icon: Icon, title, color, defaultOpen = false, children, badge }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className={`rounded-2xl border overflow-hidden transition-all duration-200 ${isOpen ? 'shadow-md' : 'shadow-sm hover:shadow-md'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-5 md:p-6 text-left transition-colors ${
          isOpen ? 'bg-card' : 'bg-card hover:bg-accent/30'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold">{title}</h3>
            {badge && <span className="text-xs text-muted-foreground">{badge}</span>}
          </div>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
      </button>
      {isOpen && (
        <div className="px-5 pb-5 md:px-6 md:pb-6 border-t bg-card">
          <div className="pt-4">{children}</div>
        </div>
      )}
    </div>
  );
};

// Generate a Python Tutor URL for RUNNABLE code
const getPythonTutorUrl = (code) => {
  if (!code) return null;
  const encoded = encodeURIComponent(code);
  return `https://pythontutor.com/visualize.html#code=${encoded}&cumulative=false&curInstr=0&heapPrimitives=nevernested&mode=display&origin=opt-frontend.js&py=cpp_g%2B%2B9.3.0&rawInputLstJSON=%5B%5D&textReferences=false`;
};

const TopicPage = () => {
  const { id } = useParams();
  const topic = topics.find(t => t.id === id);
  const category = categories.find(c => c.id === topic?.categoryId);
  const { completedTopics, toggleTopic, bookmarks, toggleBookmark, getNote, setNote } = useUser();
  const [copied, setCopied] = useState(false);
  const [activeSnippetIdx, setActiveSnippetIdx] = useState(0);

  // Get prev/next topics in same category
  const categoryTopics = topics.filter(t => t.categoryId === topic?.categoryId);
  const currentIdx = categoryTopics.findIndex(t => t.id === id);
  const prevTopic = currentIdx > 0 ? categoryTopics[currentIdx - 1] : null;
  const nextTopic = currentIdx < categoryTopics.length - 1 ? categoryTopics[currentIdx + 1] : null;

  // Get related topics
  const relatedTopics = topic?.relatedTopics
    ? topic.relatedTopics.map(rid => topics.find(t => t.id === rid)).filter(Boolean)
    : [];

  // Build code snippets: prefer codeSnippets array, fall back to single code string
  const codeSnippets = useMemo(() => {
    if (!topic) return [];
    if (topic.codeSnippets && topic.codeSnippets.length > 0) {
      return topic.codeSnippets;
    }
    if (topic.code) {
      return [{ name: 'Template', code: topic.code, pythonTutorCode: topic.pythonTutorCode || null }];
    }
    return [];
  }, [topic]);

  // Reset active snippet when topic changes
  React.useEffect(() => {
    setActiveSnippetIdx(0);
    setCopied(false);
  }, [id]);

  if (!topic) {
    return <Navigate to="/" replace />;
  }

  const isCompleted = completedTopics.includes(topic.id);
  const isBookmarked = bookmarks.includes(topic.id);

  const activeSnippet = codeSnippets[activeSnippetIdx] || null;

  const handleCopy = () => {
    if (!activeSnippet) return;
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get Python Tutor URL for the active snippet's runnable code
  const pythonTutorUrl = activeSnippet?.pythonTutorCode
    ? getPythonTutorUrl(activeSnippet.pythonTutorCode)
    : null;

  const ContentRenderer = ({ content }) => {
    return (
      <div className="prose dark:prose-invert max-w-none prose-p:leading-relaxed prose-headings:font-bold">
        {content.split('\n').map((line, i) => {
          if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold mt-6 mb-3 border-b pb-2 text-foreground">{renderInline(line.replace('### ', ''))}</h3>;
          if (/^\d+\. /.test(line)) {
            const text = line.replace(/^\d+\.\s/, '');
            return <li key={i} className="ml-6 mb-2 list-decimal">{renderInline(text)}</li>;
          }
          if (line.startsWith('- ')) return <li key={i} className="ml-6 mb-2 list-disc">{renderInline(line.replace('- ', ''))}</li>;
          if (line.trim() === '') return <div key={i} className="h-2" />;
          return <p key={i} className="mb-3 text-muted-foreground">{renderInline(line)}</p>;
        })}
      </div>
    );
  };

  const renderInline = (text) => {
    const parts = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      const codeMatch = remaining.match(/\\?`([^`]+?)\\?`/);

      let firstMatch = null;
      let firstIdx = Infinity;

      if (boldMatch && remaining.indexOf(boldMatch[0]) < firstIdx) {
        firstIdx = remaining.indexOf(boldMatch[0]);
        firstMatch = { type: 'bold', match: boldMatch };
      }
      if (codeMatch && remaining.indexOf(codeMatch[0]) < firstIdx) {
        firstIdx = remaining.indexOf(codeMatch[0]);
        firstMatch = { type: 'code', match: codeMatch };
      }

      if (firstMatch) {
        if (firstIdx > 0) {
          parts.push(<span key={key++}>{remaining.slice(0, firstIdx)}</span>);
        }
        if (firstMatch.type === 'bold') {
          parts.push(<strong key={key++} className="text-foreground font-bold">{firstMatch.match[1]}</strong>);
        } else {
          parts.push(
            <code key={key++} className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono text-primary">
              {firstMatch.match[1]}
            </code>
          );
        }
        remaining = remaining.slice(firstIdx + firstMatch.match[0].length);
      } else {
        parts.push(<span key={key++}>{remaining}</span>);
        break;
      }
    }
    return parts;
  };

  const VisualizerComponent = VISUALIZER_MAP[topic.visualizer];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header */}
      <div className="space-y-6">
        <Link
          to={`/category/${category?.id}`}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to {category?.title}
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest
                ${topic.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                  topic.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                {topic.difficulty}
              </span>
              <span className="text-muted-foreground text-sm font-medium">{category?.title}</span>
              {topic.timeComplexity && (
                <span className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                  <Clock className="w-3 h-3" />
                  {topic.timeComplexity}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">{topic.title}</h1>
            <p className="text-lg text-muted-foreground">{topic.description}</p>

            {/* Tags */}
            {topic.tags && topic.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-3.5 h-3.5 text-muted-foreground" />
                {topic.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted text-muted-foreground border">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => toggleBookmark(topic.id)}
              className={`p-3 rounded-xl border transition-all ${isBookmarked ? 'bg-yellow-50 border-yellow-200 text-yellow-600 shadow-sm dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-400' : 'hover:bg-accent text-muted-foreground'}`}
              title="Bookmark Topic"
            >
              <BookMarked className={`w-6 h-6 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => toggleTopic(topic.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold shadow-sm transition-all active:scale-95 ${
                isCompleted
                  ? 'bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
                  : 'bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20'
              }`}
            >
              {isCompleted ? (
                <><CheckCircle2 className="w-5 h-5" /> Mastered</>
              ) : (
                <><Circle className="w-5 h-5" /> Mark as Mastered</>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Why Learn This */}
        {topic.whyLearn && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 shrink-0">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-blue-900 dark:text-blue-300">Why Learn This?</h3>
                <div className="space-y-2 text-blue-800 dark:text-blue-200">
                  {topic.whyLearn.split('\n').map((line, i) => (
                    line.trim() ? (
                      line.startsWith('- ') ? (
                        <li key={i} className="ml-4 list-disc">{renderInline(line.replace('- ', ''))}</li>
                      ) : (
                        <p key={i}>{renderInline(line)}</p>
                      )
                    ) : <div key={i} className="h-1" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Visualization Section */}
        {VisualizerComponent && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-1 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold">Interactive Visualization</h2>
            </div>
            <div className="rounded-2xl overflow-hidden border bg-card shadow-lg">
              <Suspense fallback={<VisualizerFallback />}>
                <VisualizerComponent />
              </Suspense>
            </div>
          </section>
        )}

        {/* When to Use */}
        {topic.whenToUse && (
          <CollapsibleSection
            icon={Target}
            title="When to Use"
            color="bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400"
            defaultOpen={true}
            badge="Pattern recognition"
          >
            <ContentRenderer content={topic.whenToUse} />
          </CollapsibleSection>
        )}

        {/* Concept Deep-Dive */}
        <CollapsibleSection
          icon={BookOpen}
          title="Concept Deep-Dive"
          color="bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
          defaultOpen={true}
          badge="Full explanation"
        >
          <ContentRenderer content={topic.content} />
        </CollapsibleSection>

        {/* Common Mistakes & Pitfalls */}
        {topic.commonMistakes && (
          <CollapsibleSection
            icon={AlertTriangle}
            title="Common Mistakes & Pitfalls"
            color="bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400"
            defaultOpen={false}
            badge="Avoid these traps"
          >
            <div className="space-y-3">
              {topic.commonMistakes.split('\n').filter(l => l.trim()).map((line, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30">
                  <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <span className="text-sm">{renderInline(line.replace(/^-\s*/, ''))}</span>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Time & Space Complexity Analysis */}
        {topic.complexityAnalysis && (
          <CollapsibleSection
            icon={TrendingUp}
            title="Complexity Analysis"
            color="bg-cyan-100 text-cyan-600 dark:bg-cyan-900/50 dark:text-cyan-400"
            defaultOpen={false}
            badge={topic.timeComplexity || 'Performance'}
          >
            <ContentRenderer content={topic.complexityAnalysis} />
          </CollapsibleSection>
        )}

        {/* Code Implementation Section with Tabs */}
        {codeSnippets.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-1 bg-primary rounded-full" />
                <h2 className="text-2xl font-bold">Implementation Template</h2>
              </div>
              <div className="flex items-center gap-2">
                {pythonTutorUrl && (
                  <a
                    href={pythonTutorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40 rounded-lg transition-colors border border-green-200 dark:border-green-800"
                  >
                    <Play className="w-4 h-4" />
                    <span className="hidden sm:inline">Visualize on</span> Python Tutor
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-secondary hover:bg-secondary/80 rounded-lg transition-colors border"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* Tab switcher for multiple snippets */}
            {codeSnippets.length > 1 && (
              <div className="flex items-center gap-1 bg-muted/50 rounded-xl p-1 overflow-x-auto">
                {codeSnippets.map((snippet, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setActiveSnippetIdx(idx); setCopied(false); }}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                      idx === activeSnippetIdx
                        ? 'bg-card text-foreground shadow-sm border'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    }`}
                  >
                    {snippet.name}
                  </button>
                ))}
              </div>
            )}

            {/* Code block */}
            {activeSnippet && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-[#1e1e1e] rounded-2xl p-6 border border-white/5 overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>{activeSnippet.name.toLowerCase().replace(/\s+/g, '_')}.cpp</span>
                    </div>
                    {!activeSnippet.pythonTutorCode && (
                      <span className="text-[10px] text-gray-500 bg-gray-800 px-2 py-0.5 rounded">snippet — not runnable</span>
                    )}
                    {activeSnippet.pythonTutorCode && (
                      <span className="text-[10px] text-green-400 bg-green-900/30 px-2 py-0.5 rounded flex items-center gap-1">
                        <Play className="w-2.5 h-2.5" /> runnable
                      </span>
                    )}
                  </div>
                  <pre className="font-mono text-sm overflow-x-auto text-gray-300 scrollbar-thin scrollbar-thumb-white/10">
                    <code>{activeSnippet.code}</code>
                  </pre>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Related Topics */}
        {relatedTopics.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-1 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold">Related Topics</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedTopics.map(rt => {
                const rtCat = categories.find(c => c.id === rt.categoryId);
                return (
                  <Link
                    key={rt.id}
                    to={`/topic/${rt.id}`}
                    className="group flex items-center justify-between p-4 bg-card border rounded-xl hover:border-primary/50 hover:shadow-md transition-all"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                          rt.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          rt.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>{rt.difficulty}</span>
                        <span className="text-[10px] text-primary font-medium">{rtCat?.title}</span>
                      </div>
                      <h4 className="font-semibold mt-1 group-hover:text-primary transition-colors truncate">{rt.title}</h4>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 group-hover:translate-x-1 transition-transform" />
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Practice Problems */}
        {topic.practiceProblems && topic.practiceProblems.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-1 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold">Practice Problems</h2>
            </div>
            <div className="grid gap-3">
              {topic.practiceProblems.map((problem, i) => (
                <a
                  key={i}
                  href={problem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 bg-card border rounded-xl hover:border-primary/50 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                      problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold group-hover:text-primary transition-colors">{problem.name}</h4>
                      <span className="text-xs text-muted-foreground">{problem.source} &bull; {problem.difficulty}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Personal Notes */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-1 bg-primary rounded-full" />
          <h2 className="text-2xl font-bold">My Notes</h2>
          <StickyNote className="w-5 h-5 text-muted-foreground" />
        </div>
        <textarea
          value={getNote(topic.id)}
          onChange={(e) => setNote(topic.id, e.target.value)}
          placeholder="Write your personal notes for this topic... (auto-saved)"
          className="w-full min-h-[120px] p-4 rounded-2xl border bg-card text-sm resize-y outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground/50"
        />
        {getNote(topic.id) && (
          <p className="text-xs text-muted-foreground">Notes are saved automatically to your browser.</p>
        )}
      </section>

      {/* Navigation between topics */}
      <div className="flex items-center justify-between pt-6 border-t">
        {prevTopic ? (
          <Link to={`/topic/${prevTopic.id}`} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <div className="text-[10px] uppercase text-muted-foreground">Previous</div>
              <div className="group-hover:text-primary">{prevTopic.title}</div>
            </div>
          </Link>
        ) : <div />}
        {nextTopic ? (
          <Link to={`/topic/${nextTopic.id}`} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group">
            <div className="text-right">
              <div className="text-[10px] uppercase text-muted-foreground">Next</div>
              <div className="group-hover:text-primary">{nextTopic.title}</div>
            </div>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : <div />}
      </div>

      <div className="py-10 border-t text-center text-muted-foreground text-sm">
        Competitive Programming Mastery Platform &bull; Based on CP2 by Steven & Felix Halim
      </div>
    </div>
  );
};

export default TopicPage;
