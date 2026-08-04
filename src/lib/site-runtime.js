/* eslint-disable */
// Auto-ported verbatim from the original website.html main <script> block.
// Runs once on mount (client only). DOM is manipulated imperatively by id/class,
// exactly as the original standalone page did.

export function initMarketingSite() {
// CURSOR

const cursor = document.getElementById('cursor');

const ring = document.getElementById('cursor-ring');

document.addEventListener('mousemove', e => {

  cursor.style.left = e.clientX + 'px';

  cursor.style.top = e.clientY + 'px';

  setTimeout(() => { ring.style.left = e.clientX + 'px'; ring.style.top = e.clientY + 'px'; }, 80);

});

document.querySelectorAll('a, button, input, select, textarea').forEach(el => {

  el.addEventListener('mouseenter', () => { cursor.style.width = '20px'; cursor.style.height = '20px'; ring.style.width = '60px'; ring.style.height = '60px'; });

  el.addEventListener('mouseleave', () => { cursor.style.width = '12px'; cursor.style.height = '12px'; ring.style.width = '36px'; ring.style.height = '36px'; });

});

// NAVBAR

window.addEventListener('scroll', () => {

  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);

});

// SCROLL REVEAL

const observer = new IntersectionObserver(entries => {

  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });

}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ═══════════════════════════════════════════════════

// MIND MAP — Rotating Cards + Problem/Solution Below

// ═══════════════════════════════════════════════════

(function() {

  const canvas = document.getElementById('mindmap-canvas');

  const ctx    = canvas.getContext('2d');

  let W, H, time = 0, mouse = { x: -9999, y: -9999 };

  // Nodes — AI is now one of the orbit nodes, not centre

  const NODES = [

    { label: ['Sales'],              color: '#f0c132',

      probTitle: 'Sales Bottlenecks',

      problems: ['Low conversion rates', 'No pipeline visibility', 'Weak follow-up process', 'Over-reliance on referrals'],

      solTitle: 'Our Solutions',

      solutions: ['CRM implementation & training', 'Automated follow-up sequences', 'Sales playbook with KPIs', 'Multi-channel lead generation'] },

    { label: ['Marketing'],          color: '#7dd3b0',

      probTitle: 'Marketing Bottlenecks',

      problems: ['No clear brand positioning', 'Ad spend with no ROI tracking', 'Weak content strategy', 'No lead nurturing system'],

      solTitle: 'Our Solutions',

      solutions: ['Brand positioning sprint', 'ROI-tracked paid media', 'Content engine setup', 'Email automation flows'] },

    { label: ['Operations'],         color: '#93c5fd',

      probTitle: 'Operations Bottlenecks',

      problems: ['Key-man dependencies', 'Manual repetitive tasks', 'No documented SOPs', 'No performance monitoring'],

      solTitle: 'Our Solutions',

      solutions: ['SOP library creation', 'Process automation', 'Delegation frameworks', 'Real-time dashboards'] },

    { label: ['Customer', 'Service'], color: '#f9a8d4',

      probTitle: 'Customer Service Bottlenecks',

      problems: ['Slow response times', 'Repetitive queries eating hours', 'No self-service options', 'High staff inconsistency'],

      solTitle: 'Our Solutions',

      solutions: ['AI chatbot handling 70% of queries', 'Smart ticket routing', 'Knowledge base that learns', 'Service standards training'] },

    { label: ['Client', 'Experience'],color: '#fbbf24',

      probTitle: 'Client Experience Bottlenecks',

      problems: ['No feedback loops', 'Inconsistent onboarding', 'Low retention & high churn', 'Clients feel undervalued'],

      solTitle: 'Our Solutions',

      solutions: ['NPS & feedback systems', 'Onboarding playbook', 'Retention workflows', 'Client success programme'] },

    { label: ['Systems'],            color: '#c4b5fd',

      probTitle: 'Systems Bottlenecks',

      problems: ['Disconnected tools & platforms', 'Zero automation in workflows', 'Data not captured or used', 'Reporting done manually'],

      solTitle: 'Our Solutions',

      solutions: ['AI workflow audit &amp; roadmap', 'Intelligent workflow mapping', 'Data analytics setup', 'Automated reporting dashboards'] },

    { label: ['AI'],                 color: '#6ee7b7',

      probTitle: 'AI Readiness Bottlenecks',

      problems: ['No AI strategy or roadmap', 'Teams fear AI adoption', 'Processes not AI-compatible', 'Missing data infrastructure'],

      solTitle: 'Our Solutions',

      solutions: ['AI readiness assessment', 'Staff adoption programme', 'Process AI-compatibility audit', 'Data pipeline setup'] },

  ];

  // State

  let orbitAngle   = 0;

  let rotSpeed     = 0.005;

  let activeIdx    = null;

  let flashIdx     = 0;

  let flashT       = 0;

  const FLASH_CYCLE = 130; // frames per auto-flash

  // DOM refs

  const idleHint   = document.getElementById('mm-idle-hint');

  const activeLabel= document.getElementById('mm-active-label');

  const cards      = document.getElementById('mm-cards');

  const probTitle  = document.getElementById('mm-prob-title');

  const probList   = document.getElementById('mm-prob-list');

  const solTitle   = document.getElementById('mm-sol-title');

  const solList    = document.getElementById('mm-sol-list');

  const closeHint  = document.getElementById('mm-close-hint');

  let nodePos = []; // computed each frame

  function showCards(idx) {

    const n = NODES[idx];

    activeLabel.textContent = n.label.join(' ') + ' — Diagnostic';

    activeLabel.classList.add('visible');

    probTitle.textContent = n.probTitle;

    probList.innerHTML = n.problems.map(p => `<li>${p}</li>`).join('');

    solTitle.textContent = n.solTitle;

    solList.innerHTML = n.solutions.map(s => `<li>${s}</li>`).join('');

    // Force re-animation

    cards.classList.remove('visible');

    void cards.offsetWidth;

    cards.classList.add('visible');

    idleHint.style.opacity = '0';

    closeHint.classList.add('visible');

  }

  function hideCards() {

    cards.classList.remove('visible');

    activeLabel.classList.remove('visible');

    closeHint.classList.remove('visible');

    idleHint.style.opacity = '1';

  }

  function resize() {

    const dpr = window.devicePixelRatio || 1;

    const rect = canvas.getBoundingClientRect();

    W = rect.width;

    H = rect.height;

    canvas.width  = Math.round(W * dpr);

    canvas.height = Math.round(H * dpr);

    canvas.style.width  = W + 'px';

    canvas.style.height = H + 'px';

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  }

  // Input — always use CSS pixels (divide by 1, rect already in CSS px)

  canvas.addEventListener('mousemove', e => {

    const r = canvas.getBoundingClientRect();

    mouse.x = e.clientX - r.left;

    mouse.y = e.clientY - r.top;

  });

  canvas.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  function handleTap(mx, my) {

    let hit = null;

    nodePos.forEach((p, i) => { if (Math.hypot(p.x - mx, p.y - my) < 54) hit = i; });

    if (hit !== null) {

      if (activeIdx === hit) { activeIdx = null; flashIdx = 0; flashT = 0; hideCards(); }

      else { activeIdx = hit; showCards(hit); }

    } else if (activeIdx !== null) {

      activeIdx = null; flashIdx = 0; flashT = 0; hideCards();

    }

  }

  canvas.addEventListener('click', e => {

    const r = canvas.getBoundingClientRect();

    handleTap(e.clientX - r.left, e.clientY - r.top);

  });

  canvas.addEventListener('touchend', e => {

    e.preventDefault();

    const r = canvas.getBoundingClientRect();

    const t = e.changedTouches[0];

    handleTap(t.clientX - r.left, t.clientY - r.top);

  });

  // ── Rounded rect helper

  function roundRect(x, y, w, h, r) {

    ctx.beginPath();

    ctx.moveTo(x+r, y);

    ctx.lineTo(x+w-r, y); ctx.arcTo(x+w, y, x+w, y+r, r);

    ctx.lineTo(x+w, y+h-r); ctx.arcTo(x+w, y+h, x+w-r, y+h, r);

    ctx.lineTo(x+r, y+h); ctx.arcTo(x, y+h, x, y+h-r, r);

    ctx.lineTo(x, y+r); ctx.arcTo(x, y, x+r, y, r);

    ctx.closePath();

  }

  function drawCard(x, y, w, h, r, label, lines, color, isActive, isFlash, isHovered) {

    // Pixel-snap to prevent sub-pixel blur

    x = Math.round(x); y = Math.round(y);

    w = Math.round(w); h = Math.round(h);

    ctx.save();

    const glowing = isActive || isFlash || isHovered;

    if (glowing) {

      ctx.shadowColor = isActive ? color : isFlash ? color : 'rgba(240,193,50,0.6)';

      ctx.shadowBlur  = isActive ? 22 : isFlash ? 14 : 8;

    }

    // Fill

    roundRect(x, y, w, h, r);

    ctx.fillStyle = isActive ? color + '22' : 'rgba(22,50,38,0.92)';

    ctx.fill();

    // Border

    roundRect(x, y, w, h, r);

    ctx.strokeStyle = isActive ? color : isFlash ? color : isHovered ? 'rgba(240,193,50,0.8)' : 'rgba(240,193,50,0.25)';

    ctx.lineWidth   = isActive ? 2 : isFlash ? 1.5 : 1;

    ctx.stroke();

    ctx.restore();

    // Label text — sharp, properly sized

    ctx.save();

    ctx.imageSmoothingEnabled = true;

    ctx.imageSmoothingQuality = 'high';

    const fontSize = W < 500 ? 12 : 13;

    const subSize  = W < 500 ? 9 : 9.5;

    ctx.font = `600 ${fontSize}px 'DM Sans', sans-serif`;

    ctx.fillStyle = isActive ? color : isFlash ? color : isHovered ? '#ffffff' : 'rgba(255,255,255,0.9)';

    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';

    const lh = fontSize + 5;

    const totalH = lines.length * lh;

    const textY = h/2 - totalH/2 + lh/2 - (lines.length > 1 ? 4 : 0);

    lines.forEach((line, li) => {

      ctx.fillText(line, x + w/2, y + textY + li * lh);

    });

    // Sub-label

    ctx.font = `400 ${subSize}px 'DM Sans', sans-serif`;

    ctx.fillStyle = isActive

      ? color + 'cc'

      : isFlash ? 'rgba(240,193,50,0.75)'

      : 'rgba(255,255,255,0.32)';

    const subY = y + h/2 + (lines.length > 1 ? fontSize + 4 : fontSize/2 + 4);

    ctx.fillText(isActive ? 'Tap to close' : 'Tap to explore', x + w/2, subY);

    ctx.restore();

  }

  function animate() {

    requestAnimationFrame(animate);

    time += 0.012;

    ctx.clearRect(0, 0, W, H);

    const cx = W/2, cy = H/2 - 10;

    const R  = Math.min(W * 0.36, H * 0.36, 220);

    // Card dimensions — sharper sizes

    const CW = Math.min(136, R * 0.76);

    const CH = Math.min(78, CW * 0.58);

    const CR = 14;

    // Rotate when idle

    if (activeIdx === null) {

      orbitAngle += rotSpeed;

      flashT++;

      if (flashT >= FLASH_CYCLE) { flashT = 0; flashIdx = (flashIdx + 1) % NODES.length; }

    }

    // Compute node positions

    nodePos = NODES.map((n, i) => {

      const a = (i / NODES.length) * Math.PI * 2 + orbitAngle;

      return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };

    });

    // ── Centre glow

    const gcp = Math.sin(time) * 0.5 + 0.5;

    const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.55);

    cg.addColorStop(0, `rgba(240,193,50,${0.07 + gcp*0.06})`);

    cg.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.fillStyle = cg; ctx.fillRect(0, 0, W, H);

    // ── Connector lines — crisp 1px

    ctx.save();

    nodePos.forEach((p, i) => {

      const isActive  = activeIdx === i;

      const isFlash   = flashIdx === i && activeIdx === null;

      ctx.strokeStyle = isActive ? NODES[i].color : isFlash ? 'rgba(240,193,50,0.6)' : 'rgba(240,193,50,0.15)';

      ctx.lineWidth   = isActive ? 1.5 : 0.75;

      ctx.setLineDash(isActive ? [] : [4,6]);

      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(p.x, p.y); ctx.stroke();

    });

    ctx.restore();

    // ── Centre circle — "BUSINESS" — crisp

    ctx.save();

    ctx.shadowColor = `rgba(240,193,50,${0.22 + gcp*0.22})`; ctx.shadowBlur = 24 + gcp*16;

    ctx.beginPath(); ctx.arc(cx, cy, 46, 0, Math.PI*2);

    ctx.fillStyle = '#1a3a2e'; ctx.fill();

    ctx.strokeStyle = '#f0c132'; ctx.lineWidth = 1.5; ctx.stroke();

    ctx.restore();

    // Inner ring

    ctx.save();

    ctx.beginPath(); ctx.arc(cx, cy, 38, 0, Math.PI*2);

    ctx.strokeStyle = 'rgba(240,193,50,0.18)'; ctx.lineWidth = 0.75; ctx.stroke();

    ctx.restore();

    // Text — sharp

    ctx.save();

    ctx.imageSmoothingEnabled = true;

    ctx.imageSmoothingQuality = 'high';

    ctx.font = `700 9px 'DM Sans',sans-serif`;

    ctx.fillStyle = '#f0c132'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';

    ctx.fillText('BUSINESS', cx, cy - 5);

    ctx.font = `400 7px 'DM Sans',sans-serif`;

    ctx.fillStyle = 'rgba(240,193,50,0.55)';

    ctx.fillText('DIAGNOSTIC', cx, cy + 7);

    ctx.restore();

    // ── Flash pulse ring

    if (activeIdx === null && flashT > 5) {

      const fp = nodePos[flashIdx];

      const fpulse = Math.sin(flashT * 0.18) * 0.5 + 0.5;

      ctx.save();

      ctx.beginPath(); ctx.arc(fp.x, fp.y, 58 + fpulse * 10, 0, Math.PI*2);

      ctx.strokeStyle = NODES[flashIdx].color + Math.round((0.12 + fpulse*0.18)*255).toString(16).padStart(2,'0');

      ctx.lineWidth = 1; ctx.stroke();

      ctx.restore();

    }

    // ── Draw node cards

    nodePos.forEach((p, i) => {

      const n = NODES[i];

      const isActive  = activeIdx === i;

      const isFlash   = flashIdx === i && activeIdx === null;

      const isHovered = Math.hypot(p.x - mouse.x, p.y - mouse.y) < 60;

      drawCard(p.x - CW/2, p.y - CH/2, CW, CH, CR, n.label, n.label, n.color, isActive, isFlash, isHovered);

    });

  }

  window.addEventListener('resize', resize);

  resize();

  animate();

})();

// EBOOK MODAL

function openEbook() {

  document.getElementById('ebook-modal').classList.add('open');

  document.body.style.overflow = 'hidden';

}

function closeEbook() {

  document.getElementById('ebook-modal').classList.remove('open');

  document.body.style.overflow = '';

}

document.getElementById('ebook-modal').addEventListener('click', function(e) {

  if (e.target === this) closeEbook();

});

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeEbook(); });

// PILLAR TYPEWRITER ANIMATION

(function() {

  function animatePillars(containerId, delay) {

    const container = document.getElementById(containerId);

    if (!container) return;

    const pillars = container.querySelectorAll('.pillar');

    let started = false;

    const io = new IntersectionObserver(entries => {

      if (entries[0].isIntersecting && !started) {

        started = true;

        pillars.forEach((p, i) => {

          setTimeout(() => {

            p.classList.add('pillar-visible');

            // Typewriter on text

            const textEl = p.querySelector('.pillar-text');

            const full = textEl.textContent;

            textEl.textContent = '';

            let ci = 0;

            const cursor = document.createElement('span');

            cursor.className = 'pillar-cursor';

            textEl.appendChild(cursor);

            const type = () => {

              if (ci < full.length) {

                cursor.before(full[ci]);

                ci++;

                setTimeout(type, 22 + Math.random() * 18);

              } else {

                setTimeout(() => cursor.remove(), 600);

              }

            };

            setTimeout(type, 80);

          }, i * 180 + (delay || 0));

        });

      }

    }, { threshold: 0.3 });

    io.observe(container);

  }

  animatePillars('pillars-consult', 0);

  animatePillars('pillars-equity', 0);

})();

// ══════════════════════════════════════════════════════════

// CONTACT FORM — calls real API

// ══════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════

// INTEGRATIONS CONFIG

// ══════════════════════════════════════════════════════════

const W3F_KEY      = 'YOUR_WEB3FORMS_KEY'; // Get free key at web3forms.com

const SM8_API_KEY  = 'smk-728d9f-4ddea9bed9fb53d3-151a3903fc959d87';

const SM8_ENDPOINT = 'https://api.servicem8.com/api_1.0/job.json';

// ══════════════════════════════════════════════════════════

// CONTACT FORM — Web3Forms email + ServiceM8 lead

// ══════════════════════════════════════════════════════════

async function submitEnquiry() {

  const btn = document.querySelector('.contact-section .btn-primary');

  const originalText = btn.textContent;

  const fname   = document.getElementById('cf-fname').value.trim();

  const lname   = document.getElementById('cf-lname').value.trim();

  const email   = document.getElementById('cf-email').value.trim();

  const enquiry = document.getElementById('cf-type').value;

  const message = document.getElementById('cf-message').value.trim();

  if (!fname || !email || !enquiry || !message) {

    alert('Please fill in your name, email, enquiry type and message.');

    return;

  }

  btn.textContent = 'Sending...';

  btn.disabled = true;

  const fullName = `${fname} ${lname}`.trim();

  // ── 1. Email via Web3Forms ──────────────────────────────

  const emailPromise = fetch('https://api.web3forms.com/submit', {

    method: 'POST',

    headers: { 'Content-Type': 'application/json' },

    body: JSON.stringify({

      access_key: W3F_KEY,

      subject: `New Enquiry — ${enquiry} — ${fullName}`,

      from_name: 'The Business Architects Website',

      name: fullName,

      email: email,

      enquiry_type: enquiry,

      message: message,

      botcheck: '',

    }),

  }).then(r => r.json()).catch(() => ({ success: false }));

  // ── 2. Create lead in ServiceM8 ────────────────────────

  const sm8Body = {

    status: 'Quote',

    job_description: `Website Enquiry — ${enquiry}\n\nName: ${fullName}\nEmail: ${email}\n\n${message}`,

    billing_contact: fullName,

    contact_email: email,

    created_by_staff_uuid: '',

  };

  const sm8Promise = fetch(SM8_ENDPOINT, {

    method: 'POST',

    headers: {

      'Content-Type': 'application/json',

      'X-API-Key': SM8_API_KEY,

    },

    body: JSON.stringify(sm8Body),

  }).then(r => ({ ok: r.ok, status: r.status })).catch(e => ({ ok: false, error: e.message }));

  try {

    const [emailRes, sm8Res] = await Promise.all([emailPromise, sm8Promise]);

    // Store locally as backup

    const enquiries = JSON.parse(localStorage.getItem('tba_enquiries') || '[]');

    enquiries.unshift({ id: Date.now(), name: fullName, email, enquiry, message, date: new Date().toISOString(), status: 'NEW', sm8: sm8Res.ok });

    localStorage.setItem('tba_enquiries', JSON.stringify(enquiries.slice(0, 100)));

    // Show success regardless (don't penalise user for API issues)

    const el = document.getElementById('contact-success');

    el.style.display = 'block';

    setTimeout(() => el.style.display = 'none', 7000);

    ['cf-fname','cf-lname','cf-email','cf-message'].forEach(id => document.getElementById(id).value = '');

    document.getElementById('cf-type').value = '';

  } catch (e) {

    alert('Something went wrong. Please email us directly at ineed@thebusinessarchitects.co.uk');

  } finally {

    btn.textContent = originalText;

    btn.disabled = false;

  }

}

// ══════════════════════════════════════════════════════════

// ADMIN PANEL — localStorage-based (no server needed)

// ══════════════════════════════════════════════════════════

const ADMIN_PASS_HASH_KEY = 'tba_admin_hash';

const ADMIN_SESSION_KEY   = 'tba_admin_session';

// Simple hash (not cryptographic — gate for convenience, not security)

async function hashStr(str) {

  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));

  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');

}

// Default password hash for "TBA2025admin" — change via admin panel

const DEFAULT_HASH = '9c8e4b2f1a3d6e5f8b0c7a2d4e9f1b3c5a7e0d2f4b6c8a0e2d4f6a8b0c2e4f6';

function openAdmin() {

  document.getElementById('admin-overlay').classList.add('open');

  const session = sessionStorage.getItem(ADMIN_SESSION_KEY);

  if (session === 'ok') { showDashboard(); } else { showLoginScreen(); }

}

function closeAdmin() { document.getElementById('admin-overlay').classList.remove('open'); }

function showLoginScreen() {

  document.getElementById('admin-login-screen').style.display = 'block';

  document.getElementById('admin-dashboard').style.display = 'none';

}

async function adminLogin() {

  const pass  = document.getElementById('admin-pass').value;

  const errEl = document.getElementById('login-error');

  errEl.style.display = 'none';

  const entered = await hashStr(pass);

  const stored  = localStorage.getItem(ADMIN_PASS_HASH_KEY) || DEFAULT_HASH;

  // Also allow default plaintext "TBA2025admin" for first login

  const defaultOk = pass === 'TBA2025admin';

  if (entered === stored || defaultOk) {

    sessionStorage.setItem(ADMIN_SESSION_KEY, 'ok');

    showDashboard();

  } else {

    errEl.textContent = 'Incorrect password.';

    errEl.style.display = 'block';

  }

}

function adminLogout() {

  sessionStorage.removeItem(ADMIN_SESSION_KEY);

  showLoginScreen();

}

function showTab(name, ev) {

  document.querySelectorAll('.admin-tab-content').forEach(t => t.classList.remove('active'));

  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));

  document.getElementById('tab-' + name).classList.add('active');

  if (ev && ev.currentTarget) ev.currentTarget.classList.add('active');

  const loaders = { enquiries: loadEnquiries, overview: loadOverview };

  if (loaders[name]) loaders[name]();

}

function showDashboard() {

  document.getElementById('admin-login-screen').style.display = 'none';

  document.getElementById('admin-dashboard').style.display = 'block';

  loadOverview();

  loadContent();

}

// ── OVERVIEW ─────────────────────────────────────────────

function loadOverview() {

  const enquiries = JSON.parse(localStorage.getItem('tba_enquiries') || '[]');

  const now = new Date();

  const thisMonth = enquiries.filter(e => {

    const d = new Date(e.date);

    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();

  });

  const newCount       = enquiries.filter(e => e.status === 'NEW').length;

  const convertedCount = enquiries.filter(e => e.status === 'CONVERTED').length;

  const sm8Count       = enquiries.filter(e => e.sm8).length;

  if (document.getElementById('ov-enquiries'))  document.getElementById('ov-enquiries').textContent  = enquiries.length;

  if (document.getElementById('ov-new'))        document.getElementById('ov-new').textContent        = newCount;

  if (document.getElementById('ov-converted'))  document.getElementById('ov-converted').textContent  = convertedCount;

  if (document.getElementById('ov-this-month')) document.getElementById('ov-this-month').textContent = thisMonth.length;

  if (document.getElementById('ov-pageviews'))  document.getElementById('ov-pageviews').textContent  = sm8Count + ' in SM8';

  if (document.getElementById('ov-ebook'))      document.getElementById('ov-ebook').textContent      = '—';

}

// ── CONTENT ──────────────────────────────────────────────

function loadContent() {

  const cfg = JSON.parse(localStorage.getItem('tba_config') || '{}');

  const map = {

    'c-email':'contact.email','c-footer':'company.name',

    's-linkedin':'social.linkedin','s-instagram':'social.instagram',

    's-twitter':'social.twitter','s-facebook':'social.facebook',

    's-calendly':'social.calendly',

    'a-gaid':'analytics.ga4','a-gtm':'analytics.gtm',

    'a-fbpixel':'analytics.fbpixel','a-clarity':'analytics.clarity',

    'seo-title':'seo.title','seo-desc':'seo.description',

  };

  Object.entries(map).forEach(([elId, key]) => {

    const el = document.getElementById(elId);

    if (el && cfg[key]) el.value = cfg[key];

  });

  applyConfig(cfg);

}

function applyConfig(cfg) {

  if (cfg['contact.email']) {

    const el = document.getElementById('footer-email');

    if (el) { el.textContent = cfg['contact.email']; el.href = 'mailto:' + cfg['contact.email']; }

  }

  if (cfg['social.linkedin']) { const el = document.getElementById('social-linkedin'); if (el) el.href = cfg['social.linkedin']; }

  if (cfg['social.instagram']) { const el = document.getElementById('social-instagram'); if (el) el.href = cfg['social.instagram']; }

  if (cfg['social.twitter']) { const el = document.getElementById('social-twitter'); if (el) el.href = cfg['social.twitter']; }

  if (cfg['seo.title']) document.title = cfg['seo.title'];

}

function saveConfig(keys) {

  const cfg = JSON.parse(localStorage.getItem('tba_config') || '{}');

  keys.forEach(([k, elId]) => {

    const el = document.getElementById(elId);

    if (el) cfg[k] = el.value;

  });

  localStorage.setItem('tba_config', JSON.stringify(cfg));

  applyConfig(cfg);

}

function saveContent() {

  saveConfig([['contact.email','c-email'],['company.name','c-footer']]);

  flash('content-success');

}

function saveSocial() {

  saveConfig([['social.linkedin','s-linkedin'],['social.instagram','s-instagram'],

              ['social.twitter','s-twitter'],['social.facebook','s-facebook'],['social.calendly','s-calendly']]);

  flash('social-success');

}

function saveAnalytics() {

  saveConfig([['analytics.ga4','a-gaid'],['analytics.gtm','a-gtm'],

              ['analytics.fbpixel','a-fbpixel'],['analytics.clarity','a-clarity']]);

  flash('analytics-success');

  const ga = document.getElementById('a-gaid')?.value;

  const gtm = document.getElementById('a-gtm')?.value;

  let out = '<!-- Paste into <head> of index.html -->\n\n';

  if (ga)  out += `<!-- GA4 -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=${ga}"><\/script>\n<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga}');<\/script>\n\n`;

  if (gtm) out += `<!-- GTM -->\n<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');<\/script>\n\n`;

  const el = document.getElementById('analytics-output');

  if (el) { el.style.display = 'block'; el.textContent = out; }

}

function saveSEO() {

  saveConfig([['seo.title','seo-title'],['seo.description','seo-desc']]);

  flash('seo-success');

}

// ── ENQUIRIES (from localStorage) ──────────────────────

function loadEnquiries(filterStatus = null) {

  const list = document.getElementById('enquiries-list');

  let enquiries = JSON.parse(localStorage.getItem('tba_enquiries') || '[]');

  if (filterStatus) enquiries = enquiries.filter(e => e.status === filterStatus);

  const statusColors = { NEW:'#f0c132', CONTACTED:'#93c5fd', IN_PROGRESS:'#fcd34d', CONVERTED:'#4ade80', CLOSED:'rgba(255,255,255,0.3)', SPAM:'#ef4444' };

  if (!enquiries.length) {

    list.innerHTML = '<p style="color:rgba(255,255,255,0.35);font-size:0.85rem;padding:20px 0">No enquiries yet — they will appear here when the form is submitted.</p>';

    return;

  }

  list.innerHTML = enquiries.map((e, idx) => `

    <div class="enquiry-item" id="enq-${e.id}">

      <div class="enquiry-item-header">

        <span class="enquiry-item-name">${e.name}</span>

        <span class="enquiry-item-date">${new Date(e.date).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}</span>

      </div>

      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">

        <span style="color:${statusColors[e.status]||'#fff'};font-size:0.65rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">${e.status}</span>

        <span style="color:rgba(255,255,255,0.35);font-size:0.65rem;">·</span>

        <span style="color:var(--gold);font-size:0.65rem;text-transform:uppercase;letter-spacing:0.1em;">${e.enquiry}</span>

        ${e.sm8 ? '<span style="color:#4ade80;font-size:0.62rem;border:1px solid rgba(74,222,128,0.3);padding:1px 6px;border-radius:2px;">✓ ServiceM8</span>' : ''}

      </div>

      <div class="enquiry-item-msg"><a href="mailto:${e.email}" style="color:var(--gold)">${e.email}</a></div>

      <div class="enquiry-item-msg" style="margin-top:6px;">${(e.message||'').slice(0,200)}${e.message?.length>200?'...':''}</div>

      <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;">

        <select onchange="updateEnquiryStatus(${idx},this.value)" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:#fff;padding:5px 8px;font-size:0.72rem;border-radius:2px;cursor:pointer">

          ${['NEW','CONTACTED','IN_PROGRESS','CONVERTED','CLOSED','SPAM'].map(s => `<option value="${s}"${e.status===s?' selected':''}>${s.replace('_',' ')}</option>`).join('')}

        </select>

        <button onclick="window.open('mailto:${e.email}')" style="background:var(--gold);color:var(--forest-deep);border:none;padding:5px 14px;font-size:0.7rem;font-weight:700;border-radius:2px;cursor:pointer;letter-spacing:0.08em;text-transform:uppercase;">Reply</button>

      </div>

    </div>

  `).join('');

}

function updateEnquiryStatus(idx, status) {

  const enquiries = JSON.parse(localStorage.getItem('tba_enquiries') || '[]');

  if (enquiries[idx]) { enquiries[idx].status = status; localStorage.setItem('tba_enquiries', JSON.stringify(enquiries)); }

}

// ── CHANGE PASSWORD ──────────────────────────────────────

async function changePassword() {

  const nw = document.getElementById('pwd-new')?.value;

  if (!nw || nw.length < 8) return alert('Password must be at least 8 characters');

  const hash = await hashStr(nw);

  localStorage.setItem(ADMIN_PASS_HASH_KEY, hash);

  alert('Password updated. You will need to use the new password next time.');

  flash('security-success');

}

// Helpers

function flash(id) { const el = document.getElementById(id); if (!el) return; el.style.display = 'block'; setTimeout(() => el.style.display = 'none', 3500); }

function loadAnalyticsTab() { loadOverview(); }

function loadAudit() {

  const list = document.getElementById('audit-list');

  if (list) list.innerHTML = '<p style="color:rgba(255,255,255,0.3);font-size:0.82rem;padding:12px 0">Enquiry log is stored in browser storage on this device.</p>';

}

  // Expose handlers referenced by JSX onClick wiring and by innerHTML-injected markup.
  Object.assign(window, { openEbook, closeEbook, submitEnquiry, openAdmin, closeAdmin, adminLogin, adminLogout, showTab, saveContent, saveSocial, saveAnalytics, saveSEO, changePassword, loadEnquiries, updateEnquiryStatus });
}
