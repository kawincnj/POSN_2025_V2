import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { cn } from '../../lib/utils';
import { useUser } from '../../contexts/UserContext';
import { useLang } from '../../contexts/LanguageContext';
import { Keyboard, X, Download, Upload } from 'lucide-react';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showExportImport, setShowExportImport] = useState(false);
  const navigate = useNavigate();
  const { exportProgress, importProgress } = useUser();
  const { t } = useLang();

  const handleImport = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const success = importProgress(ev.target.result);
      if (success) {
        alert('Progress imported successfully!');
      } else {
        alert('Failed to import progress. Please check the file format.');
      }
    };
    reader.readAsText(file);
  }, [importProgress]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('[data-search-input]');
        if (searchInput) searchInput.focus();
      }
      if (e.key === 'Escape') {
        setShowShortcuts(false);
        setShowExportImport(false);
      }
      if (e.key === '?' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        e.preventDefault();
        setShowShortcuts(prev => !prev);
      }
      if (e.key === 'h' && e.altKey && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        e.preventDefault();
        navigate('/');
      }
      if (e.key === 'r' && e.altKey && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        e.preventDefault();
        navigate('/roadmap');
      }
      if (e.key === 'e' && e.altKey && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        e.preventDefault();
        setShowExportImport(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const shortcuts = [
    { keys: ['Ctrl', 'K'], description: t('layout.focusSearch') },
    { keys: ['?'], description: t('layout.toggleShortcuts') },
    { keys: ['Alt', 'H'], description: t('layout.goHome') },
    { keys: ['Alt', 'R'], description: t('layout.goRoadmap') },
    { keys: ['Alt', 'E'], description: t('layout.exportImport') },
    { keys: ['Esc'], description: t('layout.closeDialogs') },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="pt-14">
        <Sidebar isOpen={sidebarOpen} />

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className={cn(
          "transition-[margin] duration-300 ease-in-out",
          "lg:ml-64 p-6 min-h-[calc(100vh-3.5rem)]"
        )}>
          <div className="mx-auto max-w-5xl">
            <Outlet />
          </div>
        </main>
      </div>

      <button
        onClick={() => setShowShortcuts(true)}
        className="fixed bottom-4 right-4 p-3 bg-card border rounded-xl shadow-lg hover:shadow-xl transition-all text-muted-foreground hover:text-primary z-10"
        title={t('layout.keyboardShortcuts')}
      >
        <Keyboard className="w-5 h-5" />
      </button>

      {showShortcuts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={() => setShowShortcuts(false)}>
          <div className="bg-card border rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{t('layout.keyboardShortcuts')}</h2>
              <button onClick={() => setShowShortcuts(false)} className="p-1 hover:bg-accent rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              {shortcuts.map((s, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{s.description}</span>
                  <div className="flex items-center gap-1">
                    {s.keys.map((key, j) => (
                      <React.Fragment key={j}>
                        {j > 0 && <span className="text-xs text-muted-foreground">+</span>}
                        <kbd className="px-2 py-1 text-xs font-mono font-bold bg-muted border rounded-md">{key}</kbd>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showExportImport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={() => setShowExportImport(false)}>
          <div className="bg-card border rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{t('layout.exportImportTitle')}</h2>
              <button onClick={() => setShowExportImport(false)} className="p-1 hover:bg-accent rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <button
                onClick={exportProgress}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity"
              >
                <Download className="w-5 h-5" />
                {t('layout.exportBtn')}
              </button>
              <div className="text-center text-sm text-muted-foreground">{t('layout.or')}</div>
              <label className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-dashed rounded-xl cursor-pointer hover:bg-accent/30 transition-colors font-bold text-muted-foreground">
                <Upload className="w-5 h-5" />
                {t('layout.importBtn')}
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              </label>
              <p className="text-xs text-muted-foreground text-center">
                {t('layout.exportNote')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
