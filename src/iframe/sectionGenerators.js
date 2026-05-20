export function generateRestaurantReservations() {
  return `
    <section id="reservations" class="interactive-section">
      <div class="section-container">
        <div class="promo-box">
          <h2>Book a Reservation</h2>
          <p>Secure a table and enjoy our hand-crafted, seasonal dining experience.</p>
          <form class="reservation-form" onsubmit="event.preventDefault(); alert('Reservation Requested! We will contact you soon.');">
            <div class="form-row">
              <input type="text" placeholder="Your Name" required>
              <input type="date" required>
              <select required>
                <option value="">Guests</option>
                <option value="2">2 Guests</option>
                <option value="4">4 Guests</option>
                <option value="6">6+ Guests</option>
              </select>
            </div>
            <button type="submit" class="cta-btn primary-cta">Book Table Now</button>
          </form>
        </div>
      </div>
    </section>
  `;
}

export function generateRealestateCalculator() {
  return `
    <section id="mortgage-calculator" class="interactive-section">
      <div class="section-container">
        <div class="promo-box">
          <h2>Mortgage Calculator</h2>
          <p>Calculate your estimated monthly housing payment instantly.</p>
          <div class="calc-box">
            <div class="calc-inputs">
              <div class="calc-group">
                <label>Home Price ($)</label>
                <input type="number" id="home-price" value="800000" step="10000">
              </div>
              <div class="calc-group">
                <label>Down Payment ($)</label>
                <input type="number" id="down-payment" value="160000" step="5000">
              </div>
              <div class="calc-group">
                <label>Interest Rate (%)</label>
                <input type="number" id="interest-rate" value="6.5" step="0.1">
              </div>
            </div>
            <button onclick="
              const price = parseFloat(document.getElementById('home-price').value);
              const down = parseFloat(document.getElementById('down-payment').value);
              const rate = parseFloat(document.getElementById('interest-rate').value) / 1200;
              const loan = price - down;
              const pay = rate > 0 ? (loan * rate * Math.pow(1 + rate, 360)) / (Math.pow(1 + rate, 360) - 1) : loan / 360;
              alert('Estimated monthly principal & interest: $' + Math.round(pay).toLocaleString() + '/mo (30-Year Fixed)');
            " class="cta-btn primary-cta">Calculate Payment</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function generateBeautyDentalConsultation(itemsList) {
  const optionsHTML = itemsList.map(item => `<option value="${item.name}">${item.name}</option>`).join("");
  return `
    <section id="book-appointment" class="interactive-section">
      <div class="section-container">
        <div class="promo-box">
          <h2>Schedule a Free Consultation</h2>
          <p>Select your preferred slot and our elite team will confirm your consultation.</p>
          <form class="appointment-form" onsubmit="event.preventDefault(); alert('Consultation Request Submitted!');">
            <div class="form-row">
              <input type="text" placeholder="Full Name" required>
              <input type="email" placeholder="Email Address" required>
              <select required>
                <option value="">Select Service / Practice</option>
                ${optionsHTML}
              </select>
            </div>
            <button type="submit" class="cta-btn primary-cta">Secure My Appointment</button>
          </form>
        </div>
      </div>
    </section>
  `;
}

export function generateConstructionComparison() {
  return `
    <section id="before-after" class="interactive-section">
      <div class="section-container">
        <h2>Project Transformation</h2>
        <p class="subtitle">Drag slide indicator to explore our before-and-after construction excellence.</p>
        <div class="slider-comparison" style="position: relative; height: 350px; background: #e2e8f0; overflow: hidden; border-radius: var(--border-radius);">
          <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: url('https://images.unsplash.com/photo-1581094288338-2314dddb7eed?auto=format&fit=crop&w=800&q=80') center/cover;">
            <span style="background: rgba(0,0,0,0.7); color: #fff; padding: 8px 16px; border-radius: 4px; font-weight: bold; position: absolute; right: 20px; top: 20px;">AFTER (Pristine Luxury Space)</span>
          </div>
          <div style="position: absolute; top: 0; left: 0; bottom: 0; width: 50%; border-right: 4px solid var(--primary-color); display: flex; align-items: center; justify-content: center; background: url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80') center/cover; filter: grayscale(1);">
            <span style="background: rgba(0,0,0,0.7); color: #fff; padding: 8px 16px; border-radius: 4px; font-weight: bold; position: absolute; left: 20px; top: 20px;">BEFORE</span>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function generateGymWeeklySchedule() {
  return `
    <section id="schedule" class="interactive-section">
      <div class="section-container">
        <h2>Weekly Group Schedule</h2>
        <p class="subtitle">High-energy workouts with elite professional coaching.</p>
        <div class="schedule-grid">
          <div class="sched-day">
            <strong>Monday</strong>
            <span>07:00 AM - CrossFit Elite</span>
            <span>05:30 PM - Strength Camp</span>
          </div>
          <div class="sched-day">
            <strong>Wednesday</strong>
            <span>08:30 AM - Reformer Pilates</span>
            <span>06:00 PM - CrossFit Power</span>
          </div>
          <div class="sched-day">
            <strong>Friday</strong>
            <span>07:00 AM - Athletic Conditioning</span>
            <span>05:30 PM - Yoga Flow & Recovery</span>
          </div>
        </div>
      </div>
    </section>
  `;
}
