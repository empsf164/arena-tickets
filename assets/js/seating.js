/**
 * ARENA — Interactive Stadium Seating & Seat Selector Engine
 * SVG Stadium Layout + Detailed Seat Grid with Dynamic Pricing & States
 */

(function () {
  'use strict';

  // Stand metadata
  const STADIUM_STANDS = {
    'north': {
      id: 'north',
      name: 'North Stand (The Kop End)',
      tier: 'Upper & Lower',
      view: 'Direct behind goal / pitch end, high-energy supporters section',
      capacity: 22500,
      availableSeats: 340,
      priceFrom: 185,
      color: '#3B82F6'
    },
    'south': {
      id: 'south',
      name: 'South Stand (Family & Visitors)',
      tier: 'Lower & Club',
      view: 'Direct behind goal / pavilion end, great family atmosphere',
      capacity: 21000,
      availableSeats: 215,
      priceFrom: 185,
      color: '#10B981'
    },
    'west': {
      id: 'west',
      name: 'West Stand (Grand Main Stand)',
      tier: 'Lower & Upper Tier',
      view: 'Prime central sideline, player walkout tunnel and media deck',
      capacity: 28000,
      availableSeats: 94,
      priceFrom: 290,
      color: '#6366F1'
    },
    'east': {
      id: 'east',
      name: 'East Stand (Sideline Club)',
      tier: 'Lower Tier',
      view: 'Sideline broadcast camera perspective with unobstructed clear view',
      capacity: 26000,
      availableSeats: 120,
      priceFrom: 275,
      color: '#06B6D4'
    },
    'vip': {
      id: 'vip',
      name: 'Presidential VIP & Executive Hospitality',
      tier: 'Mezzanine Suites',
      view: 'Luxury mid-tier panoramic terrace with private dining & lounge',
      capacity: 4500,
      availableSeats: 24,
      priceFrom: 890,
      color: '#F59E0B'
    }
  };

  class StadiumSeatingManager {
    constructor(options = {}) {
      this.containerId = options.containerId || 'stadiumMapWrapper';
      this.gridContainerId = options.gridContainerId || 'seatGridWrapper';
      this.inspectorId = options.inspectorId || 'standInspector';
      this.selectedStandKey = options.initialStand || 'west';
      this.selectedSeats = [];
      this.maxSeats = options.maxSeats || 6;
      this.basePrice = options.basePrice || 185;
      this.onSeatChange = options.onSeatChange || null;

      this.init();
    }

    init() {
      this.renderStadiumSvg();
      this.bindSvgEvents();
      this.updateInspector(this.selectedStandKey);
      if (document.getElementById(this.gridContainerId)) {
        this.renderSeatGrid(this.selectedStandKey);
      }
    }

    renderStadiumSvg() {
      const el = document.getElementById(this.containerId);
      if (!el) return;

      el.innerHTML = `
        <div class="stadium-svg-wrapper">
          <svg viewBox="0 0 800 520" class="w-100" style="filter: drop-shadow(0 10px 25px rgba(0,0,0,0.5));" role="img" aria-label="Interactive Stadium Seating Map">
            <!-- Outer Stadium Oval -->
            <rect x="20" y="20" width="760" height="480" rx="90" fill="var(--bg-surface-2)" stroke="var(--border-medium)" stroke-width="2" />

            <!-- Track / Concourse -->
            <rect x="90" y="60" width="620" height="400" rx="60" fill="var(--bg-surface-1)" stroke="var(--border-subtle)" stroke-width="1.5" />

            <!-- PITCH / ARENA FLOOR -->
            <rect x="230" y="140" width="340" height="240" rx="14" class="stand-pitch" />
            <!-- Pitch markings -->
            <circle cx="400" cy="260" r="45" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2" />
            <circle cx="400" cy="260" r="3" fill="rgba(255,255,255,0.8)" />
            <line x1="400" y1="140" x2="400" y2="380" stroke="rgba(255,255,255,0.4)" stroke-width="2" />
            <!-- Penalty boxes -->
            <rect x="230" y="190" width="55" height="140" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />
            <rect x="515" y="190" width="55" height="140" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />

            <!-- STANDS (INTERACTIVE SVG POLYGONS) -->
            <!-- NORTH STAND -->
            <polygon points="120,70 680,70 600,130 200,130" 
              class="stadium-stand ${this.selectedStandKey === 'north' ? 'active-stand' : ''}" 
              data-stand="north" 
              fill="#1D4ED8" 
              stroke="#60A5FA" 
              role="button" 
              tabindex="0"
              aria-label="North Stand - General & Upper Tier" />
            <text x="400" y="105" text-anchor="middle" fill="#FFFFFF" font-family="var(--font-heading)" font-size="16" font-weight="700" letter-spacing="1">NORTH STAND (UPPER & LOWER)</text>

            <!-- SOUTH STAND -->
            <polygon points="200,390 600,390 680,450 120,450" 
              class="stadium-stand ${this.selectedStandKey === 'south' ? 'active-stand' : ''}" 
              data-stand="south" 
              fill="#047857" 
              stroke="#34D399" 
              role="button" 
              tabindex="0"
              aria-label="South Stand - Family & Goal View" />
            <text x="400" y="426" text-anchor="middle" fill="#FFFFFF" font-family="var(--font-heading)" font-size="16" font-weight="700" letter-spacing="1">SOUTH STAND (VISITORS & GOAL END)</text>

            <!-- WEST STAND (GRANDSTAND) -->
            <polygon points="100,85 190,135 190,385 100,435" 
              class="stadium-stand ${this.selectedStandKey === 'west' ? 'active-stand' : ''}" 
              data-stand="west" 
              fill="#4338CA" 
              stroke="#818CF8" 
              role="button" 
              tabindex="0"
              aria-label="West Stand - Grandstand Main Sideline" />
            <text x="145" y="265" text-anchor="middle" transform="rotate(-90 145 265)" fill="#FFFFFF" font-family="var(--font-heading)" font-size="15" font-weight="700" letter-spacing="1">WEST MAIN GRANDSTAND</text>

            <!-- EAST STAND -->
            <polygon points="610,135 700,85 700,435 610,385" 
              class="stadium-stand ${this.selectedStandKey === 'east' ? 'active-stand' : ''}" 
              data-stand="east" 
              fill="#0E7490" 
              stroke="#22D3EE" 
              role="button" 
              tabindex="0"
              aria-label="East Stand - Sideline Tier" />
            <text x="655" y="265" text-anchor="middle" transform="rotate(90 655 265)" fill="#FFFFFF" font-family="var(--font-heading)" font-size="15" font-weight="700" letter-spacing="1">EAST STAND (CLUB SIDELINE)</text>

            <!-- VIP SUITES & HOSPITALITY (CENTER RING) -->
            <rect x="215" y="132" width="370" height="14" rx="4" 
              class="stadium-stand ${this.selectedStandKey === 'vip' ? 'active-stand' : ''}" 
              data-stand="vip" 
              fill="#B45309" 
              stroke="#F59E0B" 
              role="button" 
              tabindex="0"
              aria-label="VIP Presidential Hospitality Deck" />
            <text x="400" y="142" text-anchor="middle" fill="#FEF3C7" font-family="var(--font-heading)" font-size="10" font-weight="800">VIP / CORPORATE SUITES</text>

            <!-- Direction Compass -->
            <g transform="translate(45, 55)" opacity="0.6">
              <circle cx="16" cy="16" r="14" fill="none" stroke="var(--border-medium)" />
              <polygon points="16,4 12,18 20,18" fill="var(--color-accent)" />
              <text x="16" y="38" text-anchor="middle" fill="var(--text-muted)" font-size="9" font-weight="bold">N</text>
            </g>
          </svg>
        </div>
      `;
    }

    bindSvgEvents() {
      const standPolygons = document.querySelectorAll('.stadium-stand');
      standPolygons.forEach((poly) => {
        poly.addEventListener('click', (e) => {
          const standKey = e.currentTarget.getAttribute('data-stand');
          this.selectStand(standKey);
        });

        // Keyboard navigation
        poly.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const standKey = e.currentTarget.getAttribute('data-stand');
            this.selectStand(standKey);
          }
        });

        // Hover tooltip/inspect
        poly.addEventListener('mouseenter', (e) => {
          const standKey = e.currentTarget.getAttribute('data-stand');
          this.updateInspector(standKey);
        });
      });
    }

    selectStand(standKey) {
      if (!STADIUM_STANDS[standKey]) return;
      this.selectedStandKey = standKey;

      // Update active SVG stand class
      document.querySelectorAll('.stadium-stand').forEach((p) => {
        p.classList.remove('active-stand');
      });
      const activePoly = document.querySelector(`.stadium-stand[data-stand="${standKey}"]`);
      if (activePoly) activePoly.classList.add('active-stand');

      this.updateInspector(standKey);

      if (document.getElementById(this.gridContainerId)) {
        this.renderSeatGrid(standKey);
      }
    }

    updateInspector(standKey) {
      const inspector = document.getElementById(this.inspectorId);
      if (!inspector) return;

      const stand = STADIUM_STANDS[standKey] || STADIUM_STANDS['west'];

      inspector.innerHTML = `
        <div class="stand-inspector-card">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="badge-sport" style="border-color:${stand.color}; color:${stand.color};">${stand.tier}</span>
            <span class="badge-urgent"><i class="bi bi-ticket-detailed"></i> ${stand.availableSeats} Seats Left</span>
          </div>
          <h4 class="mb-1">${stand.name}</h4>
          <p class="text-secondary small mb-3">${stand.view}</p>

          <div class="row g-2 mb-3">
            <div class="col-6">
              <div class="p-2 rounded bg-surface-2 border border-subtle">
                <span class="text-muted small d-block">Starting from</span>
                <span class="font-heading fs-5 fw-bold text-primary">$${stand.priceFrom}</span>
              </div>
            </div>
            <div class="col-6">
              <div class="p-2 rounded bg-surface-2 border border-subtle">
                <span class="text-muted small d-block">Stand Capacity</span>
                <span class="font-heading fs-5 fw-bold">${stand.capacity.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <button type="button" class="btn btn-sm btn-primary w-100" id="btnInspectSelectStand" data-stand="${standKey}">
            <i class="bi bi-grid-3x3"></i> Choose Seats in ${stand.name.split('(')[0]}
          </button>
        </div>
      `;

      const selectBtn = inspector.querySelector('#btnInspectSelectStand');
      if (selectBtn) {
        selectBtn.addEventListener('click', () => {
          this.selectStand(standKey);
          const gridEl = document.getElementById(this.gridContainerId);
          if (gridEl) {
            gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      }
    }

    renderSeatGrid(standKey) {
      const container = document.getElementById(this.gridContainerId);
      if (!container) return;

      const stand = STADIUM_STANDS[standKey] || STADIUM_STANDS['west'];
      const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
      const seatsPerRow = 14;

      // Deterministic layout of sold and VIP seats based on stand
      let html = `
        <div class="pitch-direction-indicator mb-3">
          <i class="bi bi-arrow-up"></i> PITCH / FIELD DIRECTION — SIGHTLINE <i class="bi bi-arrow-up"></i>
        </div>
        <div class="text-center mb-2">
          <span class="badge-sport mb-2">${stand.name}</span>
          <p class="small text-muted mb-3">Click on any available seat to add it to your booking (Max: ${this.maxSeats} seats)</p>
        </div>
      `;

      rows.forEach((rowLetter, rIndex) => {
        html += `<div class="seat-row" role="row">`;
        html += `<div class="seat-row-label">${rowLetter}</div>`;

        for (let s = 1; s <= seatsPerRow; s++) {
          const seatId = `${standKey.toUpperCase()}-${rowLetter}${s}`;
          // Deterministic state
          const isSold = (rIndex * 7 + s * 3) % 5 === 0;
          const isVip = standKey === 'vip' || (rIndex === 0 && (s >= 5 && s <= 10));
          const isSelected = this.selectedSeats.some((seat) => seat.id === seatId);

          let seatClass = 'seat-node';
          let statusLabel = 'Available';

          if (isSold) {
            seatClass += ' seat-sold';
            statusLabel = 'Sold / Reserved';
          } else if (isSelected) {
            seatClass += ' seat-selected';
            statusLabel = 'Selected';
          } else if (isVip) {
            seatClass += ' seat-vip';
            statusLabel = 'VIP Premium';
          }

          const seatPrice = isVip ? stand.priceFrom * 1.5 : (rIndex < 3 ? stand.priceFrom * 1.15 : stand.priceFrom);

          html += `
            <div class="${seatClass}" 
              role="button" 
              tabindex="${isSold ? '-1' : '0'}"
              data-id="${seatId}"
              data-stand="${stand.name}"
              data-row="${rowLetter}"
              data-num="${s}"
              data-price="${Math.round(seatPrice)}"
              aria-label="Row ${rowLetter}, Seat ${s}, $${Math.round(seatPrice)}, ${statusLabel}"
              title="Row ${rowLetter}, Seat ${s} ($${Math.round(seatPrice)}) - ${statusLabel}">
              ${s}
            </div>
          `;
        }

        html += `<div class="seat-row-label">${rowLetter}</div>`;
        html += `</div>`;
      });

      // Legend
      html += `
        <div class="seat-legend">
          <div class="legend-item">
            <span class="legend-swatch" style="background:var(--seat-avail-bg); border:1px solid var(--seat-avail-border);"></span>
            <span>Available</span>
          </div>
          <div class="legend-item">
            <span class="legend-swatch" style="background:var(--seat-selected-bg); border:1px solid var(--seat-selected-border);"></span>
            <span>Selected</span>
          </div>
          <div class="legend-item">
            <span class="legend-swatch" style="background:var(--seat-sold-bg); border:1px solid var(--seat-sold-border); opacity:0.5;"></span>
            <span>Reserved / Sold</span>
          </div>
          <div class="legend-item">
            <span class="legend-swatch" style="border:1.5px solid var(--color-vip);"></span>
            <span>VIP Premium</span>
          </div>
        </div>
      `;

      container.innerHTML = html;
      this.bindSeatClickEvents(container);
    }

    bindSeatClickEvents(container) {
      const seats = container.querySelectorAll('.seat-node:not(.seat-sold)');
      seats.forEach((seatNode) => {
        const toggleSeat = () => {
          const id = seatNode.getAttribute('data-id');
          const stand = seatNode.getAttribute('data-stand');
          const row = seatNode.getAttribute('data-row');
          const num = seatNode.getAttribute('data-num');
          const price = parseFloat(seatNode.getAttribute('data-price')) || this.basePrice;

          const existingIndex = this.selectedSeats.findIndex((s) => s.id === id);

          if (existingIndex >= 0) {
            // Deselect
            this.selectedSeats.splice(existingIndex, 1);
            seatNode.classList.remove('seat-selected');
          } else {
            // Check max limit
            if (this.selectedSeats.length >= this.maxSeats) {
              if (window.ArenaToast) {
                window.ArenaToast.show(`You can select a maximum of ${this.maxSeats} seats.`, 'warning');
              } else {
                alert(`You can select a maximum of ${this.maxSeats} seats.`);
              }
              return;
            }
            // Select
            this.selectedSeats.push({ id, stand, row, num, price });
            seatNode.classList.add('seat-selected');
          }

          if (typeof this.onSeatChange === 'function') {
            this.onSeatChange(this.selectedSeats);
          }
        };

        seatNode.addEventListener('click', toggleSeat);
        seatNode.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleSeat();
          }
        });
      });
    }

    getSelectedSeats() {
      return this.selectedSeats;
    }

    clearSelection() {
      this.selectedSeats = [];
      const container = document.getElementById(this.gridContainerId);
      if (container) {
        container.querySelectorAll('.seat-node.seat-selected').forEach((s) => {
          s.classList.remove('seat-selected');
        });
      }
      if (typeof this.onSeatChange === 'function') {
        this.onSeatChange(this.selectedSeats);
      }
    }
  }

  window.StadiumSeatingManager = StadiumSeatingManager;
  window.STADIUM_STANDS = STADIUM_STANDS;
})();
