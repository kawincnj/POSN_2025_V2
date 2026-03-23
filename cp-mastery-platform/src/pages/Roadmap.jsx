import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslatedTopics, useTranslatedCategories } from '../hooks/useTranslatedData';
import { useUser } from '../contexts/UserContext';
import { useLang } from '../contexts/LanguageContext';
import { CheckCircle2, Circle, ChevronRight, Lock, ArrowRight, Trophy } from 'lucide-react';

const PHASE_KEYS = [
  'foundation', 'coreAlgorithms', 'graphFundamentals', 'dataStructures',
  'advancedGraph', 'mathematics', 'advancedDPStrings', 'expertTopics',
];

const LEARNING_PATH = [
  { phase: 1, titleKey: 'foundation', descKey: 'foundationDesc', topics: ['cpp-basics', 'ds-arrays', 'ds-sorting', 'ds-stacks-queues'] },
  { phase: 2, titleKey: 'coreAlgorithms', descKey: 'coreAlgorithmsDesc', topics: ['algo-complete-search', 'algo-greedy', 'algo-dnc', 'algo-dp-intro'] },
  { phase: 3, titleKey: 'graphFundamentals', descKey: 'graphFundamentalsDesc', topics: ['graph-representation', 'graph-traversal', 'graph-topo-sort', 'graph-sssp'] },
  { phase: 4, titleKey: 'dataStructures', descKey: 'dataStructuresDesc', topics: ['ds-sets-maps', 'ds-priority-queue', 'ds-union-find', 'ds-fenwick', 'ds-segment-tree'] },
  { phase: 5, titleKey: 'advancedGraph', descKey: 'advancedGraphDesc', topics: ['graph-bellman-ford', 'graph-floyd', 'graph-mst', 'graph-scc', 'graph-bridges'] },
  { phase: 6, titleKey: 'mathematics', descKey: 'mathematicsDesc', topics: ['math-primes', 'math-gcd-mod', 'math-combinatorics'] },
  { phase: 7, titleKey: 'advancedDPStrings', descKey: 'advancedDPStringsDesc', topics: ['algo-dp-advanced', 'string-basics', 'string-kmp', 'string-dp', 'string-suffix'] },
  { phase: 8, titleKey: 'expertTopics', descKey: 'expertTopicsDesc', topics: ['graph-network-flow', 'graph-euler', 'geo-basics', 'geo-convex-hull', 'algo-game-theory'] },
];

const Roadmap = () => {
  const { completedTopics } = useUser();
  const { t } = useLang();
  const topics = useTranslatedTopics();
  const categories = useTranslatedCategories();

  const getPhaseProgress = (phase) => {
    const validTopics = phase.topics.filter(tid => topics.find(t => t.id === tid));
    const completed = validTopics.filter(tid => completedTopics.includes(tid)).length;
    return { completed, total: validTopics.length, pct: validTopics.length > 0 ? (completed / validTopics.length) * 100 : 0 };
  };

  const isPhaseUnlocked = (phaseIdx) => {
    if (phaseIdx === 0) return true;
    const prev = getPhaseProgress(LEARNING_PATH[phaseIdx - 1]);
    return prev.pct >= 50;
  };

  const totalCompleted = LEARNING_PATH.reduce((sum, phase) => sum + getPhaseProgress(phase).completed, 0);
  const totalTopics = LEARNING_PATH.reduce((sum, phase) => sum + getPhaseProgress(phase).total, 0);
  const overallPct = totalTopics > 0 ? (totalCompleted / totalTopics) * 100 : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 py-4">
      <div className="space-y-2">
        <h1 className="text-4xl font-black tracking-tight">{t('roadmap.title')}</h1>
        <p className="text-lg text-muted-foreground">{t('roadmap.subtitle')}</p>
      </div>

      <div className="bg-card border rounded-2xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span className="text-lg font-bold">{t('roadmap.overallProgress')}</span>
          </div>
          <span className="text-2xl font-black text-primary">{Math.round(overallPct)}%</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full transition-all duration-700"
            style={{ width: `${overallPct}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground">{totalCompleted} {t('common.of')} {totalTopics} {t('roadmap.topicsMastered')}</p>
      </div>

      <div className="space-y-6">
        {LEARNING_PATH.map((phase, phaseIdx) => {
          const progress = getPhaseProgress(phase);
          const unlocked = isPhaseUnlocked(phaseIdx);
          const isComplete = progress.pct === 100;

          return (
            <div key={phase.phase} className={`border rounded-2xl overflow-hidden transition-all ${
              !unlocked ? 'opacity-60' : isComplete ? 'border-green-200 dark:border-green-900/30' : ''
            }`}>
              <div className={`p-6 ${isComplete ? 'bg-green-50 dark:bg-green-950/20' : 'bg-card'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black ${
                      isComplete ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' :
                      unlocked ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                    }`}>
                      {isComplete ? <CheckCircle2 className="w-5 h-5" /> : unlocked ? phase.phase : <Lock className="w-4 h-4" />}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{t('roadmap.phase')} {phase.phase}: {t(`roadmap.${phase.titleKey}`)}</h2>
                      <p className="text-sm text-muted-foreground">{t(`roadmap.${phase.descKey}`)}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-primary">{progress.completed}/{progress.total}</span>
                </div>

                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isComplete ? 'bg-green-500' : 'bg-primary'
                    }`}
                    style={{ width: `${progress.pct}%` }}
                  />
                </div>
              </div>

              {unlocked && (
                <div className="border-t divide-y">
                  {phase.topics.map(tid => {
                    const topic = topics.find(t => t.id === tid);
                    if (!topic) return null;
                    const done = completedTopics.includes(tid);
                    const cat = categories.find(c => c.id === topic.categoryId);
                    return (
                      <Link
                        key={tid}
                        to={`/topic/${tid}`}
                        className="flex items-center justify-between p-4 hover:bg-accent/30 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          {done ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                          ) : (
                            <Circle className="w-5 h-5 text-muted-foreground shrink-0" />
                          )}
                          <div>
                            <span className="font-semibold group-hover:text-primary transition-colors">{topic.title}</span>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className={`text-[10px] font-bold uppercase ${
                                topic.difficulty === 'Beginner' ? 'text-green-600 dark:text-green-400' :
                                topic.difficulty === 'Intermediate' ? 'text-yellow-600 dark:text-yellow-400' :
                                'text-red-600 dark:text-red-400'
                              }`}>{topic.difficulty}</span>
                              <span className="text-[10px] text-muted-foreground">{cat?.title}</span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Roadmap;
