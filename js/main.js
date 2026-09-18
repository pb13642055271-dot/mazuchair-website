// ============================================
// MAZU - Main App JavaScript
// ============================================

// --- Helpers ---
function qs(sel, el = document) { return el.querySelector(sel); }
function qsa(sel, el = document) { return Array.from(el.querySelectorAll(sel)); }
function el(tag, attrs = {}, children = []) {
  const e = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class') e.className = v;
    else if (k === 'html') e.innerHTML = v;
    else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2), v);
    else if (v !== false && v != null) e.setAttribute(k, v);
  });
  (Array.isArray(children) ? children : [children]).forEach(c => {
    if (c == null || c === false) return;
    e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return e;
}

// LOGO_PATH and imgUrl() are defined in js/config.js

// --- Navigation ---
function renderNav(active = 'home') {
  const nav = qs('#main-nav');
  if (!nav) return;

  const cats = SITE_DATA.categories;
  
  const dropdownHtml = cats.map(c => `
    <a class="dropdown-category" href="products.html?cat=${c.slug}">
      <img src="${imgUrl(c.image)}" alt="${c.name}">
      <span>${c.name}</span>
    </a>
  `).join('');

  nav.innerHTML = `
    <div class="container nav-inner">
      <a href="index.html" class="nav-logo">
        <img src="${imgUrl(LOGO_PATH)}" alt="MAZU Logo">
        <span>MAZU</span>
      </a>
      
      <nav class="nav-menu">
        <div class="nav-item">
          <a href="index.html" class="nav-link ${active === 'home' ? 'active' : ''}">Home</a>
        </div>
        <div class="nav-item">
          <a href="about.html" class="nav-link ${active === 'about' ? 'active' : ''}">About Us</a>
        </div>
        <div class="nav-item has-dropdown">
          <a href="products.html" class="nav-link ${active === 'products' ? 'active' : ''}">
            Products
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </a>
          <div class="nav-dropdown">
            ${dropdownHtml}
          </div>
        </div>
        <div class="nav-item">
          <a href="cases.html" class="nav-link ${active === 'cases' ? 'active' : ''}">Case Studies</a>
        </div>
        <div class="nav-item">
          <a href="blog.html" class="nav-link ${active === 'blog' ? 'active' : ''}">News & Blog</a>
        </div>
        <div class="nav-item">
          <a href="contact.html" class="nav-link ${active === 'contact' ? 'active' : ''}">Contact</a>
        </div>
      </nav>
      
      <div class="nav-actions">
        <button class="nav-search-btn" aria-label="Search" onclick="openSearch()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>
        <a href="contact.html" class="btn btn-primary nav-cta">Get a Quote</a>
        <button class="nav-hamburger" aria-label="Menu" onclick="toggleMobileMenu()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </div>
    </div>
  `;

  // Mobile menu
  const mobileMenu = qs('#mobile-menu');
  const mobileOverlay = qs('#mobile-menu-overlay');
  
  mobileMenu.innerHTML = `
    <button class="mobile-menu-close" onclick="toggleMobileMenu()" aria-label="Close menu">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
    <div class="mobile-nav-list">
      <div class="mobile-nav-item"><a href="index.html">Home</a></div>
      <div class="mobile-nav-item"><a href="about.html">About Us</a></div>
      <div class="mobile-nav-item">
        <div class="mobile-dropdown-title" onclick="toggleMobileDropdown(this)">
          Products
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
        <div class="mobile-dropdown-content">
          ${cats.map(c => `<a href="products.html?cat=${c.slug}">${c.name}</a>`).join('')}
        </div>
      </div>
      <div class="mobile-nav-item"><a href="cases.html">Case Studies</a></div>
      <div class="mobile-nav-item"><a href="blog.html">News & Blog</a></div>
      <div class="mobile-nav-item"><a href="contact.html">Contact</a></div>
    </div>
    <a href="contact.html" class="btn btn-primary mobile-menu-cta" onclick="toggleMobileMenu()">Get a Quote</a>
  `;
}

function toggleMobileMenu() {
  const menu = qs('#mobile-menu');
  const overlay = qs('#mobile-menu-overlay');
  menu.classList.toggle('open');
  overlay.classList.toggle('open');
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}

function toggleMobileDropdown(el) {
  const content = el.nextElementSibling;
  content.classList.toggle('open');
}

// --- Search Modal ---
function openSearch() {
  qs('#search-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => qs('#search-input')?.focus(), 300);
}

function closeSearch() {
  qs('#search-modal').classList.remove('open');
  document.body.style.overflow = '';
}

// --- Footer ---
function renderFooter() {
  const footer = qs('#main-footer');
  if (!footer) return;

  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="footer-logo">
            <img src="${imgUrl(LOGO_PATH)}" alt="MAZU Logo">
            <span>MAZU</span>
          </a>
          <p>Seating the World with Excellence. Premium folding chairs and furniture, direct from our factory in Tianjin, China to 50+ countries worldwide.</p>
        </div>
        <div class="footer-col">
          <h4>Products</h4>
          <ul>
            <li><a href="products.html?cat=plastic-folding-chair">Plastic Folding Chairs</a></li>
            <li><a href="products.html?cat=metal-folding-chair">Metal Folding Chairs</a></li>
            <li><a href="products.html?cat=upholstered-folding-chair">Upholstered Folding Chairs</a></li>
            <li><a href="products.html?cat=outdoor-folding-chair">Outdoor Folding Chairs</a></li>
            <li><a href="products.html?cat=folding-stool">Folding Stools</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="about.html">About Us</a></li>
            <li><a href="cases.html">Case Studies</a></li>
            <li><a href="blog.html">News & Blog</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="about.html#sustainability">Sustainability</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Get in Touch</h4>
          <ul>
            <li><a href="mailto:info@mazuchair.com">info@mazuchair.com</a></li>
            <li><a href="tel:+8618526872467">+86 185 2687 2467</a></li>
            <li>MAZU TECH Co., Ltd.<br>Tianjin, China</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 MAZU TECH Co., Ltd. All rights reserved.</span>
        <div class="footer-socials">
          <a href="#" aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="#" aria-label="Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="#" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
        </div>
      </div>
    </div>
  `;
}

// --- Inquiry Modal ---
function openInquiry(productName = '') {
  const modal = qs('#inquiry-modal');
  const overlay = qs('#inquiry-overlay');
  const productInput = qs('#inquiry-product');
  
  if (productInput) productInput.value = productName;
  
  modal.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeInquiry() {
  const modal = qs('#inquiry-modal');
  const overlay = qs('#inquiry-overlay');
  modal.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function renderInquiryModal() {
  const overlay = qs('#inquiry-overlay');
  if (!overlay) return;
  
  overlay.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true">
      <div class="modal-header">
        <div>
          <h3>Request a Quote</h3>
          <p>Fill out the form and our sales team will respond within 24 hours.</p>
        </div>
        <button class="modal-close" onclick="closeInquiry()" aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div class="modal-body">
        <form onsubmit="submitInquiry(event)">
          <div class="form-row">
            <div class="form-group">
              <label>Full Name<span class="required">*</span></label>
              <input type="text" class="form-control" placeholder="John Smith" required>
            </div>
            <div class="form-group">
              <label>Company Name<span class="required">*</span></label>
              <input type="text" class="form-control" placeholder="Your Company" required>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Country<span class="required">*</span></label>
              <input type="text" class="form-control" placeholder="United States" required>
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input type="tel" class="form-control" placeholder="+1 234 567 890">
            </div>
          </div>
          <div class="form-group">
            <label>Email<span class="required">*</span></label>
            <input type="email" class="form-control" placeholder="john@company.com" required>
          </div>
          <div class="form-group">
            <label>Product of Interest</label>
            <input type="text" class="form-control" id="inquiry-product" placeholder="e.g. AeroLite White Folding Chair">
          </div>
          <div class="form-group">
            <label>Message</label>
            <textarea class="form-control" placeholder="Tell us about your requirements, quantity, delivery dates..."></textarea>
          </div>
          <button type="submit" class="btn btn-primary form-submit">Send Inquiry</button>
        </form>
      </div>
    </div>
  `;
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeInquiry();
  });
}

function submitInquiry(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Sending...';
  btn.disabled = true;
  
  setTimeout(() => {
    btn.textContent = '✓ Inquiry Sent!';
    btn.style.background = '#2b8a3e';
    setTimeout(() => {
      closeInquiry();
      btn.textContent = originalText;
      btn.disabled = false;
      btn.style.background = '';
      e.target.reset();
    }, 1500);
  }, 1000);
}

// --- Scroll Effects ---
function initScrollEffects() {
  // Nav background on scroll
  const nav = qs('.nav');
  const backToTop = qs('#back-to-top');
  
  function onScroll() {
    const scrolled = window.scrollY > 20;
    nav.classList.toggle('scrolled', scrolled);
    
    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    }
  }
  
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Animated Counter ---
function animateCounter(el, target, duration = 2000, suffix = '') {
  const start = 0;
  const startTime = performance.now();
  
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * eased);
    el.textContent = current.toLocaleString() + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

function initCounters() {
  const counters = qsa('[data-count]');
  
  if (!counters.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseFloat(entry.target.dataset.count);
        const suffix = entry.target.dataset.suffix || '';
        animateCounter(entry.target, target, 2000, suffix);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(c => observer.observe(c));
}

// --- Scroll Reveal ---
function initReveal() {
  const reveals = qsa('.reveal');
  
  if (!reveals.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  reveals.forEach(r => observer.observe(r));
}

// --- FAQ Accordion ---
function initFAQ() {
  qsa('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      
      // Close all
      qsa('.faq-item.open').forEach(i => i.classList.remove('open'));
      
      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  });
}

// --- Search suggestions ---
function initSearch() {
  const input = qs('#search-input');
  if (!input) return;
  
  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearch();
      closeInquiry();
      const mobileMenu = qs('#mobile-menu');
      if (mobileMenu?.classList.contains('open')) toggleMobileMenu();
    }
    // Open search with Cmd/Ctrl + K
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
  });
  
  // Submit search
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && input.value.trim()) {
      window.location.href = 'products.html?q=' + encodeURIComponent(input.value.trim());
    }
  });
}

// --- Breadcrumb ---
function renderBreadcrumb(items) {
  const wrap = qs('#breadcrumb');
  if (!wrap) return;
  
  wrap.innerHTML = `
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="index.html">Home</a>
        ${items.map((item, i) => `
          <span class="breadcrumb-sep">/</span>
          ${i === items.length - 1 
            ? `<span class="current">${item.label}</span>`
            : `<a href="${item.href}">${item.label}</a>`
          }
        `).join('')}
      </nav>
    </div>
  `;
}

// --- World Map SVG ---
function worldMapSVG() {
  // Simplified world map with major continents highlighted where MAZU operates
  return `
    <svg class="world-map-svg" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
      <!-- North America -->
      <path class="active" d="M100,80 L180,60 L250,80 L280,120 L270,180 L240,220 L200,240 L160,220 L130,200 L100,170 L80,130 Z" opacity="0.3"/>
      <path class="active" d="M140,100 Q180,80 220,95 Q240,110 230,140 Q210,160 180,155 Q150,145 140,120 Z"/>
      <!-- South America -->
      <path class="active" d="M220,270 L260,260 L280,300 L270,360 L250,400 L230,420 L210,400 L200,360 L200,310 Z" opacity="0.3"/>
      <path class="active" d="M225,285 Q250,280 265,300 Q270,330 255,360 Q240,380 225,370 Q215,345 220,310 Z"/>
      <!-- Europe -->
      <path class="active" d="M380,70 L440,60 L470,80 L460,110 L430,125 L400,120 L375,105 L370,85 Z"/>
      <!-- Africa -->
      <path class="active" d="M400,160 L460,150 L490,180 L495,240 L480,300 L450,340 L420,340 L400,300 L390,250 L390,200 Z" opacity="0.3"/>
      <path class="active" d="M410,180 Q440,170 465,190 Q475,230 465,270 Q450,300 430,300 Q415,275 410,240 Z"/>
      <!-- Middle East -->
      <path class="active" d="M470,120 L510,110 L530,130 L520,160 L490,165 L475,150 Z"/>
      <!-- Asia -->
      <path d="M500,70 L650,50 L720,90 L700,150 L650,180 L580,170 L520,150 L500,110 Z" opacity="0.3"/>
      <!-- Australia -->
      <path d="M640,300 L720,290 L740,320 L720,350 L660,350 L640,330 Z" opacity="0.3"/>
      
      <!-- Active market dots -->
      <circle class="map-dot" cx="170" cy="130" r="6">
        <title>North America</title>
      </circle>
      <circle class="map-dot" cx="240" cy="340" r="6">
        <title>South America</title>
      </circle>
      <circle class="map-dot" cx="420" cy="90" r="6">
        <title>Europe</title>
      </circle>
      <circle class="map-dot" cx="440" cy="230" r="5">
        <title>Africa</title>
      </circle>
      <circle class="map-dot" cx="500" cy="135" r="6">
        <title>Middle East</title>
      </circle>
      <circle class="map-dot" cx="600" cy="120" r="5">
        <title>Asia Pacific</title>
      </circle>
    </svg>
  `;
}

// --- Page URL helpers ---
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// --- Image Error Handling ---
function initImageErrorHandling() {
  // For any image that fails to load, replace with a gradient placeholder
  document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
      // Create an SVG data URL as placeholder
      const w = e.target.naturalWidth || 800;
      const h = e.target.naturalHeight || 600;
      const placeholder = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}'>
          <defs>
            <linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'>
              <stop offset='0%' style='stop-color:#0A2540'/>
              <stop offset='100%' style='stop-color:#1B3A5C'/>
            </linearGradient>
          </defs>
          <rect width='100%' height='100%' fill='url(#g)'/>
          <text x='50%' y='50%' font-family='Inter, sans-serif' font-size='24' font-weight='600' fill='rgba(255,255,255,0.3)' text-anchor='middle' dominant-baseline='middle'>MAZU</text>
        </svg>`
      )}`;
      e.target.src = placeholder;
      e.target.style.objectFit = 'cover';
    }
  }, true);
}

// --- Global Init ---
function initApp(page = 'home') {
  initImageErrorHandling();
  renderNav(page);
  renderFooter();
  renderInquiryModal();
  initScrollEffects();
  initCounters();
  initReveal();
  initFAQ();
  initSearch();
}
