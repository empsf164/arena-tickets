/**
 * ARENA — Theme Controller
 * Defaults to cinematic dark stadium theme
 */

(function () {
  'use strict';

  const THEME_STORAGE_KEY = 'arena_theme_preference';

  function applyTheme(theme) {
    const activeTheme = 'dark';
    document.documentElement.setAttribute('data-theme', activeTheme);
    document.documentElement.setAttribute('data-bs-theme', activeTheme);
    localStorage.setItem(THEME_STORAGE_KEY, activeTheme);

    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: activeTheme } }));
  }

  // Initial application immediately
  applyTheme('dark');

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme('dark');
  });

  window.ArenaTheme = {
    get: () => 'dark',
    set: applyTheme
  };
})();

