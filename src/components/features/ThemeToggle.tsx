import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export function ThemeToggle() {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-muted"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-muted-foreground" />}
    </button>
  );
}
