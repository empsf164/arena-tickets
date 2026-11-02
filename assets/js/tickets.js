/**
 * ARENA — Digital Ticket & Pass Controller
 * Boarding pass ticket renderer, QR generation, ICS Calendar export, and Print
 */

(function () {
  'use strict';

  function getBookingData() {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');

    // 1. Try finding in all bookings
    const allBookings = JSON.parse(localStorage.getItem('arena_all_bookings') || '[]');
    if (ref) {
      const match = allBookings.find((b) => b.ref.toLowerCase() === ref.toLowerCase());
      if (match) return match;
    }

    // 2. Try latest booking
    const latest = JSON.parse(localStorage.getItem('arena_latest_booking') || 'null');
    if (latest && (!ref || latest.ref.toLowerCase() === ref.toLowerCase())) {
      return latest;
    }

    // 3. Fallback to rich default fixture pass
    return {
      ref: ref || 'ARN-92841',
      createdAt: new Date().toISOString(),
      event: {
        id: 'ucl-final-2026',
        title: 'Real Madrid vs Manchester City',
        sport: 'Football',
        competition: 'UEFA Champions League Final',
        venue: 'Wembley Stadium',
        city: 'London, United Kingdom',
        displayDate: 'Saturday, 14 June 2026',
        time: '20:00 BST',
        gate: 'Gate B — Turnstile 14',
        teams: {
          home: { name: 'Real Madrid', code: 'RMA' },
          away: { name: 'Manchester City', code: 'MCI' }
        }
      },
      category: 'Category 1 - Central Sideline',
      quantity: 2,
      seats: [
        { stand: 'West Main Grandstand', row: 'C', num: 12, price: 440 },
        { stand: 'West Main Grandstand', row: 'C', num: 13, price: 440 }
      ],
      pricing: {
        subtotal: 880,
        bookingFee: 44,
        facilityLevy: 7,
        tax: 70.4,
        grandTotal: 1001.40
      },
      customer: {
        name: 'Alexander Wright',
        email: 'alexander.wright@example.com'
      },
      paymentStatus: 'Confirmed (Demo Pass)'
    };
  }

  function renderDigitalTicket(booking) {
    const container = document.getElementById('digitalTicketPassWrapper');
    if (!container) return;

    const seatDesc = booking.seats.map((s) => `Row ${s.row}, Seat ${s.num}`).join(' & ');
    const standName = booking.seats[0] ? booking.seats[0].stand.split('(')[0] : 'West Stand';

    container.innerHTML = `
      <div class="digital-ticket-container">
        <div class="digital-ticket-pass">
          <!-- Notches -->
          <div class="ticket-notch-top"></div>
          <div class="ticket-notch-bottom"></div>

          <!-- Main Ticket Portion -->
          <div class="ticket-main">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div class="d-flex align-items-center gap-2">
                <div class="brand-icon" style="width: 30px; height: 30px; font-size: 1rem;">
                  <i class="bi bi-shield-shaded"></i>
                </div>
                <span class="font-heading fs-4 fw-bold text-primary">ARENA MATCH PASS</span>
              </div>
              <span class="badge-urgent"><i class="bi bi-shield-check"></i> OFFICIAL VERIFIED PASS</span>
            </div>

            <div class="mb-3">
              <span class="badge-sport mb-1">${booking.event.sport} &bull; ${booking.event.competition}</span>
              <h2 class="mb-1 fs-2">${booking.event.title}</h2>
              <p class="text-secondary mb-0">
                <i class="bi bi-geo-alt-fill text-danger"></i> <strong>${booking.event.venue}</strong>, ${booking.event.city}
              </p>
            </div>

            <div class="row g-3 py-3 my-2 border-top border-bottom border-subtle">
              <div class="col-6 col-md-3">
                <span class="text-muted small text-uppercase d-block fw-bold">Date</span>
                <span class="fw-bold fs-6">${booking.event.displayDate.split(',')[1] || booking.event.displayDate}</span>
              </div>
              <div class="col-6 col-md-3">
                <span class="text-muted small text-uppercase d-block fw-bold">Kickoff</span>
                <span class="fw-bold fs-6 text-primary">${booking.event.time}</span>
              </div>
              <div class="col-6 col-md-3">
                <span class="text-muted small text-uppercase d-block fw-bold">Gate / Turnstile</span>
                <span class="fw-bold fs-6">${booking.event.gate || 'Gate B - T14'}</span>
              </div>
              <div class="col-6 col-md-3">
                <span class="text-muted small text-uppercase d-block fw-bold">Category</span>
                <span class="fw-bold fs-6 text-truncate d-block">${booking.category.split('-')[0]}</span>
              </div>
            </div>

            <!-- Seat Block -->
            <div class="row g-2 align-items-center mt-2">
              <div class="col-sm-8">
                <div class="p-2 rounded bg-surface-2 border border-subtle">
                  <div class="small text-muted text-uppercase fw-bold">Seating Allocation</div>
                  <div class="font-heading fs-5 fw-bold text-primary">${standName} &bull; ${seatDesc}</div>
                </div>
              </div>
              <div class="col-sm-4 text-sm-end">
                <div class="small text-muted text-uppercase fw-bold">Holder</div>
                <div class="fw-bold">${booking.customer.name || 'Verified Attendee'}</div>
              </div>
            </div>

            <div class="barcode-strip" title="Demonstration barcode identifier"></div>
            <div class="text-center mt-1">
              <span class="text-muted" style="font-size: 0.72rem; letter-spacing: 0.15em;">SECURITY CODE: 98402-88192-ARN-0091</span>
            </div>
          </div>

          <!-- Ticket Stub Portion with QR -->
          <div class="ticket-stub">
            <div class="w-100 text-center mb-2">
              <div class="text-muted small text-uppercase fw-bold mb-1">Booking Ref</div>
              <div class="font-heading fs-4 fw-bold text-accent" style="letter-spacing: 0.08em;">${booking.ref}</div>
            </div>

            <!-- Interactive QR Code SVG -->
            <div class="qr-placeholder-wrap" title="Scan at stadium turnstile">
              <svg width="124" height="124" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Outer Corners -->
                <rect width="30" height="30" fill="#000000" />
                <rect x="5" y="5" width="20" height="20" fill="#FFFFFF" />
                <rect x="10" y="10" width="10" height="10" fill="#000000" />

                <rect x="70" width="30" height="30" fill="#000000" />
                <rect x="75" y="5" width="20" height="20" fill="#FFFFFF" />
                <rect x="80" y="10" width="10" height="10" fill="#000000" />

                <rect y="70" width="30" height="30" fill="#000000" />
                <rect x="5" y="75" width="20" height="20" fill="#FFFFFF" />
                <rect x="10" y="80" width="10" height="10" fill="#000000" />

                <!-- Realistic Data Matrix Pixels -->
                <rect x="36" y="8" width="6" height="6" fill="#000000" />
                <rect x="48" y="8" width="6" height="6" fill="#000000" />
                <rect x="36" y="20" width="6" height="6" fill="#000000" />
                <rect x="42" y="26" width="6" height="6" fill="#000000" />
                <rect x="54" y="20" width="6" height="6" fill="#000000" />

                <rect x="8" y="36" width="6" height="6" fill="#000000" />
                <rect x="20" y="42" width="6" height="6" fill="#000000" />
                <rect x="8" y="54" width="6" height="6" fill="#000000" />

                <rect x="36" y="36" width="6" height="6" fill="#000000" />
                <rect x="48" y="36" width="6" height="6" fill="#000000" />
                <rect x="42" y="48" width="6" height="6" fill="#000000" />
                <rect x="54" y="48" width="6" height="6" fill="#000000" />
                <rect x="42" y="60" width="6" height="6" fill="#000000" />

                <rect x="72" y="36" width="6" height="6" fill="#000000" />
                <rect x="84" y="42" width="6" height="6" fill="#000000" />
                <rect x="72" y="54" width="6" height="6" fill="#000000" />

                <rect x="36" y="72" width="6" height="6" fill="#000000" />
                <rect x="48" y="78" width="6" height="6" fill="#000000" />
                <rect x="54" y="84" width="6" height="6" fill="#000000" />

                <rect x="72" y="72" width="6" height="6" fill="#000000" />
                <rect x="84" y="78" width="6" height="6" fill="#000000" />
                <rect x="78" y="88" width="6" height="6" fill="#000000" />
              </svg>
            </div>

            <div class="text-center mt-2">
              <span class="text-muted" style="font-size: 0.75rem;">Fast-Track Entry Pass</span>
              <div class="badge-vip mt-1 small">VALID ON MATCHDAY</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function downloadCalendarEvent(booking) {
    const title = `${booking.event.title} - ARENA Matchday`;
    const location = `${booking.event.venue}, ${booking.event.city}`;
    const description = `ARENA Ticket Booking Reference: ${booking.ref}\\nSeats: ${booking.seats.map((s) => `Row ${s.row} Seat ${s.num}`).join(', ')}\\nGate: ${booking.event.gate || 'Main Entrance'}`;

    // RFC 5545 iCalendar content
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//ARENA Sports Ticketing//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `LOCATION:${location}`,
      `DESCRIPTION:${description}`,
      `UID:${booking.ref}-arena-tickets`,
      'DTSTART:20260614T190000Z',
      'DTEND:20260614T223000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${booking.ref}-arena-match.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (window.ArenaToast) {
      window.ArenaToast.show('Match added to calendar! .ics file downloaded.', 'success');
    }
  }

  function initTicketPage() {
    const booking = getBookingData();
    renderDigitalTicket(booking);

    // Bind action buttons
    const btnPrint = document.getElementById('btnPrintTicket');
    if (btnPrint) {
      btnPrint.addEventListener('click', () => {
        window.print();
      });
    }

    const btnCalendar = document.getElementById('btnAddCalendar');
    if (btnCalendar) {
      btnCalendar.addEventListener('click', () => {
        downloadCalendarEvent(booking);
      });
    }

    const btnDownload = document.getElementById('btnDownloadTicket');
    if (btnDownload) {
      btnDownload.addEventListener('click', () => {
        if (window.ArenaToast) {
          window.ArenaToast.show('Generating high-resolution digital pass for download...', 'info');
          setTimeout(() => {
            window.print();
          }, 800);
        } else {
          window.print();
        }
      });
    }

    // Lookup form
    const lookupForm = document.getElementById('ticketLookupForm');
    if (lookupForm) {
      lookupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('lookupRefInput');
        if (input && input.value.trim()) {
          window.location.search = `?ref=${encodeURIComponent(input.value.trim())}`;
        }
      });
    }
  }

  window.ArenaTickets = {
    init: initTicketPage,
    getBookingData,
    renderTicket: renderDigitalTicket,
    downloadCalendar: downloadCalendarEvent
  };
})();
