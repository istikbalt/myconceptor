import { categoriesData } from "../data/categories.js";
import { stylesTheme } from "../data/themes.js";
import iframeCSS from "./iframeStyles.css?raw";
import iframeJS from "./iframeScripts.js?raw";
import {
  generateRestaurantReservations,
  generateRealestateCalculator,
  generateBeautyDentalConsultation,
  generateConstructionComparison,
  generateGymWeeklySchedule
} from "./sectionGenerators.js";

// Helper to adjust color hex brightness for hovers
function adjustColorBrightness(hex, percent) {
  let R = parseInt(hex.substring(1, 3), 16);
  let G = parseInt(hex.substring(3, 5), 16);
  let B = parseInt(hex.substring(5, 7), 16);

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  R = R > 0 ? R : 0;
  G = G > 0 ? G : 0;
  B = B > 0 ? B : 0;

  const rHex = R.toString(16).padStart(2, '0');
  const gHex = G.toString(16).padStart(2, '0');
  const bHex = B.toString(16).padStart(2, '0');

  return `#${rHex}${gHex}${bHex}`;
}

// Helper to map menu links to compiled section IDs
function getMenuHref(link, sector) {
  const l = link.toLowerCase().trim();
  if (l === "home") return "#home";
  if (l === "about us" || l === "about") return "#about-us";
  if (l === "contact" || l === "contact us") return "#contact";
  if (l === "testimonials" || l === "reviews" || l === "success stories") return "#testimonials";
  
  if (
    l === "menu" || 
    l === "products" || 
    l === "property listings" || 
    l === "featured properties" || 
    l === "services" || 
    l === "practice areas" || 
    l === "membership plans" || 
    l === "inventory" || 
    l === "shop" ||
    l === "categories" ||
    l === "new arrivals" ||
    l === "sale" ||
    l === "best sellers" ||
    l === "lookbook" ||
    l === "vehicle details"
  ) {
    return "#services";
  }
  
  if (
    l === "reservations" || 
    l === "online ordering" || 
    l === "book appointment" || 
    l === "consultation booking" || 
    l === "mortgage calculator" ||
    l === "before & after" ||
    l === "schedule" ||
    l === "quote request" ||
    l === "doctors" ||
    l === "attorneys" ||
    l === "trainers" ||
    l === "financing" ||
    l === "trade-in"
  ) {
    if (sector === "restaurant") return "#reservations";
    if (sector === "realestate") return "#mortgage-calculator";
    if (sector === "beauty" || sector === "dental" || sector === "lawfirm") return "#book-appointment";
    if (sector === "construction") return "#before-after";
    if (sector === "gym") return "#schedule";
  }
  
  return `#${l.replace(/\s+/g, "-")}`;
}

export function generatePreviewHTML(options) {
  const {
    businessName = "My Business",
    sector = "restaurant",
    style = "modern",
    phone = "+1 (555) 019-2834",
    email = "hello@mybusiness.com",
    address = "123 Main Street, Suite 100",
    mainColor = "",
    logoPlaceholder = "",
    products = "",
    description = "",
    socials = {}
  } = options;

  const category = categoriesData[sector] || categoriesData.restaurant;
  const theme = stylesTheme[style] || stylesTheme.modern;

  // Use custom color if provided, otherwise default to theme's primary color
  const primaryColor = mainColor || theme.colors.primary;
  const primaryHover = mainColor ? adjustColorBrightness(mainColor, -15) : theme.colors.primaryHover;

  // Set up business description
  const businessDesc = description.trim() || category.defaultDescription;

  // Split and parse custom products, or fallback to mockItems
  let itemsList = [];
  if (products.trim()) {
    itemsList = products.split("\n").filter(l => l.trim()).map(line => {
      const parts = line.split(":");
      if (parts.length > 1) {
        return { name: parts[0].trim(), price: parts[1].trim(), desc: parts.slice(2).join(":").trim() || "Premium quality service." };
      }
      return { name: line.trim(), price: "Inquire", desc: "Premium custom choice." };
    });
  } else {
    itemsList = category.mockItems;
  }

  // Logo text or image
  const logoHTML = logoPlaceholder.trim() 
    ? `<img src="${logoPlaceholder}" alt="${businessName}" style="max-height: 40px; border-radius: 4px;">`
    : `<span class="logo-text">${businessName.split(" ").map(w => w[0]).join("").toUpperCase().substring(0, 3)}</span> <span class="logo-full">${businessName}</span>`;

  // Render navigation links
  const navLinksHTML = category.menu.map(link => `
    <a href="${getMenuHref(link, sector)}" class="nav-link">${link}</a>
  `).join("");

  // Social Links HTML
  const socialLinksHTML = Object.entries(socials)
    .filter(([_, url]) => url && url.trim())
    .map(([network, url]) => `
      <a href="${url}" target="_blank" class="social-icon-btn" aria-label="${network}">
        ${network.charAt(0).toUpperCase()}
      </a>
    `).join("") || `
      <a href="#" class="social-icon-btn">F</a>
      <a href="#" class="social-icon-btn">I</a>
      <a href="#" class="social-icon-btn">T</a>
    `;

  // Dynamic products/services section depending on sector details
  let itemsSectionTitle = "Products & Services";
  if (sector === "restaurant") itemsSectionTitle = "Our Signature Menu";
  else if (sector === "furniture") itemsSectionTitle = "Featured Collections";
  else if (sector === "realestate") itemsSectionTitle = "Featured Property Listings";
  else if (sector === "beauty" || sector === "dental") itemsSectionTitle = "Our Services & Treatments";
  else if (sector === "lawfirm") itemsSectionTitle = "Our Practice Areas";
  else if (sector === "gym") itemsSectionTitle = "Membership Plans & Classes";
  else if (sector === "construction") itemsSectionTitle = "Our Specializations & Projects";
  else if (sector === "auto") itemsSectionTitle = "Prisitine Inventory";
  else if (sector === "clothing") itemsSectionTitle = "Bespoke Boutique Shop";

  const itemsGridHTML = itemsList.map(item => `
    <div class="product-card">
      <div class="card-image-placeholder">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${primaryColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="card-img-icon"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
      </div>
      <div class="product-details">
        <div class="product-header">
          <h3 class="product-name">${item.name}</h3>
          <span class="product-price">${item.price}</span>
        </div>
        <p class="product-desc">${item.desc}</p>
        <button class="buy-btn">View Details</button>
      </div>
    </div>
  `).join("");

  // Category specific interactive section details
  let extraInteractiveSection = "";
  if (sector === "restaurant") {
    extraInteractiveSection = generateRestaurantReservations();
  } else if (sector === "realestate") {
    extraInteractiveSection = generateRealestateCalculator();
  } else if (sector === "beauty" || sector === "dental" || sector === "lawfirm") {
    extraInteractiveSection = generateBeautyDentalConsultation(itemsList);
  } else if (sector === "construction") {
    extraInteractiveSection = generateConstructionComparison();
  } else if (sector === "gym") {
    extraInteractiveSection = generateGymWeeklySchedule();
  }

  // Render testimonial review section
  const reviewsHTML = (category.reviews || [
    { author: "Evelyn B.", rating: 5, text: "Excellent customer service, quick communication, and beautiful execution. Exceeded my high expectations!" },
    { author: "Timothy W.", rating: 5, text: "Truly elite standards. Highly recommend their professional team." }
  ]).map(r => `
    <div class="review-card">
      <div class="stars">${"★".repeat(Math.round(r.rating))}</div>
      <p class="review-text">"${r.text}"</p>
      <h4 class="review-author">- ${r.author}</h4>
    </div>
  `).join("");

  // Dynamic root custom CSS values injection
  const rootStyle = `
    :root {
      --primary-color: ${primaryColor};
      --primary-hover: ${primaryHover};
      --secondary-color: ${theme.colors.secondary};
      --background-color: ${theme.colors.background};
      --surface-color: ${theme.colors.surface};
      --text-main: ${theme.colors.textMain};
      --text-muted: ${theme.colors.textMuted};
      --border-color: ${theme.colors.border};
      
      --font-heading: ${theme.fontHeading};
      --font-body: ${theme.fontBody};
      --border-radius: ${theme.borderRadius};
      --box-shadow: ${theme.boxShadow};
      --border-style: ${theme.borderStyle};
    }
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${businessName} - Generated Concept</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Inter:wght@300;400;600;700&family=Merriweather:ital,wght@0,300;0,700;1,400&family=Open+Sans:wght@300;400;600;700&family=Outfit:wght@300;500;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;600;700&family=Space+Grotesk:wght@300;500;700&display=swap" rel="stylesheet">
  
  <style>
    ${rootStyle}
    ${iframeCSS}
  </style>
</head>
<body>

  <!-- Header / Navigation -->
  <header class="header-nav">
    <div class="logo-container">
      ${logoHTML}
    </div>
    <nav class="nav-links">
      ${navLinksHTML}
    </nav>
    <div class="nav-actions">
      <a href="#contact" class="cta-btn primary-cta" style="padding: 0.5rem 1.2rem; font-size: 0.85rem;">Contact Us</a>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero-section" id="home">
    <span class="hero-tag">${category.name}</span>
    <h1 class="hero-title">${category.tagline}</h1>
    <p class="hero-desc">${businessDesc}</p>
    <div class="hero-btns">
      <a href="#services" class="cta-btn primary-cta">Explore Services</a>
      <a href="#contact" class="cta-btn secondary-cta">Book Consultation</a>
    </div>
  </section>

  <!-- About Section -->
  <section class="about-section" id="about-us">
    <div class="section-container">
      <div class="grid-2">
        <div class="about-content">
          <span class="hero-tag">ABOUT OUR BRAND</span>
          <h2 class="section-title">Crafting Excellence, Inspiring Daily Life</h2>
          <p class="subtitle" style="font-size: 1.05rem;">${businessDesc}</p>
          <p style="color: var(--text-muted); margin-bottom: 2rem;">Driven by passion and built on professional expertise, we strive to bring unmatched quality and service to our local community. Discover our commitment to outstanding craft.</p>
          <a href="#contact" class="cta-btn primary-cta">Get In Touch</a>
        </div>
        <div class="about-visual">
          ${category.name.substring(0, 2).toUpperCase()}
        </div>
      </div>
    </div>
  </section>

  <!-- Products or Services Section -->
  <section class="products-section" id="services">
    <div class="section-container">
      <div style="text-align: center; margin-bottom: 3rem;">
        <span class="hero-tag">PREMIUM SELECTION</span>
        <h2 class="section-title">${itemsSectionTitle}</h2>
        <p class="subtitle" style="max-width: 600px; margin: 0 auto;">Select from our elite, tailored listings designed to deliver maximum quality and support your requirements.</p>
      </div>
      <div class="products-grid">
        ${itemsGridHTML}
      </div>
    </div>
  </section>

  <!-- Extra Interactive Section based on Sector -->
  ${extraInteractiveSection}

  <!-- Testimonials -->
  <section class="testimonials-section" id="testimonials">
    <div class="section-container">
      <span class="hero-tag">TESTIMONIALS</span>
      <h2 class="section-title">What Our Clients Say</h2>
      <p class="subtitle" style="max-width: 600px; margin: 0 auto;">Honest reviews from genuine local clients who have experienced our elite dedication and services.</p>
      <div class="reviews-grid">
        ${reviewsHTML}
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section class="contact-section" id="contact">
    <div class="section-container">
      <div style="text-align: center; margin-bottom: 4rem;">
        <span class="hero-tag">CONNECT WITH US</span>
        <h2 class="section-title">Start a Conversation Today</h2>
        <p class="subtitle">Have a project or inquiry? Reach out and we'll reply within 24 hours.</p>
      </div>
      <div class="contact-grid">
        <div class="contact-info">
          <div class="info-item">
            <div class="info-icon">☏</div>
            <div class="info-details">
              <h4>Phone Line</h4>
              <p>${phone}</p>
            </div>
          </div>
          <div class="info-item">
            <div class="info-icon">✉</div>
            <div class="info-details">
              <h4>Email Inbox</h4>
              <p>${email}</p>
            </div>
          </div>
          <div class="info-item">
            <div class="info-icon">☉</div>
            <div class="info-details">
              <h4>Our Location</h4>
              <p>${address}</p>
            </div>
          </div>
        </div>
        <form class="contact-form" onsubmit="event.preventDefault(); alert('Message sent successfully!');">
          <div class="form-row">
            <div class="form-group">
              <label>Your Name</label>
              <input type="text" placeholder="John Doe" required>
            </div>
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="john@example.com" required>
            </div>
          </div>
          <div class="form-group">
            <label>Subject</label>
            <input type="text" placeholder="General Inquiry" required>
          </div>
          <div class="form-group">
            <label>Message Content</label>
            <textarea rows="4" placeholder="How can we help you?" required></textarea>
          </div>
          <button type="submit" class="cta-btn primary-cta">Send Message</button>
        </form>
      </div>
    </div>
  </section>

  <!-- Footer Section -->
  <footer class="footer-section">
    <div class="footer-container">
      <div>
        <p>&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
        <p style="font-size: 0.8rem; margin-top: 0.5rem; color: var(--text-muted);">Generated via MyConceptor Platform.</p>
      </div>
      <div class="social-icons">
        ${socialLinksHTML}
      </div>
    </div>
  </footer>

  <!-- Embedded Preview Modals -->
  
  <!-- Booking Modal -->
  <div class="preview-modal-overlay" id="iframe-booking-modal">
    <div class="preview-modal-content">
      <button class="preview-modal-close" onclick="closePreviewModal('iframe-booking-modal')">×</button>
      <div class="preview-modal-icon">📅</div>
      <h3 class="preview-modal-title">Interactive Demo Booking</h3>
      <p class="preview-modal-desc">Schedule your appointment or reserve your spot instantly. This is a fully active visual concept.</p>
      <form class="preview-modal-form" onsubmit="submitPreviewBooking(event)">
        <div class="form-group" style="display: flex; flex-direction: column; gap: 0.5rem;">
          <label>Your Full Name</label>
          <input type="text" placeholder="Sarah Jenkins" required id="booking-name">
        </div>
        <div class="form-group" style="display: flex; flex-direction: column; gap: 0.5rem;">
          <label>Email Address</label>
          <input type="email" placeholder="sarah@example.com" required id="booking-email">
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
          <div class="form-group" style="display: flex; flex-direction: column; gap: 0.5rem;">
            <label>Preferred Date</label>
            <input type="date" required id="booking-date">
          </div>
          <div class="form-group" style="display: flex; flex-direction: column; gap: 0.5rem;">
            <label>Time Slot</label>
            <select required id="booking-time">
              <option value="">Choose Time</option>
              <option value="09:00">09:00 AM</option>
              <option value="11:30">11:30 AM</option>
              <option value="14:00">02:00 PM</option>
              <option value="16:30">04:30 PM</option>
            </select>
          </div>
        </div>
        <button type="submit" class="cta-btn primary-cta">Confirm Booking Request</button>
      </form>
    </div>
  </div>

  <!-- Product Details Modal -->
  <div class="preview-modal-overlay" id="iframe-product-modal">
    <div class="preview-modal-content">
      <button class="preview-modal-close" onclick="closePreviewModal('iframe-product-modal')">×</button>
      <div class="preview-modal-icon">✨</div>
      <h3 class="preview-modal-title" id="preview-prod-title">Product Details</h3>
      <p class="preview-modal-desc" id="preview-prod-desc">Detailed features of the selected service or item.</p>
      <div class="preview-modal-form">
        <div style="font-size: 1.5rem; font-weight: 800; color: var(--primary-color); margin-bottom: 1rem; text-align: center;" id="preview-prod-price">$0.00</div>
        <button class="cta-btn primary-cta" onclick="alert('Demo Purchase Triggered! In the complete SaaS product, this opens a customized Stripe Checkout interface.')">Order Now (Demo)</button>
      </div>
    </div>
  </div>

  <!-- Generic Concept Section Modal -->
  <div class="preview-modal-overlay" id="iframe-section-modal">
    <div class="preview-modal-content" style="max-width: 440px;">
      <button class="preview-modal-close" onclick="closePreviewModal('iframe-section-modal')">×</button>
      <div class="preview-modal-icon">✨</div>
      <h3 class="preview-modal-title" id="preview-section-title">Premium Concept Section</h3>
      <p class="preview-modal-desc" id="preview-section-desc">This is a premium, fully-integrated page section in the MyConceptor platform.</p>
      <div style="background: rgba(0, 0, 0, 0.02); border: 1px solid var(--border-color); border-radius: var(--border-radius); padding: 1.2rem; margin: 1.2rem 0; font-size: 0.88rem; color: var(--text-muted); text-align: left;" id="preview-section-bullets">
        <!-- Bullet list of SaaS capabilities -->
      </div>
      <div style="display: flex; gap: 0.75rem; justify-content: center;">
        <button class="cta-btn primary-cta" onclick="triggerParentCustomize(); closePreviewModal('iframe-section-modal');" style="padding: 0.6rem 1.2rem; font-size: 0.85rem; cursor: pointer;">Customize Layout</button>
        <button class="cta-btn secondary-cta" onclick="triggerParentUse(); closePreviewModal('iframe-section-modal');" style="padding: 0.6rem 1.2rem; font-size: 0.85rem; cursor: pointer; border: 1px solid var(--border-color); background: var(--surface-color); color: var(--text-main);">Export Concept</button>
      </div>
    </div>
  </div>

  <!-- Creator Banner -->
  <div class="iframe-creator-banner">
    <span>💡 You are previewing a live **MyConceptor** website concept.</span>
    <button class="iframe-creator-btn" onclick="triggerParentCustomize()">Customize Layout</button>
  </div>

  <script>
    ${iframeJS}
  </script>

</body>
</html>`;
}
