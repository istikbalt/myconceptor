// Exposed utilities for preview modals
window.openPreviewModal = function(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('active');
};
window.closePreviewModal = function(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
};

// Close modal on outside overlay click
document.querySelectorAll('.preview-modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
    }
  });
});

// Intercept all booking buttons/links and generic menu items inside iframe
document.addEventListener('DOMContentLoaded', () => {
  // Connect inline reservation and appointment forms to submitPreviewBooking
  const reservationForms = Array.from(document.querySelectorAll('.reservation-form, .appointment-form'));
  reservationForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Find or fallback values for alert display
      const nameInput = form.querySelector('input[type="text"]');
      const name = nameInput ? nameInput.value : 'Guest';
      const dateInput = form.querySelector('input[type="date"]');
      const date = dateInput ? dateInput.value : new Date().toLocaleDateString();
      
      alert('Booking Confirmed!\n\nThank you ' + name + ', your reservation/consultation request for ' + date + ' has been successfully logged!\n\nIn the final live product, this syncs seamlessly to your business database & calendar.');
    });
  });

  // Intercept all menu links
  const allLinks = Array.from(document.querySelectorAll('a'));
  allLinks.forEach(el => {
    const href = el.getAttribute('href') || '';
    const text = el.textContent.toLowerCase().trim();
    
    if (href.startsWith('#')) {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = href;
        const targetEl = document.querySelector(targetId);
        
        if (targetEl) {
          // Target section exists, smooth scroll natively
          targetEl.scrollIntoView({ behavior: 'smooth' });
        } else {
          // Section does not exist - check if booking/reservations link
          if (
            text.includes('book') || 
            text.includes('reserve') || 
            text.includes('reservation') || 
            text.includes('appointment') ||
            text.includes('scheduling') ||
            text.includes('order') ||
            targetId.includes('book') ||
            targetId.includes('reserve') ||
            targetId.includes('appointment') ||
            targetId.includes('reservation')
          ) {
            openPreviewModal('iframe-booking-modal');
          } else {
            // Open generic preview section modal
            showConceptSectionModal(el.textContent.trim(), href);
          }
        }
      });
    }
  });

  // Intercept standalone booking buttons (that might not be standard <a> anchors)
  const allButtons = Array.from(document.querySelectorAll('button'));
  allButtons.forEach(btn => {
    const text = btn.textContent.toLowerCase();
    // Skip buy and banner buttons
    if (btn.classList.contains('buy-btn') || btn.classList.contains('iframe-creator-btn') || btn.closest('.preview-modal-content')) return;

    if (
      text.includes('book') || 
      text.includes('reserve') || 
      text.includes('reservation') || 
      text.includes('appointment') ||
      text.includes('scheduling')
    ) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openPreviewModal('iframe-booking-modal');
      });
    }
  });

  // Catch and alert on mock social button clicks
  const socialButtons = Array.from(document.querySelectorAll('.social-icon-btn'));
  socialButtons.forEach(btn => {
    const href = btn.getAttribute('href') || '';
    if (href === '#' || href === '') {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Social Channel Clicked!\n\nIn the MyConceptor settings console, you can easily link your brand Facebook, Instagram, Twitter, and LinkedIn profiles to automatically sync live link tags.');
      });
    }
  });

  // Wire view details / buy button clicks to product modal
  const buyButtons = Array.from(document.querySelectorAll('.buy-btn'));
  buyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.product-card');
      if (card) {
        const name = card.querySelector('.product-name')?.textContent || 'Premium Item';
        const price = card.querySelector('.product-price')?.textContent || 'Contact Us';
        const desc = card.querySelector('.product-desc')?.textContent || 'Detailed specifications of this choice.';
        
        document.getElementById('preview-prod-title').textContent = name;
        document.getElementById('preview-prod-price').textContent = price;
        document.getElementById('preview-prod-desc').textContent = desc;
        
        openPreviewModal('iframe-product-modal');
      }
    });
  });
});

window.showConceptSectionModal = function(name, href) {
  document.getElementById('preview-section-title').textContent = name + ' Section';
  
  let desc = 'This is a premium, fully-integrated page section in the MyConceptor platform.';
  let bullets = '';
  
  const n = name.toLowerCase();
  if (n.includes('gallery') || n.includes('portfolio') || n.includes('lookbook')) {
    desc = 'Beautiful responsive gallery grids with active media popups and filter carousels.';
    bullets = '<li>• Drag-and-drop crop tools for instant upload</li><li>• Global CDN image hosting integration</li><li>• Lightbox viewing mode & video slider supports</li>';
  } else if (n.includes('faq') || n.includes('question')) {
    desc = 'Structured FAQ accordions optimized for customer search engine indexing.';
    bullets = '<li>• Smooth collapse-expand micro-animations</li><li>• Structured JSON-LD schema generated for SEO</li><li>• Custom search box filters for fast lookups</li>';
  } else if (n.includes('team') || n.includes('doctor') || n.includes('attorney') || n.includes('trainer') || n.includes('agent')) {
    desc = 'Elite staff directory grids linking profile pages and dynamic availability schedules.';
    bullets = '<li>• Individual landing pages for core staff members</li><li>• Customized bio detail modals and credentials badges</li><li>• Direct scheduler integrations per employee</li>';
  } else if (n.includes('blog') || n.includes('news') || n.includes('case')) {
    desc = 'Full-scale content management feed to publish articles, updates, and success case studies.';
    bullets = '<li>• Visual markdown editor with draft auto-saving</li><li>• Share options for social networks (FB, IG, LinkedIn)</li><li>• Category filters & organic search index tags</li>';
  } else if (n.includes('financing') || n.includes('trade-in') || n.includes('calculator')) {
    desc = 'Interactive credit applications, financing estimators, and instant valuation portals.';
    bullets = '<li>• Real-time credit score API connection</li><li>• Trade-in value scanning using local vehicle inventory databases</li><li>• Secured encrypted client document transfer uploads</li>';
  } else {
    desc = 'A premium page component tailored to elevate user engagement and capture leads.';
    bullets = '<li>• Drag-and-drop component designer interface</li><li>• Complete color, layout, and font configuration swaps</li><li>• Connected database forms & active webhooks</li>';
  }
  
  document.getElementById('preview-section-desc').textContent = desc;
  document.getElementById('preview-section-bullets').innerHTML = '<ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem; padding: 0;">' + bullets + '</ul>';
  
  openPreviewModal('iframe-section-modal');
};

window.submitPreviewBooking = function(e) {
  e.preventDefault();
  const name = document.getElementById('booking-name').value;
  const date = document.getElementById('booking-date').value;
  const time = document.getElementById('booking-time').value;
  
  alert('Booking Confirmed!\n\nThank you ' + name + ', your appointment for ' + date + ' at ' + time + ' has been logged.\n\nIn the final live product, this syncs seamlessly to your Google Calendar & sends an automated SMS/Email notification.');
  closePreviewModal('iframe-booking-modal');
}

window.triggerParentCustomize = function() {
  window.parent.postMessage('customize-concept', '*');
}

window.triggerParentUse = function() {
  window.parent.postMessage('use-concept', '*');
}
