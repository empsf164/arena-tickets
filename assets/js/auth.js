/**
 * ARENA — Authentication & Password Recovery Controller
 * Streamlined login, signup, password visibility toggles, and password recovery flow
 */

(function () {
  'use strict';

  function initPasswordToggles() {
    document.querySelectorAll('.password-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const input = document.getElementById(targetId);
        const icon = btn.querySelector('i');
        if (input) {
          if (input.type === 'password') {
            input.type = 'text';
            if (icon) icon.className = 'bi bi-eye-slash-fill';
          } else {
            input.type = 'password';
            if (icon) icon.className = 'bi bi-eye-fill';
          }
        }
      });
    });
  }

  function initLoginForm() {
    const form = document.getElementById('arenaLoginForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const email = document.getElementById('loginEmail')?.value;
      const submitBtn = form.querySelector('button[type="submit"]');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status"></span> Signing In...`;
      }

      setTimeout(() => {
        sessionStorage.setItem('arena_user_session', JSON.stringify({ email, loggedIn: true }));
        if (window.ArenaToast) {
          window.ArenaToast.show('Welcome back! Successfully signed in.', 'success');
        }
        setTimeout(() => {
          // Redirect back to events or ticket lookup (no dashboard per rules)
          const params = new URLSearchParams(window.location.search);
          const redirect = params.get('redirect') || 'events.html';
          window.location.href = redirect;
        }, 800);
      }, 1000);
    });
  }

  function initSignupForm() {
    const form = document.getElementById('arenaSignupForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const pwd = document.getElementById('signupPassword')?.value;
      const pwdConfirm = document.getElementById('signupPasswordConfirm')?.value;

      if (pwd !== pwdConfirm) {
        if (window.ArenaToast) {
          window.ArenaToast.show('Passwords do not match. Please verify.', 'danger');
        } else {
          alert('Passwords do not match.');
        }
        return;
      }

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status"></span> Creating Account...`;
      }

      setTimeout(() => {
        sessionStorage.setItem('arena_user_session', JSON.stringify({
          name: document.getElementById('signupFullName')?.value,
          email: document.getElementById('signupEmail')?.value,
          loggedIn: true
        }));

        if (window.ArenaToast) {
          window.ArenaToast.show('Account created successfully! Welcome to ARENA.', 'success');
        }
        setTimeout(() => {
          // Per requirements: Do not create a dashboard after signup. Redirect to discovery
          window.location.href = 'events.html';
        }, 900);
      }, 1100);
    });
  }

  function initForgotPassword() {
    const form = document.getElementById('forgotPasswordForm');
    const resetSentCard = document.getElementById('resetSentCard');
    if (!form || !resetSentCard) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const email = document.getElementById('resetEmail')?.value;
      const submitBtn = form.querySelector('button[type="submit"]');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status"></span> Sending Link...`;
      }

      setTimeout(() => {
        form.style.display = 'none';
        resetSentCard.style.display = 'block';

        const sentEmailSpan = document.getElementById('sentEmailAddress');
        if (sentEmailSpan) sentEmailSpan.textContent = email;

        // 60-second cooldown timer
        let timeLeft = 60;
        const resendBtn = document.getElementById('btnResendReset');
        const timerSpan = document.getElementById('resendCountdown');

        if (resendBtn && timerSpan) {
          resendBtn.disabled = true;
          const interval = setInterval(() => {
            timeLeft--;
            timerSpan.textContent = `(${timeLeft}s)`;
            if (timeLeft <= 0) {
              clearInterval(interval);
              resendBtn.disabled = false;
              timerSpan.textContent = '';
            }
          }, 1000);
        }
      }, 1000);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initPasswordToggles();
    initLoginForm();
    initSignupForm();
    initForgotPassword();
  });
})();
