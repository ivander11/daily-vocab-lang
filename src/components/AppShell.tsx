import { BarChart3, BookOpen } from 'lucide-react';
import type { ReactNode } from 'react';

interface AppShellProps {
  activeView: 'card' | 'settings';
  children: ReactNode;
  onChangeView: (view: 'card' | 'settings') => void;
}

export function AppShell({ activeView, children, onChangeView }: AppShellProps) {
  return (
    <div className="app-frame">
      <main className="screen">{children}</main>
      <nav className="tabbar" aria-label="Primary navigation">
        <button
          className={activeView === 'card' ? 'tab active' : 'tab'}
          onClick={() => onChangeView('card')}
          type="button"
          title="Words"
        >
          <BookOpen size={20} />
          <span>Words</span>
        </button>
        <button
          className={activeView === 'settings' ? 'tab active' : 'tab'}
          onClick={() => onChangeView('settings')}
          type="button"
          title="Progress"
        >
          <BarChart3 size={20} />
          <span>Progress</span>
        </button>
      </nav>
    </div>
  );
}

