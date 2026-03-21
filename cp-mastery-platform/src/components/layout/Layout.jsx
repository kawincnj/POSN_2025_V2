import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { cn } from '../../lib/utils';
import { useUser } from '../../contexts/UserContext';
import { Keyboard, X, Download, Upload } from 'lucide-react';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showExportImport, setShowExportImport] = useState(false);
  const navigate = useNavigate();
  const { exportProgress, importProgress } = useUser();

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
      // Ctrl+K or Cmd+K → focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('[data-search-input]');
        if (searchInput) searchInput.focus();
      }
      // Escape → close modals
      if (e.key === 'Escape') {
        setShowShortcuts(false);
        setShowExportImport(false);
      }
      // ? → show shortcuts (when not in input)
      if (e.key === '?' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        e.preventDefault();
        setShowShortcuts(prev => !prev);
      }
      // g then h → go home (when not in input)
      if (e.key === 'h' && e.altKey && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        e.preventDefault();
        navigate('/');
      }
      // Alt+R → roadmap
      if (e.key === 'r' && e.altKey && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        e.preventDefault();
        navigate('/roadmap');
      }
      // Alt+E → export/import
      if (e.key === 'e' && e.altKey && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        e.preventDefault();
        setShowExportImport(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const shortcuts = [
    { keys: ['Ctrl', 'K'], description: 'Focus search bar' },
    { keys: ['?'], description: 'Toggle shortcuts help' },
    { keys: ['Alt', 'H'], description: 'Go to Home' },
    { keys: ['Alt', 'R'], description: 'Go to Roadmap' },
    { keys: ['Alt', 'E'], description: 'Export / Import progress' },
    { keys: ['Esc'], description: 'Close dialogs' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="pt-14">
        <Sidebar isOpen={sidebarOpen} />

        {/* Overlay for mobile */}
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

      {/* Keyboard shortcut hint */}
      <button
        onClick={() => setShowShortcuts(true)}
        className="fixed bottom-4 right-4 p-3 bg-card border rounded-xl shadow-lg hover:shadow-xl transition-all text-muted-foreground hover:text-primary z-10"
        title="Keyboard Shortcuts (?)"
      >
        <Keyboard className="w-5 h-5" />
      </button>

      {/* Keyboard Shortcuts Modal */}
      {showShortcuts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={() => setShowShortcuts(false)}>
          <div className="bg-card border rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Keyboard Shortcuts</h2>
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

      {/* Export/Import Modal */}
      {showExportImport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={() => setShowExportImport(false)}>
          <div className="bg-card border rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Export / Import Progress</h2>
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
                Export Progress as JSON
              </button>
              <div className="text-center text-sm text-muted-foreground">or</div>
              <label className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-dashed rounded-xl cursor-pointer hover:bg-accent/30 transition-colors font-bold text-muted-foreground">
                <Upload className="w-5 h-5" />
                Import Progress from JSON
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              </label>
              <p className="text-xs text-muted-foreground text-center">
                Export saves your completed topics, bookmarks, and notes. Import will overwrite current data.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
