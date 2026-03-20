import React, { useState, lazy, Suspense } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { topics, categories } from '../data/curriculum';
import { useUser } from '../contexts/UserContext';
import { BookMarked, CheckCircle2, Circle, ArrowLeft, Copy, Check, Terminal, ChevronLeft, ChevronRight } from 'lucide-react';

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

const TopicPage = () => {
  const { id } = useParams();
  const topic = topics.find(t => t.id === id);
  const category = categories.find(c => c.id === topic?.categoryId);
  const { completedTopics, toggleTopic, bookmarks, toggleBookmark } = useUser();
  const [copied, setCopied] = useState(false);

  // Get prev/next topics in same category
  const categoryTopics = topics.filter(t => t.categoryId === topic?.categoryId);
  const currentIdx = categoryTopics.findIndex(t => t.id === id);
  const prevTopic = currentIdx > 0 ? categoryTopics[currentIdx - 1] : null;
  const nextTopic = currentIdx < categoryTopics.length - 1 ? categoryTopics[currentIdx + 1] : null;

  if (!topic) {
    return <Navigate to="/" replace />;
  }

  const isCompleted = completedTopics.includes(topic.id);
  const isBookmarked = bookmarks.includes(topic.id);

  const handleCopy = () => {
    navigator.clipboard.writeText(topic.code || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const ContentRenderer = ({ content }) => {
    return (
      <div className="prose dark:prose-invert max-w-none prose-p:leading-relaxed prose-headings:font-bold">
        {content.split('\n').map((line, i) => {
          // Headers
          if (line.startsWith('### ')) return <h3 key={i} className="text-2xl font-bold mt-8 mb-4 border-b pb-2">{renderInline(line.replace('### ', ''))}</h3>;

          // Numbered lists
          if (/^\d+\. /.test(line)) {
            const text = line.replace(/^\d+\.\s/, '');
            return <li key={i} className="ml-6 mb-2 list-decimal">{renderInline(text)}</li>;
          }

          // Bullet lists
          if (line.startsWith('- ')) return <li key={i} className="ml-6 mb-2 list-disc">{renderInline(line.replace('- ', ''))}</li>;

          // Empty lines
          if (line.trim() === '') return <div key={i} className="h-2" />;

          // Regular paragraphs
          return <p key={i} className="mb-4 text-muted-foreground text-lg">{renderInline(line)}</p>;
        })}
      </div>
    );
  };

  // Render inline formatting: **bold**, `code`, \`code\`
  const renderInline = (text) => {
    const parts = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      // Bold
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      // Inline code (handle escaped backticks too)
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
        // Add text before match
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
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
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
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest
                ${topic.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                  topic.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                {topic.difficulty}
              </span>
              <span className="text-muted-foreground text-sm font-medium">{category?.title}</span>
            </div>
            <h1 className="text-5xl font-black tracking-tight">{topic.title}</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleBookmark(topic.id)}
              className={`p-3 rounded-xl border transition-all ${isBookmarked ? 'bg-yellow-50 border-yellow-200 text-yellow-600 shadow-sm' : 'hover:bg-accent text-muted-foreground'}`}
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
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Mastered
                </>
              ) : (
                <>
                  <Circle className="w-5 h-5" />
                  Mark as Mastered
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-12">
        {/* Visualization Section */}
        {VisualizerComponent && (
          <section className="space-y-6">
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

        {/* Explanation Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-1 bg-primary rounded-full" />
            <h2 className="text-2xl font-bold">Concept Deep-Dive</h2>
          </div>
          <div className="bg-card border rounded-2xl p-8 md:p-10 shadow-sm text-card-foreground">
            <ContentRenderer content={topic.content} />
          </div>
        </section>

        {/* Code Implementation Section */}
        {topic.code && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-1 bg-primary rounded-full" />
                <h2 className="text-2xl font-bold">Implementation Template</h2>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-secondary hover:bg-secondary/80 rounded-lg transition-colors border"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy Template"}
              </button>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-[#1e1e1e] rounded-2xl p-6 border border-white/5 overflow-hidden">
                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-gray-400">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>solution.cpp</span>
                </div>
                <pre className="font-mono text-sm overflow-x-auto text-gray-300 scrollbar-thin scrollbar-thumb-white/10">
                  <code>{topic.code}</code>
                </pre>
              </div>
            </div>
          </section>
        )}
      </div>

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
