/**
 * ARENA — Payment UI & Form Formatting Controller
 * Handles credit card formatting, brand detection, UPI simulation, and wallet options
 */

(function () {
  'use strict';

  function initPaymentControls() {
    const cardInput = document.getElementById('card-number');
    const expiryInput = document.getElementById('card-expiry');
    const cvcInput = document.getElementById('card-cvc');
    const cardBrandIcon = document.getElementById('card-brand-icon');

    if (cardInput) {
      cardInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '');
        // Limit to 16 digits
        val = val.substring(0, 16);
        // Format with space every 4 digits
        const parts = val.match(/.{1,4}/g);
        e.target.value = parts ? parts.join(' ') : '';

        // Detect brand
        if (cardBrandIcon) {
          if (val.startsWith('4')) {
            cardBrandIcon.className = 'bi bi-credit-card-2-front text-primary';
          } else if (val.startsWith('5')) {
            cardBrandIcon.className = 'bi bi-credit-card-2-front text-warning';
          } else if (val.startsWith('3')) {
            cardBrandIcon.className = 'bi bi-credit-card-2-front text-info';
          } else {
            cardBrandIcon.className = 'bi bi-credit-card-2-front text-muted';
          }
        }
      });
    }

    if (expiryInput) {
      expiryInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '').substring(0, 4);
        if (val.length >= 3) {
          e.target.value = `${val.substring(0, 2)}/${val.substring(2)}`;
        } else {
          e.target.value = val;
        }
      });
    }

    if (cvcInput) {
      cvcInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
      });
    }

    // Payment method tabs
    const paymentPills = document.querySelectorAll('.payment-method-pill');
    paymentPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        paymentPills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');

        const method = pill.getAttribute('data-method');
        document.querySelectorAll('.payment-method-pane').forEach((pane) => {
          pane.classList.remove('active');
          pane.classList.add('d-none');
        });
        const activePane = document.getElementById(`payment-pane-${method}`);
        if (activePane) {
          activePane.classList.add('active');
          activePane.classList.remove('d-none');
        }
      });
    });
  }

  window.ArenaPayment = {
    init: initPaymentControls
  };
})();
