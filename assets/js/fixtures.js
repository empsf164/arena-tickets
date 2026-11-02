/**
 * ARENA — Fixtures Component Controller
 * Dynamic fixture rows, competition tags, team crests, and date tabs
 */

(function () {
  'use strict';

  function renderFixtureRow(fixture) {
    return `
      <div class="fixture-row" data-sport="${fixture.sport.toLowerCase()}" data-id="${fixture.id}">
        <div class="fixture-competition">
          <span class="badge-sport">${fixture.sport}</span>
          <span class="text-truncate d-none d-md-inline" title="${fixture.competition}">${fixture.competition}</span>
        </div>

        <div class="fixture-teams">
          <div class="team-item team-home">
            <span class="text-truncate">${fixture.teams.home.name}</span>
            <img src="${fixture.teams.home.crest}" alt="${fixture.teams.home.name}" class="team-crest" onerror="this.src='https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=60&q=80'">
          </div>

          <div class="fixture-vs">VS</div>

          <div class="team-item team-away">
            <img src="${fixture.teams.away.crest}" alt="${fixture.teams.away.name}" class="team-crest" onerror="this.src='https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=60&q=80'">
            <span class="text-truncate">${fixture.teams.away.name}</span>
          </div>
        </div>

        <div class="fixture-venue-date">
          <div class="fixture-date">
            <i class="bi bi-calendar3 text-primary"></i> ${fixture.displayDate.split(',')[1] || fixture.displayDate}
          </div>
          <div class="fixture-venue-name">
            <i class="bi bi-geo-alt"></i> ${fixture.venue}, ${fixture.city.split(',')[0]}
          </div>
        </div>

        <div class="fixture-action">
          <div class="text-end d-none d-sm-block">
            <span class="price-indicator-label">Tickets from</span>
            <span class="price-indicator-val text-primary">$${fixture.priceFrom}</span>
          </div>
          <a href="booking.html?id=${fixture.id}" class="btn btn-sm btn-primary">
            <i class="bi bi-ticket-perforated-fill"></i> Book
          </a>
          <a href="event-details.html?id=${fixture.id}" class="btn btn-sm btn-outline-arena" title="Match Details">
            <i class="bi bi-info-circle"></i>
          </a>
        </div>
      </div>
    `;
  }

  function initFixtures(containerSelector, filterTabSelector) {
    const container = document.querySelector(containerSelector);
    if (!container || !window.ARENA_EVENTS) return;

    function display(fixtures) {
      if (fixtures.length === 0) {
        container.innerHTML = `
          <div class="text-center py-5">
            <i class="bi bi-calendar-x text-muted" style="font-size: 3rem;"></i>
            <h4 class="mt-3">No fixtures found for this filter</h4>
            <p class="text-muted">Explore upcoming games across other tournaments and sports.</p>
          </div>
        `;
        return;
      }
      container.innerHTML = fixtures.map(renderFixtureRow).join('');
    }

    display(window.ARENA_EVENTS);

    // Filter tabs
    const tabBtns = document.querySelectorAll(`${filterTabSelector} button`);
    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        tabBtns.forEach((b) => b.classList.remove('active', 'btn-primary'));
        tabBtns.forEach((b) => b.classList.add('btn-outline-arena'));
        btn.classList.add('active', 'btn-primary');
        btn.classList.remove('btn-outline-arena');

        const filter = btn.getAttribute('data-filter');
        let filtered = window.ARENA_EVENTS;

        if (filter === 'football') {
          filtered = window.ARENA_EVENTS.filter((e) => e.sport === 'Football');
        } else if (filter === 'cricket') {
          filtered = window.ARENA_EVENTS.filter((e) => e.sport === 'Cricket');
        } else if (filter === 'tournaments') {
          filtered = window.ARENA_EVENTS.filter((e) => e.competition.includes('Final') || e.competition.includes('Championship'));
        } else if (filter === 'soon') {
          filtered = window.ARENA_EVENTS.slice(0, 4);
        }

        display(filtered);
      });
    });
  }

  window.ArenaFixtures = {
    init: initFixtures,
    renderRow: renderFixtureRow
  };
})();
