/**
 * ARENA — Multi-Step Ticket Booking Engine
 * Controls state across Category Selection, Seat Picker, Summary, Details, and Payment
 */

(function () {
  'use strict';

  class ArenaBookingApp {
    constructor() {
      this.currentStep = 1;
      this.totalSteps = 5;
      this.event = null;
      this.selectedCategory = null;
      this.ticketQuantity = 2;
      this.selectedSeats = [];
      this.seatingManager = null;
      this.customerDetails = {};

      this.init();
    }

    init() {
      // 1. Resolve event
      const params = new URLSearchParams(window.location.search);
      const eventId = params.get('id') || 'ucl-final-2026';
      this.event = window.ArenaEventsHelper.getById(eventId);

      // 2. Render Event Header info
      this.renderEventHeader();

      // 3. Render Categories
      this.renderCategories();

      // 4. Initialize Seating Manager
      this.initSeating();

      // 5. Bind Stepper & Buttons
      this.bindControls();

      // 6. Update initial summary
      this.updateSummary();

      // 7. Init Payment form handlers
      if (window.ArenaPayment) {
        window.ArenaPayment.init();
      }
    }

    renderEventHeader() {
      const titleEl = document.getElementById('bookingEventTitle');
      const metaEl = document.getElementById('bookingEventMeta');
      const badgeEl = document.getElementById('bookingEventSport');

      if (titleEl) titleEl.textContent = this.event.title;
      if (badgeEl) badgeEl.textContent = this.event.sport;
      if (metaEl) {
        metaEl.innerHTML = `
          <span><i class="bi bi-calendar3 text-primary"></i> ${this.event.displayDate}</span>
          <span><i class="bi bi-clock text-primary"></i> ${this.event.time}</span>
          <span><i class="bi bi-geo-alt text-primary"></i> ${this.event.venue}, ${this.event.city}</span>
        `;
      }
    }

    renderCategories() {
      const container = document.getElementById('categoriesList');
      if (!container) return;

      container.innerHTML = this.event.categories.map((cat, idx) => {
        const isDefault = idx === 0;
        if (isDefault) this.selectedCategory = cat;

        return `
          <div class="category-card ${isDefault ? 'selected' : ''}" data-cat-id="${cat.id}" data-price="${cat.price}">
            <div>
              <div class="d-flex align-items-center gap-2 mb-1">
                <h5 class="mb-0">${cat.name}</h5>
                <span class="badge-urgent small">${cat.available} Available</span>
              </div>
              <p class="text-secondary small mb-0"><i class="bi bi-eye"></i> ${cat.view}</p>
            </div>
            <div class="text-end">
              <span class="price-indicator-label">Per Ticket</span>
              <span class="price-indicator-val text-primary">$${cat.price}</span>
            </div>
          </div>
        `;
      }).join('');

      // Add click listener
      container.querySelectorAll('.category-card').forEach((card) => {
        card.addEventListener('click', () => {
          container.querySelectorAll('.category-card').forEach((c) => c.classList.remove('selected'));
          card.classList.add('selected');
          const catId = card.getAttribute('data-cat-id');
          this.selectedCategory = this.event.categories.find((c) => c.id === catId);

          // Update seat prices in seating manager if active
          if (this.seatingManager) {
            this.seatingManager.basePrice = this.selectedCategory.price;
            this.seatingManager.clearSelection();
          }

          this.updateSummary();
        });
      });
    }

    initSeating() {
      this.seatingManager = new window.StadiumSeatingManager({
        containerId: 'bookingStadiumMap',
        gridContainerId: 'bookingSeatGrid',
        inspectorId: 'bookingStandInspector',
        initialStand: 'west',
        maxSeats: this.ticketQuantity,
        basePrice: this.selectedCategory ? this.selectedCategory.price : 185,
        onSeatChange: (seats) => {
          this.selectedSeats = seats;
          this.renderSelectedSeatsPills();
          this.updateSummary();
        }
      });
    }

    renderSelectedSeatsPills() {
      const container = document.getElementById('selectedSeatsPills');
      if (!container) return;

      if (this.selectedSeats.length === 0) {
        container.innerHTML = `<span class="text-muted small">No seats chosen yet. Click available seats on the map above.</span>`;
        return;
      }

      container.innerHTML = this.selectedSeats.map((seat) => `
        <span class="badge bg-surface-3 text-primary border border-medium px-3 py-2 fs-6">
          <i class="bi bi-check2-circle text-success"></i> ${seat.stand.split('(')[0]} - Row ${seat.row}, Seat ${seat.num} ($${seat.price})
        </span>
      `).join(' ');
    }

    updateSummary() {
      const qty = this.ticketQuantity;
      const unitPrice = this.selectedCategory ? this.selectedCategory.price : 185;

      // If specific seats were selected, sum individual seat prices, otherwise qty * unitPrice
      let subtotal = 0;
      if (this.selectedSeats.length > 0) {
        subtotal = this.selectedSeats.reduce((acc, s) => acc + s.price, 0);
      } else {
        subtotal = unitPrice * qty;
      }

      const bookingFee = Math.round(subtotal * 0.05); // 5% fee
      const facilityLevy = 3.50 * (this.selectedSeats.length > 0 ? this.selectedSeats.length : qty);
      const tax = Math.round(subtotal * 0.08); // 8% tax
      const grandTotal = subtotal + bookingFee + facilityLevy + tax;

      // Update DOM
      const sumCat = document.getElementById('summaryCategory');
      const sumQty = document.getElementById('summaryQuantity');
      const sumSubtotal = document.getElementById('summarySubtotal');
      const sumBookingFee = document.getElementById('summaryBookingFee');
      const sumFacilityFee = document.getElementById('summaryFacilityFee');
      const sumTax = document.getElementById('summaryTax');
      const sumTotal = document.getElementById('summaryTotal');
      const sumSeatsCount = document.getElementById('summarySeatsCount');

      if (sumCat && this.selectedCategory) sumCat.textContent = this.selectedCategory.name;
      if (sumQty) sumQty.textContent = `${this.selectedSeats.length > 0 ? this.selectedSeats.length : qty} Tickets`;
      if (sumSubtotal) sumSubtotal.textContent = `$${subtotal.toFixed(2)}`;
      if (sumBookingFee) sumBookingFee.textContent = `$${bookingFee.toFixed(2)}`;
      if (sumFacilityFee) sumFacilityFee.textContent = `$${facilityLevy.toFixed(2)}`;
      if (sumTax) sumTax.textContent = `$${tax.toFixed(2)}`;
      if (sumTotal) sumTotal.textContent = `$${grandTotal.toFixed(2)}`;
      if (sumSeatsCount) sumSeatsCount.textContent = `${this.selectedSeats.length} / ${qty} chosen`;

      this.orderPricing = {
        subtotal,
        bookingFee,
        facilityLevy,
        tax,
        grandTotal
      };
    }

    bindControls() {
      // Quantity selector (+ / -)
      const qtyInput = document.getElementById('ticketQuantityInput');
      const btnMinus = document.getElementById('btnQtyMinus');
      const btnPlus = document.getElementById('btnQtyPlus');

      if (btnMinus && qtyInput) {
        btnMinus.addEventListener('click', () => {
          let val = parseInt(qtyInput.value) || 1;
          if (val > 1) {
            val--;
            qtyInput.value = val;
            this.ticketQuantity = val;
            if (this.seatingManager) {
              this.seatingManager.maxSeats = val;
              this.seatingManager.clearSelection();
            }
            this.updateSummary();
          }
        });
      }

      if (btnPlus && qtyInput) {
        btnPlus.addEventListener('click', () => {
          let val = parseInt(qtyInput.value) || 1;
          if (val < 6) {
            val++;
            qtyInput.value = val;
            this.ticketQuantity = val;
            if (this.seatingManager) {
              this.seatingManager.maxSeats = val;
            }
            this.updateSummary();
          }
        });
      }

      // Step Navigation Next / Back Buttons
      document.querySelectorAll('.btn-next-step').forEach((btn) => {
        btn.addEventListener('click', () => this.nextStep());
      });

      document.querySelectorAll('.btn-prev-step').forEach((btn) => {
        btn.addEventListener('click', () => this.prevStep());
      });

      // Direct Stepper Node click
      document.querySelectorAll('.step-node').forEach((node) => {
        node.addEventListener('click', () => {
          const stepNum = parseInt(node.getAttribute('data-step'));
          if (stepNum < this.currentStep) {
            this.goToStep(stepNum);
          }
        });
      });

      // Final Payment Submit Button
      const btnPay = document.getElementById('btnCompletePayment');
      if (btnPay) {
        btnPay.addEventListener('click', (e) => {
          e.preventDefault();
          this.processBooking();
        });
      }
    }

    goToStep(step) {
      if (step < 1 || step > this.totalSteps) return;

      // Hide all steps
      for (let i = 1; i <= this.totalSteps; i++) {
        const stepPane = document.getElementById(`bookingStepPane${i}`);
        const stepNode = document.querySelector(`.step-node[data-step="${i}"]`);
        if (stepPane) stepPane.style.display = 'none';
        if (stepNode) {
          stepNode.classList.remove('active');
          if (i < step) {
            stepNode.classList.add('completed');
          } else {
            stepNode.classList.remove('completed');
          }
        }
      }

      // Show current step
      const currentPane = document.getElementById(`bookingStepPane${step}`);
      const currentNode = document.querySelector(`.step-node[data-step="${step}"]`);
      if (currentPane) currentPane.style.display = 'block';
      if (currentNode) currentNode.classList.add('active');

      this.currentStep = step;
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }

    nextStep() {
      // Step validation
      if (this.currentStep === 1) {
        if (!this.selectedCategory) {
          window.ArenaToast ? window.ArenaToast.show('Please select a ticket category.', 'warning') : alert('Select category');
          return;
        }
      }

      if (this.currentStep === 2) {
        // Automatically auto-assign seats if user didn't pick manually
        if (this.selectedSeats.length < this.ticketQuantity) {
          const needed = this.ticketQuantity - this.selectedSeats.length;
          // Pick default seats in current stand
          for (let i = 1; i <= needed; i++) {
            this.selectedSeats.push({
              id: `AUTO-B${i + 4}`,
              stand: 'West Stand (Grand Main Stand)',
              row: 'B',
              num: i + 4,
              price: this.selectedCategory.price
            });
          }
          this.renderSelectedSeatsPills();
          this.updateSummary();
        }
      }

      if (this.currentStep === 4) {
        // Validate customer details
        const form = document.getElementById('customerDetailsForm');
        if (form && !form.checkValidity()) {
          form.reportValidity();
          return;
        }

        // Store customer details
        this.customerDetails = {
          name: document.getElementById('custName')?.value || 'Alexander Wright',
          email: document.getElementById('custEmail')?.value || 'alexander.wright@example.com',
          phone: document.getElementById('custPhone')?.value || '+44 7911 123456',
          country: document.getElementById('custCountry')?.value || 'United Kingdom'
        };
      }

      if (this.currentStep < this.totalSteps) {
        this.goToStep(this.currentStep + 1);
      }
    }

    prevStep() {
      if (this.currentStep > 1) {
        this.goToStep(this.currentStep - 1);
      }
    }

    processBooking() {
      const btnPay = document.getElementById('btnCompletePayment');
      if (btnPay) {
        btnPay.disabled = true;
        btnPay.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Securing Tickets...`;
      }

      // Generate booking reference e.g. ARN-84920
      const refCode = `ARN-${Math.floor(10000 + Math.random() * 90000)}`;

      const bookingRecord = {
        ref: refCode,
        createdAt: new Date().toISOString(),
        event: {
          id: this.event.id,
          title: this.event.title,
          sport: this.event.sport,
          competition: this.event.competition,
          venue: this.event.venue,
          city: this.event.city,
          displayDate: this.event.displayDate,
          time: this.event.time,
          gate: 'Gate B — Turnstile 14',
          teams: this.event.teams
        },
        category: this.selectedCategory.name,
        quantity: this.selectedSeats.length > 0 ? this.selectedSeats.length : this.ticketQuantity,
        seats: this.selectedSeats.length > 0 ? this.selectedSeats : [
          { stand: 'West Stand', row: 'C', num: 12, price: this.selectedCategory.price },
          { stand: 'West Stand', row: 'C', num: 13, price: this.selectedCategory.price }
        ],
        pricing: this.orderPricing,
        customer: this.customerDetails,
        paymentStatus: 'Confirmed (Demo Pass)'
      };

      // Persist in localStorage
      localStorage.setItem('arena_latest_booking', JSON.stringify(bookingRecord));

      // Append to list of bookings
      const existingBookings = JSON.parse(localStorage.getItem('arena_all_bookings') || '[]');
      existingBookings.unshift(bookingRecord);
      localStorage.setItem('arena_all_bookings', JSON.stringify(existingBookings));

      setTimeout(() => {
        window.location.href = `booking-confirmation.html?ref=${refCode}`;
      }, 1200);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('bookingStepper')) {
      window.arenaBookingApp = new ArenaBookingApp();
    }
  });
})();
