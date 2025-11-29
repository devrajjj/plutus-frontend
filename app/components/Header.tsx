'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (!mounted) return;
    // Use resolvedTheme to determine current state
    const current = resolvedTheme || 'light';
    setTheme(current === 'light' ? 'dark' : 'light');
  };

  // Show emoji based on resolved theme (light = sun, dark = moon)
  // Default to light during SSR to avoid hydration mismatch
  const displayTheme = mounted && resolvedTheme ? resolvedTheme : 'light';
  const isLight = displayTheme === 'light';

  return (
    <header className="fixed top-0 w-full z-50 bg-stone-50/90 dark:bg-gray-900/80 backdrop-blur-sm border-b border-stone-200 dark:border-gray-800">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-stone-900 dark:text-white">
          Plutus
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-stone-700 dark:text-gray-300 hover:text-stone-900 dark:hover:text-white transition-colors"
          >
            Dashboard
          </Link>
          <button
            onClick={toggleTheme}
            disabled={!mounted}
            className="p-2 rounded-lg bg-stone-100 dark:bg-gray-800 hover:bg-stone-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            aria-label="Toggle theme"
          >
            <span suppressHydrationWarning>{isLight ? '☀️' : '🌙'}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}

