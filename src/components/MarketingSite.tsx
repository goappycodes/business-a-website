"use client";

import { useEffect, useRef } from "react";
import { BROCHURE_HTML } from "@/lib/brochure";
import { initMarketingSite } from "@/lib/site-runtime";

// Handlers live in the ported runtime (site-runtime.js) and are attached to
// `window` on mount. Declaring them here keeps the JSX onClick wiring type-safe.
declare global {
  interface Window {
    openEbook: () => void;
    closeEbook: () => void;
    submitEnquiry: () => void;
    openAdmin: () => void;
    closeAdmin: () => void;
    adminLogin: () => void;
    adminLogout: () => void;
    showTab: (name: string, ev?: unknown) => void;
    saveContent: () => void;
    saveSocial: () => void;
    saveAnalytics: () => void;
    saveSEO: () => void;
    changePassword: () => void;
    loadEnquiries: (status?: string | null) => void;
    updateEnquiryStatus: (idx: number, status: string) => void;
  }
}

export default function MarketingSite() {
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current) return;
    inited.current = true;
    initMarketingSite();
  }, []);

  return (
    <>
      <div className="cursor" id="cursor"></div>
      <div className="cursor-ring" id="cursor-ring"></div>

      <nav id="navbar">
        <a href="#home" className="nav-logo">
          <div className="nav-logo-text">
            The Business
            <br />
            Architects
          </div>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#consult">Our Services</a>
          </li>
          <li>
            <a href="#framework">Framework</a>
          </li>
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.openEbook();
              }}
            >
              Our Brochure
            </a>
          </li>
          <li>
            <a href="#contact" className="nav-cta">
              Book a Call
            </a>
          </li>
        </ul>
      </nav>

      <section className="hero" id="home">
        <div className="hero-bg"></div>
        <div className="hero-grid"></div>
        <div className="hero-content">
          <div className="hero-eyebrow">The Business Architects</div>
          <h1 className="hero-title">
            We Build,
            <br />
            <em>Transform</em>
            <br />
            &amp; Implement.
          </h1>
          <p className="hero-sub">
            We work with business owners who have built something real. Whether
            you need a trusted partner to implement AI, drive transformation, or
            explore a performance-based equity engagement — we are operators, AI
            specialists and growth partners. Not brokers. Not advisors.
          </p>
          <div className="hero-actions">
            <a href="#consult" className="btn-primary">
              Our Services
            </a>
            <a href="#contact" className="btn-outline">
              Book a Discovery Call
            </a>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-num">AI</div>
            <div className="stat-label">Led &amp; Operator Driven</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">2</div>
            <div className="stat-label">Ways to Partner</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">0</div>
            <div className="stat-label">Retainer Fees</div>
          </div>
        </div>
      </section>

      <div className="services-split" id="services">
        <div className="service-panel" id="consult">
          <div className="service-panel-bg"></div>
          <div className="panel-num">01</div>
          <div className="service-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="subtitle">Service One</div>
          <h2>
            Business
            <br />
            <em>Consultancy</em>
          </h2>
          <p>
            You have built something worth investing in. We bring senior
            operational expertise, fresh perspective, and structured execution —
            working inside your business to improve performance, reduce
            inefficiency, and build the foundations for lasting growth. Retained
            or project-based. Results-led. Straightforward.
          </p>
          <div className="service-pillars" id="pillars-consult">
            <div className="pillar">
              <span className="pillar-num">01</span>
              <span className="pillar-text">
                Operational review &amp; deep business diagnosis
              </span>
              <span className="pillar-bar"></span>
            </div>
            <div className="pillar">
              <span className="pillar-num">02</span>
              <span className="pillar-text">
                Rebuild systems so the business scales without you
              </span>
              <span className="pillar-bar"></span>
            </div>
            <div className="pillar">
              <span className="pillar-num">03</span>
              <span className="pillar-text">
                AI integration to cut costs &amp; accelerate workflows
              </span>
              <span className="pillar-bar"></span>
            </div>
            <div className="pillar">
              <span className="pillar-num">04</span>
              <span className="pillar-text">
                Revenue &amp; marketing systems that compound over time
              </span>
              <span className="pillar-bar"></span>
            </div>
            <div className="pillar">
              <span className="pillar-num">05</span>
              <span className="pillar-text">
                Leadership development &amp; team structure
              </span>
              <span className="pillar-bar"></span>
            </div>
            <div className="pillar">
              <span className="pillar-num">06</span>
              <span className="pillar-text">
                Clear roadmap, honest counsel, measurable milestones
              </span>
              <span className="pillar-bar"></span>
            </div>
          </div>
          <a href="#contact" className="btn-primary">
            Start a Conversation →
          </a>
        </div>

        <div className="service-panel" id="equity">
          <div className="service-panel-bg"></div>
          <div className="panel-num">02</div>
          <div className="service-icon">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
              <path d="M8 12h4" />
            </svg>
          </div>
          <div className="subtitle">Service Two</div>
          <h2>
            Strategic
            <br />
            <em>Partnerships</em>
          </h2>
          <p>
            For businesses where the opportunity is clear but the AI
            infrastructure, expertise, or execution capacity are not yet in place
            — we engage on a performance-based equity basis. No retainers. No
            upfront fees. We embed AI systems, automation and operational
            capability directly into your business. Our return is tied entirely to
            yours.
          </p>
          <div className="service-pillars" id="pillars-equity">
            <div className="pillar">
              <span className="pillar-num">01</span>
              <span className="pillar-text">
                AI implementation — systems built for your business, not
                off-the-shelf
              </span>
              <span className="pillar-bar"></span>
            </div>
            <div className="pillar">
              <span className="pillar-num">02</span>
              <span className="pillar-text">
                Expertise, execution &amp; operational capability deployed in full
              </span>
              <span className="pillar-bar"></span>
            </div>
            <div className="pillar">
              <span className="pillar-num">03</span>
              <span className="pillar-text">
                Growth, transformation &amp; operational improvement
              </span>
              <span className="pillar-bar"></span>
            </div>
            <div className="pillar">
              <span className="pillar-num">04</span>
              <span className="pillar-text">
                End-to-end AI build, deployment &amp; ongoing optimisation
              </span>
              <span className="pillar-bar"></span>
            </div>
            <div className="pillar">
              <span className="pillar-num">05</span>
              <span className="pillar-text">
                Skin in the game — we are partners, not advisors
              </span>
              <span className="pillar-bar"></span>
            </div>
            <div className="pillar">
              <span className="pillar-num">06</span>
              <span className="pillar-text">
                Select engagements only — we go deep or not at all
              </span>
              <span className="pillar-bar"></span>
            </div>
          </div>
          <a href="#contact" className="btn-primary">
            Apply for Partnership →
          </a>
        </div>
      </div>

      {/* EBOOK SECTION */}
      <section className="ebook-section">
        <div className="section-inner">
          <div className="ebook-inner">
            <div className="ebook-left reveal">
              <div className="section-label">Our Brochure</div>
              <h2>
                Read Our
                <br />
                Strategic
                <br />
                <em>Partnership Guide</em>
              </h2>
              <p>
                Everything you need to know about how we work, what we look for,
                and what partnering with The Business Architects actually looks
                like — in one interactive document.
              </p>
              <button
                className="ebook-open-btn"
                onClick={() => window.openEbook()}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
                Open the Brochure
              </button>
            </div>
            <div className="ebook-right reveal reveal-delay-2">
              <div className="ebook-preview" onClick={() => window.openEbook()}>
                <iframe
                  srcDoc={BROCHURE_HTML}
                  title="The Business Architects — Strategic Partnership Guide"
                  tabIndex={-1}
                  aria-hidden="true"
                ></iframe>
                <div className="ebook-click-overlay">
                  <div className="ebook-click-badge">
                    <svg viewBox="0 0 24 24">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                    Click to Open &amp; Explore
                  </div>
                </div>
              </div>
              <div className="ebook-label">
                Interactive Brochure — Click to Flip
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EBOOK MODAL */}
      <div id="ebook-modal">
        <div className="ebook-modal-inner">
          <button
            className="ebook-modal-close"
            onClick={() => window.closeEbook()}
          >
            ✕
          </button>
          <iframe
            srcDoc={BROCHURE_HTML}
            title="The Business Architects Brochure"
            id="ebook-modal-frame"
          ></iframe>
          <div className="ebook-modal-hint">
            Click right side to turn forward · Left side to go back · Esc to close
          </div>
        </div>
      </div>

      <section className="mindmap-section" id="framework">
        <div className="section-inner">
          <div className="mindmap-header reveal">
            <div className="section-label">Problem Framework</div>
            <h2 className="section-title">
              Where We Find the
              <br />
              <em>Opportunities</em>
            </h2>
            <p>
              Every business hides its problems in the same places. Tap any
              rotating node to stop it and reveal the bottleneck — with the
              solution below.
            </p>
          </div>
        </div>
        <div className="mindmap-orbit-wrap">
          <canvas id="mindmap-canvas"></canvas>
        </div>
        <div className="mindmap-panel-area">
          <div className="mm-idle-hint" id="mm-idle-hint">
            ↑ Tap a node to explore bottlenecks &amp; solutions
          </div>
          <div className="mm-active-label" id="mm-active-label"></div>
          <div className="mm-cards" id="mm-cards">
            <div className="mm-card problem" id="mm-prob-card">
              <div className="mm-card-tag">
                <span className="dot"></span>Problem
              </div>
              <h3 id="mm-prob-title"></h3>
              <ul id="mm-prob-list"></ul>
            </div>
            <div className="mm-card solution" id="mm-sol-card">
              <div className="mm-card-tag">
                <span className="dot"></span>Solution
              </div>
              <h3 id="mm-sol-title"></h3>
              <ul id="mm-sol-list"></ul>
            </div>
          </div>
          <div className="mm-close-hint" id="mm-close-hint">
            Tap node again or tap anywhere to resume rotation
          </div>
        </div>
      </section>

      <section className="equity-section" id="partnership-detail">
        <div className="section-inner">
          <div className="equity-inner">
            <div className="equity-left reveal">
              <div className="section-label">Strategic Partnerships</div>
              <h2 className="section-title">
                AI-Led.
                <br />
                <em>Performance-Based.</em>
                <br />
                Fully Committed.
              </h2>
              <div className="gold-divider"></div>
              <p>
                This is not a software subscription or a generic AI tool. This is
                a partnership — where we build, implement and run AI systems inside
                your business, taking on real risk alongside you. We bring
                expertise, execution, and our full network to bear. In exchange,
                we take a stake in the outcome. No fees. No padding. No months of
                reports that lead nowhere.
              </p>
              <p>
                We work with select businesses where the fundamentals are strong
                but AI has not yet been properly implemented. Automation,
                intelligent workflows, AI-powered customer experience, product
                development — we build it all. If that sounds like your business,
                we want to hear from you.
              </p>
              <div className="equity-quote">
                <p>
                  &quot;Business is complex. Many are run in an outdated way —
                  multiple points of failure, no automation, key-man
                  dependencies. We use AI to change all of that permanently.&quot;
                </p>
              </div>
              <a href="#contact" className="btn-primary">
                Apply for Partnership →
              </a>
            </div>

            <div className="equity-right reveal reveal-delay-2">
              <div className="equity-services">
                <div className="equity-service">
                  <h4>
                    Strategy &amp; Operations <span>→</span>
                  </h4>
                  <p>
                    Business is complex and many are run in an outdated,
                    unmonitored way — leading to multiple points of failure,
                    inefficiencies and key-man dependencies. We map, document and
                    rebuild the operational foundation of your business so it runs
                    properly without you in every room.
                  </p>
                </div>
                <div className="equity-service">
                  <h4>
                    AI Integration &amp; Workflow <span>→</span>
                  </h4>
                  <p>
                    We identify exactly where AI and automation deliver real
                    commercial return in your business — reducing payroll
                    overhead, cutting repetitive tasks, and accelerating
                    workflows. Not as a trend. As a tool that makes your business
                    cheaper to run and faster to scale.
                  </p>
                </div>
                <div className="equity-service">
                  <h4>
                    Sales, Operations &amp; Marketing <span>→</span>
                  </h4>
                  <p>
                    Our founder has grown business revenues to multi-million pound
                    turnovers across sectors. We deploy proven revenue generation
                    frameworks, structured sales processes and marketing systems
                    that create compounding returns — not one-off spikes.
                  </p>
                </div>
                <div className="equity-service">
                  <h4>
                    Brand Building &amp; Growth <span>→</span>
                  </h4>
                  <p>
                    Our founder has been part of multiple brands — creating,
                    monetising and scaling them, as well as setting up remote
                    operations internationally. We have expert marketers on the
                    team who are current on every growth channel and know how to
                    turn spend into revenue.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="section-inner">
          <div
            className="reveal"
            style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 0" }}
          >
            <div className="section-label">Our Process</div>
            <h2 className="section-title">
              Simple.
              <br />
              <em>Straightforward.</em>
              <br />
              No Surprises.
            </h2>
          </div>
          <div className="process-steps">
            <div className="step reveal reveal-delay-1">
              <div className="step-num">01</div>
              <h3>Discovery Call</h3>
              <p>
                Confidential. No obligation. We want to understand your business,
                where it is today, and what you want from the next chapter. 30
                minutes. Completely private.
              </p>
            </div>
            <div className="step reveal reveal-delay-2">
              <div className="step-num">02</div>
              <h3>Business Review</h3>
              <p>
                We go deep — financials, operations, team, market position, and
                growth potential. We tell you what we see, honestly, including
                where we think the ceiling is and what&apos;s causing it.
              </p>
            </div>
            <div className="step reveal reveal-delay-3">
              <div className="step-num">03</div>
              <h3>Clear Proposal</h3>
              <p>
                We come back with a clear, written proposal — whether that is a
                consultancy engagement or a performance-based equity partnership
                structure. No vague language, no hidden conditions. You know
                exactly what you&apos;re agreeing to.
              </p>
            </div>
            <div className="step reveal reveal-delay-4">
              <div className="step-num">04</div>
              <h3>We Get to Work</h3>
              <p>
                Whether we&apos;re consulting or partnering on equity, we move
                decisively. We start delivering immediately — and you will see the
                difference quickly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="quote-band">
        <blockquote>
          &quot;We must all obey the great law of change. It is the most powerful
          law of nature.&quot;
        </blockquote>
        <cite>— Edmund Burke</cite>
      </div>

      <section className="contact-section" id="contact">
        <div className="section-inner">
          <div className="contact-inner">
            <div className="contact-info reveal">
              <div className="section-label">Get In Touch</div>
              <h2>
                Let&apos;s Talk
                <br />
                About AI &amp;
                <br />
                <em>Your Business.</em>
              </h2>
              <p>
                Whether you want to implement AI in your business, explore a
                performance-based equity partnership, or simply understand what
                working with us looks like — we offer a no-obligation discovery
                call. We&apos;ll be straight with you about whether we&apos;re the
                right fit.
              </p>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.32)",
                  fontWeight: 300,
                  marginBottom: "40px",
                  marginTop: "-20px",
                }}
              >
                Everything discussed is strictly confidential.
              </p>
              <div className="contact-details">
                <div className="contact-detail">
                  <div className="contact-detail-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div className="contact-detail-text">
                    <span>Email</span>
                    <a
                      href="mailto:ineed@thebusinessarchitects.co.uk"
                      id="footer-email"
                    >
                      ineed@thebusinessarchitects.co.uk
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form reveal reveal-delay-2">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder="Your first name"
                    id="cf-fname"
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder="Your last name"
                    id="cf-lname"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="your@email.com" id="cf-email" />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="+44..." id="cf-phone" />
              </div>
              <div className="form-group">
                <label>What brings you to us?</label>
                <select id="cf-type" defaultValue="">
                  <option value="">Select an option...</option>
                  <option>I want to implement AI in my business</option>
                  <option>I want to explore a strategic AI partnership</option>
                  <option>I want to understand my options first</option>
                  <option>General Enquiry</option>
                </select>
              </div>
              <div className="form-group">
                <label>Tell us about your business</label>
                <textarea
                  rows={5}
                  placeholder="A brief overview — your industry, how long you've been trading, what you're looking to achieve, and anything else that feels relevant..."
                  id="cf-message"
                ></textarea>
              </div>
              <button
                className="btn-primary"
                onClick={() => window.submitEnquiry()}
                style={{ width: "100%", textAlign: "center" }}
              >
                Send Enquiry →
              </button>
              <div className="admin-success" id="contact-success">
                Thank you — we&apos;ll be in touch within 24 hours.
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-logo">
            <span
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "0.95rem",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              The Business Architects
            </span>
          </div>
          <nav className="footer-nav">
            <a href="#consult">Services</a>
            <a href="#framework">Framework</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="footer-copy">
            © 2025 The Business Architects. All rights reserved. | Registered in
            England &amp; Wales |{" "}
            <a
              href="https://thebaholdings.co.uk"
              target="_blank"
              style={{
                color: "rgba(240,193,50,0.4)",
                textDecoration: "none",
                transition: "color .3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "#f0c132";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "rgba(240,193,50,0.4)";
              }}
            >
              TBA Holdings →
            </a>
          </div>
        </div>
      </footer>

      <button
        id="admin-trigger"
        title="Admin Panel"
        onClick={() => window.openAdmin()}
      >
        ⚙
      </button>

      <div id="admin-overlay">
        {/* LOGIN SCREEN */}
        <div id="admin-login-screen" className="admin-panel">
          <div className="admin-header">
            <h1>Admin Access</h1>
            <button className="admin-close" onClick={() => window.closeAdmin()}>
              ✕
            </button>
          </div>
          <div className="admin-login">
            <h2>Welcome Back</h2>
            <p>Sign in to manage your site</p>
            <div className="admin-login-form">
              <input
                type="password"
                placeholder="Admin password"
                id="admin-pass"
                autoComplete="current-password"
                onKeyDown={(e) => {
                  if (e.key === "Enter") window.adminLogin();
                }}
              />
              <button
                className="btn-primary"
                onClick={() => window.adminLogin()}
                style={{ width: "100%" }}
              >
                Access Dashboard
              </button>
              <p
                id="login-error"
                style={{
                  color: "#ef4444",
                  fontSize: "0.8rem",
                  display: "none",
                  marginTop: "4px",
                }}
              ></p>
              <p
                style={{
                  color: "rgba(255,255,255,0.2)",
                  fontSize: "0.72rem",
                  textAlign: "center",
                  marginTop: "8px",
                }}
              >
                Default: TBA2025admin — change in Security tab
              </p>
            </div>
          </div>
        </div>

        {/* DASHBOARD */}
        <div
          id="admin-dashboard"
          className="admin-panel"
          style={{ display: "none" }}
        >
          <div className="admin-header">
            <h1>Dashboard</h1>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <span
                id="admin-name-badge"
                style={{
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.08em",
                }}
              ></span>
              <button
                className="admin-close"
                onClick={() => window.adminLogout()}
                title="Logout"
                style={{ fontSize: "0.7rem", width: "auto", padding: "0 14px" }}
              >
                Logout
              </button>
              <button
                className="admin-close"
                onClick={() => window.closeAdmin()}
              >
                ✕
              </button>
            </div>
          </div>

          <div className="admin-tabs">
            <button
              className="admin-tab active"
              onClick={(e) => window.showTab("overview", e)}
            >
              Overview
            </button>
            <button
              className="admin-tab"
              onClick={(e) => window.showTab("enquiries", e)}
            >
              Enquiries
            </button>
            <button
              className="admin-tab"
              onClick={(e) => window.showTab("content", e)}
            >
              Content
            </button>
            <button
              className="admin-tab"
              onClick={(e) => window.showTab("social", e)}
            >
              Social
            </button>
            <button
              className="admin-tab"
              onClick={(e) => window.showTab("analytics", e)}
            >
              Analytics
            </button>
            <button
              className="admin-tab"
              onClick={(e) => window.showTab("seo", e)}
            >
              SEO
            </button>
            <button
              className="admin-tab"
              onClick={(e) => window.showTab("security", e)}
            >
              Security
            </button>
            <button
              className="admin-tab"
              onClick={(e) => window.showTab("audit", e)}
            >
              Audit Log
            </button>
          </div>

          {/* OVERVIEW */}
          <div id="tab-overview" className="admin-tab-content active">
            <p className="admin-section-title">Site Overview</p>
            <div className="analytics-grid">
              <div className="analytics-card">
                <div className="metric" id="ov-enquiries">
                  —
                </div>
                <div className="metric-label">Total Enquiries</div>
              </div>
              <div className="analytics-card">
                <div className="metric" id="ov-new">
                  —
                </div>
                <div className="metric-label">New (unread)</div>
              </div>
              <div className="analytics-card">
                <div className="metric" id="ov-converted">
                  —
                </div>
                <div className="metric-label">Converted</div>
              </div>
              <div className="analytics-card">
                <div className="metric" id="ov-this-month">
                  —
                </div>
                <div className="metric-label">This Month</div>
              </div>
              <div className="analytics-card">
                <div className="metric" id="ov-pageviews">
                  —
                </div>
                <div className="metric-label">Page Views (30d)</div>
              </div>
              <div className="analytics-card">
                <div className="metric" id="ov-ebook">
                  —
                </div>
                <div className="metric-label">Brochure Opens (30d)</div>
              </div>
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: "0.8rem",
                lineHeight: 1.7,
                marginTop: "8px",
              }}
            >
              All data is live from your database. Enquiries are stored
              server-side and emailed to you on submission. Analytics track page
              views, CTA clicks and brochure opens.
            </p>
          </div>

          {/* ENQUIRIES */}
          <div id="tab-enquiries" className="admin-tab-content">
            <p className="admin-section-title">Contact Enquiries</p>
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                marginBottom: "18px",
              }}
            >
              <button
                onClick={() => window.loadEnquiries(null)}
                style={{
                  background: "rgba(240,193,50,0.12)",
                  border: "1px solid rgba(240,193,50,0.3)",
                  color: "var(--gold)",
                  padding: "6px 14px",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
              >
                All
              </button>
              <button
                onClick={() => window.loadEnquiries("NEW")}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  padding: "6px 14px",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
              >
                New
              </button>
              <button
                onClick={() => window.loadEnquiries("CONTACTED")}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  padding: "6px 14px",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
              >
                Contacted
              </button>
              <button
                onClick={() => window.loadEnquiries("IN_PROGRESS")}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  padding: "6px 14px",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
              >
                In Progress
              </button>
              <button
                onClick={() => window.loadEnquiries("CONVERTED")}
                style={{
                  background: "rgba(74,222,128,0.1)",
                  border: "1px solid rgba(74,222,128,0.25)",
                  color: "#4ade80",
                  padding: "6px 14px",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
              >
                Converted
              </button>
              <button
                onClick={() => window.loadEnquiries("SPAM")}
                style={{
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  color: "#ef4444",
                  padding: "6px 14px",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
              >
                Spam
              </button>
            </div>
            <div id="enquiries-list"></div>
          </div>

          {/* CONTENT */}
          <div id="tab-content" className="admin-tab-content">
            <p className="admin-section-title">Site Content</p>
            <div className="admin-field">
              <label>Contact Email</label>
              <input
                type="email"
                id="c-email"
                placeholder="hello@thebusinessarchitects.co.uk"
              />
            </div>
            <div className="admin-field">
              <label>Contact Phone</label>
              <input type="text" id="c-phone" placeholder="+44 (0)..." />
            </div>
            <div className="admin-field">
              <label>Footer / Company Name</label>
              <input
                type="text"
                id="c-footer"
                placeholder="The Business Architects"
              />
            </div>
            <button className="admin-save" onClick={() => window.saveContent()}>
              Save Content
            </button>
            <div className="admin-success" id="content-success">
              Saved — changes are live.
            </div>
          </div>

          {/* SOCIAL */}
          <div id="tab-social" className="admin-tab-content">
            <p className="admin-section-title">Social Media &amp; Links</p>
            <div className="admin-field">
              <label>LinkedIn URL</label>
              <input
                type="url"
                id="s-linkedin"
                placeholder="https://linkedin.com/company/..."
              />
            </div>
            <div className="admin-field">
              <label>Instagram URL</label>
              <input
                type="url"
                id="s-instagram"
                placeholder="https://instagram.com/..."
              />
            </div>
            <div className="admin-field">
              <label>Twitter / X URL</label>
              <input type="url" id="s-twitter" placeholder="https://x.com/..." />
            </div>
            <div className="admin-field">
              <label>Facebook URL</label>
              <input
                type="url"
                id="s-facebook"
                placeholder="https://facebook.com/..."
              />
            </div>
            <div className="admin-field">
              <label>Calendly / Booking Link</label>
              <input
                type="url"
                id="s-calendly"
                placeholder="https://calendly.com/..."
              />
            </div>
            <button className="admin-save" onClick={() => window.saveSocial()}>
              Save Links
            </button>
            <div className="admin-success" id="social-success">
              Links saved.
            </div>
          </div>

          {/* ANALYTICS */}
          <div id="tab-analytics" className="admin-tab-content">
            <p className="admin-section-title">Analytics Integration</p>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.82rem",
                lineHeight: 1.7,
                marginBottom: "20px",
              }}
            >
              Add your tracking IDs below. Save, then copy the generated scripts
              into the &lt;head&gt; of index.html on your server.
            </p>
            <div className="admin-field">
              <label>Google Analytics 4 — Measurement ID</label>
              <input type="text" id="a-gaid" placeholder="G-XXXXXXXXXX" />
            </div>
            <div className="admin-field">
              <label>Google Tag Manager ID</label>
              <input type="text" id="a-gtm" placeholder="GTM-XXXXXXX" />
            </div>
            <div className="admin-field">
              <label>Facebook Pixel ID</label>
              <input type="text" id="a-fbpixel" placeholder="XXXXXXXXXXXXXXXX" />
            </div>
            <div className="admin-field">
              <label>Microsoft Clarity ID</label>
              <input type="text" id="a-clarity" placeholder="xxxxxxxxxx" />
            </div>
            <button className="admin-save" onClick={() => window.saveAnalytics()}>
              Save &amp; Generate Scripts
            </button>
            <div className="admin-success" id="analytics-success">
              Saved. Copy the scripts below into your &lt;head&gt; tag.
            </div>
            <div
              id="analytics-output"
              style={{
                background: "rgba(0,0,0,0.35)",
                padding: "18px",
                borderRadius: "2px",
                marginTop: "16px",
                fontFamily: "monospace",
                fontSize: "0.73rem",
                color: "#a0d4b0",
                whiteSpace: "pre-wrap",
                display: "none",
                border: "1px solid rgba(160,212,176,0.15)",
              }}
            ></div>
          </div>

          {/* SEO */}
          <div id="tab-seo" className="admin-tab-content">
            <p className="admin-section-title">SEO &amp; Meta Tags</p>
            <div className="admin-field">
              <label>Page Title</label>
              <input
                type="text"
                id="seo-title"
                placeholder="The Business Architects | Business Consultancy &amp; Strategic Partnerships UK"
              />
            </div>
            <div className="admin-field">
              <label>Meta Description</label>
              <textarea
                id="seo-desc"
                rows={3}
                placeholder="AI implementation, strategic partnerships and business transformation — worldwide. The Business Architects."
              ></textarea>
            </div>
            <div className="admin-field">
              <label>OG Image URL (social share thumbnail)</label>
              <input type="url" id="seo-og" placeholder="https://..." />
            </div>
            <button className="admin-save" onClick={() => window.saveSEO()}>
              Save SEO
            </button>
            <div className="admin-success" id="seo-success">
              SEO settings saved.
            </div>
          </div>

          {/* SECURITY */}
          <div id="tab-security" className="admin-tab-content">
            <p className="admin-section-title">Security &amp; Account</p>
            <div
              style={{
                background: "rgba(240,193,50,0.06)",
                border: "1px solid rgba(240,193,50,0.15)",
                padding: "22px 24px",
                borderRadius: "2px",
                marginBottom: "28px",
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "var(--gold)",
                  marginBottom: "8px",
                }}
              >
                Change Password
              </div>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.7,
                  marginBottom: "18px",
                  fontWeight: 300,
                }}
              >
                Set a new admin password. Stored securely in your browser on this
                device.
              </p>
              <div className="admin-field">
                <label>New Password</label>
                <input
                  type="password"
                  id="pwd-new"
                  placeholder="Min. 8 characters"
                />
              </div>
              <button
                className="admin-save"
                onClick={() => window.changePassword()}
              >
                Update Password
              </button>
              <div className="admin-success" id="security-success">
                Password updated.
              </div>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "22px 24px",
                borderRadius: "2px",
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "var(--white)",
                  marginBottom: "8px",
                }}
              >
                Session
              </div>
              <p
                style={{
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.7,
                  marginBottom: "14px",
                  fontWeight: 300,
                }}
              >
                Your session lasts until you close the browser tab. Click below to
                sign out immediately.
              </p>
              <button
                onClick={() => window.adminLogout()}
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#ef4444",
                  padding: "10px 24px",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* AUDIT LOG */}
          <div id="tab-audit" className="admin-tab-content">
            <p className="admin-section-title">Audit Log</p>
            <p
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: "0.8rem",
                marginBottom: "18px",
              }}
            >
              Every admin action is recorded here — content changes, login events,
              enquiry updates.
            </p>
            <div id="audit-list">
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.82rem" }}>
                Loading...
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
