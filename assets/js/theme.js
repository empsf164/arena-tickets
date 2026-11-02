/**
 * ARENA — Theme Controller
 * Manages Dark/Light mode with localStorage persistence & system preference detection
 */

(function () {
  'use strict';

  const THEME_STORAGE_KEY = 'arena_theme_preference';

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    // Default to cinematic dark stadium theme
    return 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Update toggle buttons icon
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach((btn) => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'light') {
          icon.className = 'bi bi-moon-stars-fill';
          btn.setAttribute('aria-label', 'Switch to Dark Mode');
          btn.setAttribute('title', 'Switch to Dark Mode');
        } else {
          icon.className = 'bi bi-sun-fill';
          btn.setAttribute('aria-label', 'Switch to Light Mode');
          btn.setAttribute('title', 'Switch to Light Mode');
        }
      }
    });

    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
  }

  // Initial application immediately
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  // Initialize event listeners when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(getPreferredTheme());

    document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
      });
    });

    // Listen for OS system theme changes
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        applyTheme(e.matches ? 'light' : 'dark');
      }
    });
  });

  window.ArenaTheme = {
    get: () => document.documentElement.getAttribute('data-theme') || 'dark',
    set: applyTheme
  };
})();
