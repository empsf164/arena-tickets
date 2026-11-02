/**
 * ARENA — Main Application Controller
 * Sticky navbar, mobile menu drawer, global search modal, GSAP animations, toasts
 */

(function () {
  'use strict';

  // Global Toast Notification Helper
  window.ArenaToast = {
    show: function (message, type = 'info') {
      let container = document.querySelector('.toast-container-arena');
      if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container-arena';
        document.body.appendChild(container);
      }

      const toast = document.createElement('div');
      toast.className = 'arena-toast';

      let icon = 'bi-info-circle-fill text-primary';
      if (type === 'success') icon = 'bi-check-circle-fill text-success';
      if (type === 'warning') icon = 'bi-exclamation-triangle-fill text-warning';
      if (type === 'danger') icon = 'bi-x-circle-fill text-danger';

      toast.innerHTML = `
        <i class="bi ${icon} fs-4"></i>
        <div class="flex-grow-1 fs-6">${message}</div>
        <button type="button" class="btn-close btn-close-white ms-2" aria-label="Close"></button>
      `;

      container.appendChild(toast);

      const closeBtn = toast.querySelector('.btn-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => toast.remove());
      }

      setTimeout(() => {
        if (toast.parentNode) {
          toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          toast.style.opacity = '0';
          toast.style.transform = 'translateY(20px)';
          setTimeout(() => toast.remove(), 400);
        }
      }, 4200);
    }
  };

  // Sticky Navbar Controller
  function initNavbar() {
    const navbar = document.querySelector('.arena-navbar');
    if (navbar) {
      const handleScroll = () => {
        if (window.scrollY > 40) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }

    // Mobile Hamburger & Scroll Lock
    const navCollapse = document.getElementById('arenaNavbarNav');
    const toggler = document.querySelector('.navbar-toggler');
    const closeBtn = document.querySelector('.mobile-close-btn');

    if (toggler && navCollapse) {
      toggler.addEventListener('click', () => {
        navCollapse.classList.toggle('show');
        if (navCollapse.classList.contains('show')) {
          document.body.classList.add('menu-open');
        } else {
          document.body.classList.remove('menu-open');
        }
      });
    }

    if (closeBtn && navCollapse) {
      closeBtn.addEventListener('click', () => {
        navCollapse.classList.remove('show');
        document.body.classList.remove('menu-open');
      });
    }

    // Close mobile nav when clicking any nav item
    document.querySelectorAll('.navbar-collapse a').forEach((link) => {
      link.addEventListener('click', () => {
        if (navCollapse && navCollapse.classList.contains('show')) {
          navCollapse.classList.remove('show');
          document.body.classList.remove('menu-open');
        }
      });
    });
  }

  // Quick Search Modal Handler
  function initQuickSearch() {
    const searchBtns = document.querySelectorAll('.btn-nav-search');
    const searchModalEl = document.getElementById('arenaQuickSearchModal');
    const searchInput = document.getElementById('modalSearchInput');
    const searchResults = document.getElementById('modalSearchResults');

    if (searchBtns.length > 0 && searchModalEl && typeof bootstrap !== 'undefined') {
      const modal = new bootstrap.Modal(searchModalEl);

      searchBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          modal.show();
          setTimeout(() => {
            if (searchInput) searchInput.focus();
          }, 300);
        });
      });

      if (searchInput && searchResults && window.ArenaEventsHelper) {
        searchInput.addEventListener('input', (e) => {
          const q = e.target.value.trim().toLowerCase();
          if (!q) {
            searchResults.innerHTML = `
              <div class="text-center py-4 text-muted">
                <i class="bi bi-search fs-2"></i>
                <p class="small mt-2">Type a sport, team, city or tournament to discover tickets.</p>
              </div>
            `;
            return;
          }

          const matched = window.ArenaEventsHelper.search({ query: q });
          if (matched.length === 0) {
            searchResults.innerHTML = `
              <div class="text-center py-4">
                <p class="text-muted">No matches found for "${q}".</p>
                <a href="events.html" class="btn btn-sm btn-outline-arena">View All Upcoming Events</a>
              </div>
            `;
            return;
          }

          searchResults.innerHTML = matched.slice(0, 5).map((ev) => `
            <a href="event-details.html?id=${ev.id}" class="d-flex align-items-center justify-content-between p-2 mb-2 rounded bg-surface-2 text-decoration-none border border-subtle">
              <div class="d-flex align-items-center gap-3">
                <span class="badge-sport">${ev.sport}</span>
                <div>
                  <div class="fw-bold text-primary">${ev.title}</div>
                  <div class="text-muted small">${ev.venue} &bull; ${ev.displayDate.split(',')[1] || ev.displayDate}</div>
                </div>
              </div>
              <div class="text-end">
                <span class="price-indicator-val text-primary">$${ev.priceFrom}</span>
              </div>
            </a>
          `).join('');
        });
      }
    }
  }

  // GSAP Animations (respecting prefers-reduced-motion)
  function initAnimations() {
    if (typeof gsap === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Hero entrance
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      gsap.from('.hero-ticker-pill', { opacity: 0, y: -20, duration: 0.6, ease: 'power2.out' });
      gsap.from('.hero-title', { opacity: 0, y: 30, duration: 0.8, delay: 0.2, ease: 'power3.out' });
      gsap.from('.hero-lead', { opacity: 0, y: 20, duration: 0.8, delay: 0.4, ease: 'power2.out' });
      gsap.from('.hero-ctas', { opacity: 0, y: 20, duration: 0.8, delay: 0.5, ease: 'power2.out' });
      gsap.from('.event-search-panel', { opacity: 0, y: 35, duration: 0.9, delay: 0.6, ease: 'power3.out' });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initQuickSearch();
    initAnimations();
  });
})();
