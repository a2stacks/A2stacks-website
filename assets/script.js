/**
 * A & A TECH CONSULTANCY — MASTER LUXURY INTERACTION & ANIMATION ENGINE
 * Independent Digital Studio · Asutosh Sahu & Ananta Kishore Swain
 */

(function () {
  'use strict';

  const CONTACT_EMAIL = "aandatechconsultancy@gmail.com";
  const CONTACT_PHONE = "+917606915439";

  /* ==========================================================================
     00. Ultra-Luxury Theme Engine (System Default, Smooth Physics, Luxury Palette)
     ========================================================================== */
  const themeToggle = document.getElementById('themeToggle');
  const drawerThemeToggle = document.getElementById('drawerThemeToggle');
  const drawerThemeState = document.getElementById('drawerThemeState');
  const drawerThemeIcon = document.getElementById('drawerThemeIcon');
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  function updateThemeUI(theme) {
    const isLight = theme === 'light';
    document.documentElement.setAttribute('data-theme', theme);
    document.body.classList.toggle('light-theme', isLight);
    document.body.classList.toggle('dark-theme', !isLight);
    document.documentElement.classList.toggle('theme-preload-light', isLight);

    if (themeToggle) {
      themeToggle.setAttribute('aria-label', isLight ? 'Switch to Dark Theme' : 'Switch to Light Theme');
      themeToggle.classList.toggle('is-light', isLight);
    }

    if (drawerThemeState) {
      drawerThemeState.textContent = isLight ? 'Cashmere Ivory' : 'Dark Obsidian';
    }
    if (drawerThemeIcon) {
      drawerThemeIcon.textContent = isLight ? '🌙' : '☀️';
    }

    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', isLight ? '#f6f5f0' : '#050914');
    }
  }

  function applyTheme(theme, isManual) {
    updateThemeUI(theme);
    if (isManual) {
      localStorage.setItem('aa_theme_mode', theme);
      localStorage.setItem('aa_theme_manual', 'true');
    }
  }

  function toggleTheme() {
    const isCurrentlyLight = document.body.classList.contains('light-theme');
    const nextTheme = isCurrentlyLight ? 'dark' : 'light';
    applyTheme(nextTheme, true);
  }

  themeToggle?.addEventListener('click', toggleTheme);
  drawerThemeToggle?.addEventListener('click', toggleTheme);

  // Initial Theme Evaluation: Storage priority, falling back to System Preference
  const savedTheme = localStorage.getItem('aa_theme_mode');
  const systemPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

  let initialTheme = 'dark';
  if (savedTheme) {
    initialTheme = savedTheme;
  } else if (systemPrefersLight) {
    initialTheme = 'light';
  }
  applyTheme(initialTheme, false);

  // Live OS Theme Change Listener (automatically adapts if user hasn't forced manual override)
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
      const hasManualChoice = localStorage.getItem('aa_theme_manual') === 'true';
      if (!hasManualChoice) {
        applyTheme(e.matches ? 'light' : 'dark', false);
      }
    });
  }

  /* ==========================================================================
     00. Cinematic Film Intro / Opening Animation Controller
     ========================================================================== */
  const cinematicIntro = document.getElementById('cinematicIntro');
  const introLoaderBar = document.getElementById('introLoaderBar');
  const introPercent = document.getElementById('introPercent');
  const introStatusCode = document.getElementById('introStatusCode');
  const introSkipBtn = document.getElementById('introSkipBtn');

  let introCompleted = false;

  function endCinematicIntro() {
    if (introCompleted || !cinematicIntro) return;
    introCompleted = true;

    // Trigger anamorphic shutter curtain parting & beam sweep
    cinematicIntro.classList.add('intro-revealing');
    document.body.classList.remove('intro-active');

    setTimeout(() => {
      cinematicIntro.classList.add('intro-dismissed');
      // Trigger hero reveals cleanly
      document.querySelectorAll('#hero .reveal').forEach(el => el.classList.add('visible'));
      if (typeof runStatsCounter === 'function') {
        runStatsCounter();
      }
    }, 850);
  }

  if (cinematicIntro) {
    const startTime = performance.now();
    const duration = 2200; // 2.2 seconds total intro duration
    const statusMessages = [
      { at: 0, text: 'INITIALIZING_STUDIO_SYSTEMS' },
      { at: 32, text: 'CALIBRATING_LUXURY_ENGINES' },
      { at: 68, text: 'SYNCHRONIZING_FOUNDER_CORE' },
      { at: 94, text: 'SYSTEM_READY // WELCOME' }
    ];

    function updateIntroProgress(currentTime) {
      if (introCompleted) return;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Custom cinematic ease
      const easeVal = 1 - Math.pow(1 - progress, 2.5);
      const percent = Math.floor(easeVal * 100);

      if (introLoaderBar) introLoaderBar.style.width = `${percent}%`;
      if (introPercent) introPercent.textContent = (percent < 10 ? '0' : '') + percent + '%';

      // Update status text
      const currentStatus = statusMessages.slice().reverse().find(s => percent >= s.at);
      if (currentStatus && introStatusCode && introStatusCode.textContent !== currentStatus.text) {
        introStatusCode.textContent = currentStatus.text;
      }

      if (progress < 1) {
        requestAnimationFrame(updateIntroProgress);
      } else {
        setTimeout(endCinematicIntro, 350);
      }
    }
    requestAnimationFrame(updateIntroProgress);

    // Skip handlers
    introSkipBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      endCinematicIntro();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !introCompleted) {
        endCinematicIntro();
      }
    });

    cinematicIntro.addEventListener('click', () => {
      if (!introCompleted) {
        endCinematicIntro();
      }
    });
  }

  /* ==========================================================================
     01. Interactive Dynamic Background Canvas (Constellation & Luxury Starfield)
     ========================================================================== */
  const canvas = document.getElementById('bgCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 18000), 75);
    const mouse = { x: null, y: null, radius: 140 };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.size = Math.random() * 2 + 0.8;
        // 65% gold particles, 35% electric cyan particles
        this.isGold = Math.random() > 0.35;
        this.baseAlpha = Math.random() * 0.4 + 0.2;
        this.alpha = this.baseAlpha;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Screen boundary wrap
        if (this.x < 0) this.x = width;
        else if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        else if (this.y > height) this.y = 0;

        // Mouse proximity reaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * force * 1.5;
            this.y -= Math.sin(angle) * force * 1.5;
            this.alpha = Math.min(this.baseAlpha + 0.4, 0.9);
          } else {
            this.alpha = this.baseAlpha;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        const isLight = document.body.classList.contains('light-theme');
        if (isLight) {
          if (this.isGold) {
            ctx.fillStyle = `rgba(184, 134, 45, ${this.alpha * 0.75})`;
            ctx.shadowColor = 'rgba(184, 134, 45, 0.3)';
          } else {
            ctx.fillStyle = `rgba(2, 132, 199, ${this.alpha * 0.7})`;
            ctx.shadowColor = 'rgba(2, 132, 199, 0.3)';
          }
        } else {
          if (this.isGold) {
            ctx.fillStyle = `rgba(217, 181, 109, ${this.alpha})`;
            ctx.shadowColor = 'rgba(217, 181, 109, 0.5)';
          } else {
            ctx.fillStyle = `rgba(56, 189, 248, ${this.alpha})`;
            ctx.shadowColor = 'rgba(56, 189, 248, 0.5)';
          }
        }
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function connectParticles() {
      const maxDist = 120;
      const isLight = document.body.classList.contains('light-theme');
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (isLight ? 0.14 : 0.18);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            if (isLight) {
              ctx.strokeStyle = particles[i].isGold
                ? `rgba(184, 134, 45, ${alpha})`
                : `rgba(2, 132, 199, ${alpha})`;
            } else {
              ctx.strokeStyle = particles[i].isGold
                ? `rgba(217, 181, 109, ${alpha})`
                : `rgba(56, 189, 248, ${alpha})`;
            }
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }
    }

    let animationFrameId;
    function render() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      connectParticles();
      animationFrameId = requestAnimationFrame(render);
    }
    render();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });
  }

  /* ==========================================================================
     02. Custom Luxury Trailing Cursor
     ========================================================================== */
  const customCursor = document.getElementById('customCursor');
  if (customCursor && window.matchMedia('(pointer: fine)').matches) {
    const dot = customCursor.querySelector('.cursor-dot');
    const ring = customCursor.querySelector('.cursor-ring');

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dot) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    });

    function renderCursor() {
      // Smooth interpolation for trailing outer ring
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Expand cursor over interactive elements
    const interactiveSelectors = 'a, button, input, select, textarea, .spotlight-card, [data-tilt]';
    document.querySelectorAll(interactiveSelectors).forEach((el) => {
      el.addEventListener('mouseenter', () => customCursor.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => customCursor.classList.remove('cursor-hover'));
    });
  }

  /* ==========================================================================
     03. Top Scroll Progress Indicator & Sticky Header Elevation
     ========================================================================== */
  const scrollProgressBar = document.getElementById('scrollProgress');
  const siteHeader = document.querySelector('.site-header');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / (scrollHeight || 1)) * 100;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${progress}%`;
    }

    if (siteHeader) {
      if (scrollTop > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }
  }, { passive: true });

  /* ==========================================================================
     04. Mobile Navigation Drawer
     ========================================================================== */
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerLinks = document.querySelectorAll('.drawer-item');

  function openDrawer() {
    mobileDrawer?.classList.add('open');
    menuToggle?.setAttribute('aria-expanded', 'true');
    mobileDrawer?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    mobileDrawer?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  menuToggle?.addEventListener('click', () => {
    if (mobileDrawer?.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  drawerClose?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);
  drawerLinks.forEach((link) => link.addEventListener('click', closeDrawer));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer?.classList.contains('open')) {
      closeDrawer();
    }
  });

  /* ==========================================================================
     05. Hero Interactive 3D Tech Console (Terminal Typing & File Tabs)
     ========================================================================== */
  const consoleCode = document.getElementById('consoleCode');
  const consoleTabs = document.querySelectorAll('.console-tab');

  const fileContents = {
    architecture: [
      { ln: '01', html: '<span class="code-comment">// A&A Core Enterprise Gateway</span>' },
      { ln: '02', html: '<span class="code-keyword">import</span> { createArchitecturalCore } <span class="code-keyword">from</span> <span class="code-str">"@aa/engine"</span>;' },
      { ln: '03', html: '<span class="code-keyword">const</span> studio = <span class="code-keyword">new</span> <span class="code-fn">TechConsultancy</span>({ founders: [<span class="code-str">"Asutosh"</span>, <span class="code-str">"Ananta"</span>] });' },
      { ln: '04', html: '<span class="code-keyword">export async function</span> <span class="code-fn">bootstrapSystem</span>() {' },
      { ln: '05', html: '  <span class="code-keyword">const</span> pipeline = <span class="code-keyword">await</span> studio.<span class="code-fn">deployHighPerformanceStack</span>();' },
      { ln: '06', html: '  <span class="code-keyword">return</span> pipeline.<span class="code-fn">streamTelemetry</span>({ targetLatency: <span class="code-str">"&lt;0.5s"</span> });' },
      { ln: '07', html: '}' }
    ],
    ai_agent: [
      { ln: '01', html: '<span class="code-comment"># Autonomous AI Workflow Agent</span>' },
      { ln: '02', html: '<span class="code-keyword">from</span> aa_intelligence <span class="code-keyword">import</span> NeuralAgent, GeminiEngine' },
      { ln: '03', html: '<span class="code-keyword">class</span> <span class="code-fn">EnterpriseAgent</span>(NeuralAgent):' },
      { ln: '04', html: '    <span class="code-keyword">def</span> <span class="code-fn">__init__</span>(self, knowledge_base):' },
      { ln: '05', html: '        self.engine = GeminiEngine(model=<span class="code-str">"custom-finetuned"</span>)' },
      { ln: '06', html: '        self.orchestrate(realtime_sync=<span class="code-keyword">True</span>)' },
      { ln: '07', html: 'agent = <span class="code-fn">EnterpriseAgent</span>(dataset=<span class="code-str">"crm_vault"</span>)' }
    ],
    metrics: [
      { ln: '01', html: '<span class="code-comment">// Real-Time Studio Performance Telemetry</span>' },
      { ln: '02', html: '{' },
      { ln: '03', html: '  <span class="code-keyword">"founders_engagement"</span>: <span class="code-str">"100% Senior Engineers"</span>,' },
      { ln: '04', html: '  <span class="code-keyword">"uptime_reliability"</span>: <span class="code-str">"99.98% SLA"</span>,' },
      { ln: '05', html: '  <span class="code-keyword">"lighthouse_score"</span>: { <span class="code-keyword">"performance"</span>: <span class="code-str">100</span>, <span class="code-keyword">"seo"</span>: <span class="code-str">100</span> },' },
      { ln: '06', html: '  <span class="code-keyword">"encryption"</span>: <span class="code-str">"AES-256-GCM / Zero Lock-in"</span>' },
      { ln: '07', html: '}' }
    ]
  };

  let activeTab = 'architecture';
  let typingTimer = null;

  function renderTerminalLines(fileKey) {
    if (!consoleCode) return;
    clearTimeout(typingTimer);
    consoleCode.innerHTML = '';

    const lines = fileContents[fileKey] || fileContents.architecture;
    let currentLineIndex = 0;

    function addNextLine() {
      if (currentLineIndex < lines.length) {
        const item = lines[currentLineIndex];
        const lineEl = document.createElement('div');
        lineEl.className = 'code-line';
        lineEl.innerHTML = `
          <span class="code-ln">${item.ln}</span>
          <span class="code-txt">${item.html}</span>
        `;
        consoleCode.appendChild(lineEl);
        currentLineIndex++;
        typingTimer = setTimeout(addNextLine, 110);
      } else {
        // Append blinking cursor to last line
        const lastTxt = consoleCode.querySelector('.code-line:last-child .code-txt');
        if (lastTxt && !lastTxt.querySelector('.code-cursor')) {
          const cursor = document.createElement('span');
          cursor.className = 'code-cursor';
          lastTxt.appendChild(cursor);
        }
      }
    }
    addNextLine();
  }

  // Initial code render
  renderTerminalLines(activeTab);

  // Tab switching
  consoleTabs.forEach((tab) => {
    tab.addEventListener('click', function () {
      const file = this.getAttribute('data-file');
      if (file && file !== activeTab) {
        consoleTabs.forEach((t) => t.classList.remove('active'));
        this.classList.add('active');
        activeTab = file;
        renderTerminalLines(file);
      }
    });
  });

  /* ==========================================================================
     06. 3D Tilt Card Physics (Hero Console, Founder Cards)
     ========================================================================== */
  const tiltCards = document.querySelectorAll('[data-tilt]');
  if (window.matchMedia('(pointer: fine)').matches) {
    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      });
    });
  }

  /* ==========================================================================
     07. Spotlight Mouse Glow Tracking for Cards
     ========================================================================== */
  const spotlightCards = document.querySelectorAll('.spotlight-card');
  if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      spotlightCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  /* ==========================================================================
     08. Animated Counter for Stats
     ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsTriggered = false;

  function runStatsCounter() {
    if (statsTriggered) return;
    statsTriggered = true;

    statNumbers.forEach((stat) => {
      const target = parseFloat(stat.getAttribute('data-target') || '0');
      const isDecimal = target % 1 !== 0;
      const padZero = stat.getAttribute('data-pad') === 'true';
      const duration = 1600;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const easeVal = 1 - Math.pow(1 - progress, 3);
        const current = target * easeVal;

        if (isDecimal) {
          stat.textContent = current.toFixed(1);
        } else {
          const val = Math.floor(current);
          stat.textContent = padZero && val < 10 ? '0' + val : val;
        }

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          if (isDecimal) {
            stat.textContent = target.toFixed(1);
          } else {
            stat.textContent = padZero && target < 10 ? '0' + target : target;
          }
        }
      }
      requestAnimationFrame(update);
    });
  }

  /* ==========================================================================
     09. Scroll Reveal Animations (IntersectionObserver)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');
  const statsConsole = document.querySelector('.hero-stats-wrapper, #statsConsole, .hero-stats-bar');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  });

  revealElements.forEach((el) => revealObserver.observe(el));

  if (statsConsole) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        runStatsCounter();
      }
    }, { threshold: 0.15 });
    statsObserver.observe(statsConsole);
  }

  /* ==========================================================================
     10. CADLAB Mockup Interactive View Switcher & Live Iframe Engine
     ========================================================================== */
  const mockTabs = document.querySelectorAll('.mock-tab-btn');
  const cadlabMockup = document.getElementById('cadlabMockup');
  const reloadMockupBtn = document.getElementById('reloadMockupBtn');

  function scaleCadlabIframe() {
    const viewport = document.getElementById('mockupLiveViewport');
    const iframe = document.getElementById('cadlabLiveIframe');
    if (!viewport || !iframe) return;

    const targetWidth = 1200; // Virtual desktop resolution for CADLAB
    const containerWidth = viewport.clientWidth;
    const containerHeight = viewport.clientHeight || 330;

    if (containerWidth <= 0) return;

    const scale = containerWidth / targetWidth;
    iframe.style.width = targetWidth + 'px';
    iframe.style.height = Math.round(containerHeight / scale) + 'px';
    iframe.style.transform = `scale(${scale})`;
  }

  function setupLiveIframeListeners() {
    const cadlabIframe = document.getElementById('cadlabLiveIframe');
    const mockupLoader = document.getElementById('mockupLoader');
    if (cadlabIframe && mockupLoader) {
      cadlabIframe.addEventListener('load', () => {
        mockupLoader.classList.add('is-loaded');
        scaleCadlabIframe();
      });
      // Fallback timer ensuring loader disappears smoothly
      setTimeout(() => {
        mockupLoader.classList.add('is-loaded');
        scaleCadlabIframe();
      }, 3500);
    }
  }

  reloadMockupBtn?.addEventListener('click', () => {
    const iframe = document.getElementById('cadlabLiveIframe');
    const loader = document.getElementById('mockupLoader');
    if (iframe) {
      loader?.classList.remove('is-loaded');
      const baseSrc = 'https://cadlab.co.in/';
      iframe.src = baseSrc + (baseSrc.includes('?') ? '&' : '?') + 't=' + Date.now();
    }
  });

  window.addEventListener('resize', scaleCadlabIframe);
  window.addEventListener('load', scaleCadlabIframe);
  if (window.ResizeObserver) {
    const vp = document.getElementById('mockupLiveViewport');
    if (vp) {
      new ResizeObserver(scaleCadlabIframe).observe(vp);
    }
  }

  // Initial call on page load
  setupLiveIframeListeners();
  setTimeout(scaleCadlabIframe, 150);

  const mockViews = {
    live: `
      <div class="mockup-live-viewport" id="mockupLiveViewport">
        <div class="mockup-iframe-loader" id="mockupLoader">
          <div class="loader-spinner"></div>
          <span>Connecting to live cadlab.co.in...</span>
        </div>
        <iframe 
          src="https://cadlab.co.in/" 
          id="cadlabLiveIframe" 
          class="mockup-live-iframe"
          title="CadlaB | Geospatial Intelligence &amp; Engineering Live Site"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        ></iframe>
      </div>
    `,
    overview: `
      <div class="mock-inner-nav">
        <span class="mock-logo">CADLAB<span>.co.in</span></span>
        <div class="mock-nav-links">
          <span>HOME</span>
          <span>CAPABILITIES</span>
          <span>ABOUT</span>
          <span class="mock-cta">CONSULT</span>
        </div>
      </div>
      <div class="mock-hero-layout">
        <div class="mock-hero-text">
          <div class="mock-kicker">ENGINEERING &amp; DIGITAL DESIGN</div>
          <h4 class="mock-heading">Ideas Into<br><em>Tangible Reality.</em></h4>
          <p class="mock-copy">State-of-the-art computational modeling, design optimization, and digital engineering services.</p>
          <div class="mock-btn-row">
            <span class="mock-btn gold">Explore Services</span>
            <span class="mock-btn outline">Case Studies</span>
          </div>
        </div>
        <div class="mock-hero-graphic">
          <div class="wireframe-cube"></div>
          <div class="pulse-node-1"></div>
          <div class="pulse-node-2"></div>
        </div>
      </div>
      <div class="mock-footer-strip">
        <span>STATUS: OPERATIONAL</span>
        <span>PERFORMANCE: 100/100</span>
        <span>RESPONSIVE ENGINE: V2.4</span>
      </div>
    `,
    metrics: `
      <div class="mock-inner-nav">
        <span class="mock-logo">CADLAB<span> // AUDIT</span></span>
        <span class="mock-cta">VERIFIED PASS</span>
      </div>
      <div class="mock-metrics-grid" style="padding: 20px 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; text-align: center;">
        <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); padding: 12px 6px; border-radius: 6px;">
          <div style="font-size: 24px; font-weight: 700; color: #34d399;">100</div>
          <div style="font-size: 8.5px; color: #94a3b8; margin-top: 4px;">PERFORMANCE</div>
        </div>
        <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); padding: 12px 6px; border-radius: 6px;">
          <div style="font-size: 24px; font-weight: 700; color: #34d399;">100</div>
          <div style="font-size: 8.5px; color: #94a3b8; margin-top: 4px;">ACCESSIBILITY</div>
        </div>
        <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); padding: 12px 6px; border-radius: 6px;">
          <div style="font-size: 24px; font-weight: 700; color: #34d399;">100</div>
          <div style="font-size: 8.5px; color: #94a3b8; margin-top: 4px;">BEST PRACTICES</div>
        </div>
        <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); padding: 12px 6px; border-radius: 6px;">
          <div style="font-size: 24px; font-weight: 700; color: #34d399;">100</div>
          <div style="font-size: 8.5px; color: #94a3b8; margin-top: 4px;">SEO RANKING</div>
        </div>
      </div>
      <div class="mock-footer-strip">
        <span>FCP: 0.52s</span>
        <span>LCP: 0.81s</span>
        <span>CLS: 0.000</span>
      </div>
    `,
    tech: `
      <div class="mock-inner-nav">
        <span class="mock-logo">CADLAB<span> // STACK</span></span>
        <span class="mock-cta">MODERN ARTIFACT</span>
      </div>
      <div class="mock-tech-list" style="padding: 14px 0; display: flex; flex-direction: column; gap: 8px; font-family: var(--font-mono); font-size: 11px;">
        <div class="mock-tech-item" style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 6px;">
          <span style="color: var(--gold-primary);">Frontend Core:</span>
          <span style="color: #fff;">Semantic HTML5 & Modern CSS Grid</span>
        </div>
        <div class="mock-tech-item" style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 6px;">
          <span style="color: var(--gold-primary);">Interaction Engine:</span>
          <span style="color: #fff;">Vanilla ES6+ Hardware Accelerated</span>
        </div>
        <div class="mock-tech-item" style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 6px;">
          <span style="color: var(--gold-primary);">Asset Optimization:</span>
          <span style="color: #fff;">Modern WebP & Compressed Vectors</span>
        </div>
        <div class="mock-tech-item" style="display: flex; justify-content: space-between;">
          <span style="color: var(--gold-primary);">Cloud Delivery:</span>
          <span style="color: #fff;">High-Speed Global Edge CDN</span>
        </div>
      </div>
      <div class="mock-footer-strip">
        <span>ZERO JAVASCRIPT BLOAT</span>
        <span>PURE ARCHITECTURAL EFFICIENCY</span>
      </div>
    `
  };

  mockTabs.forEach((tab) => {
    tab.addEventListener('click', function () {
      const viewKey = this.getAttribute('data-mock-view');
      if (viewKey && mockViews[viewKey] && cadlabMockup) {
        mockTabs.forEach((t) => t.classList.remove('active'));
        this.classList.add('active');
        cadlabMockup.classList.toggle('has-live-frame', viewKey === 'live');
        cadlabMockup.innerHTML = mockViews[viewKey];
        if (viewKey === 'live') {
          setupLiveIframeListeners();
          scaleCadlabIframe();
          setTimeout(scaleCadlabIframe, 100);
        }
      }
    });
  });

  /* ==========================================================================
     11. Interactive FAQ Accordion
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger?.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all other items for clean single-view accordion
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('active');
          const otherTrigger = other.querySelector('.faq-trigger');
          const otherContent = other.querySelector('.faq-content');
          otherTrigger?.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = '0px';
        }
      });

      if (!isOpen) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        if (content) content.style.maxHeight = `${content.scrollHeight}px`;
      } else {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        if (content) content.style.maxHeight = '0px';
      }
    });
  });

  /* ==========================================================================
     12. Service Selection Link Router (Pre-fill contact form from card)
     ========================================================================== */
  const serviceActionLinks = document.querySelectorAll('[data-select-service]');
  const userServiceSelect = document.getElementById('userService');

  serviceActionLinks.forEach((link) => {
    link.addEventListener('click', function () {
      const targetService = this.getAttribute('data-select-service');
      if (userServiceSelect && targetService) {
        userServiceSelect.value = targetService;
        // Visual highlight feedback
        userServiceSelect.style.borderColor = 'var(--gold-primary)';
        userServiceSelect.style.boxShadow = '0 0 15px var(--gold-glow)';
        setTimeout(() => {
          userServiceSelect.style.borderColor = '';
          userServiceSelect.style.boxShadow = '';
        }, 2000);
      }
    });
  });

  /* ==========================================================================
     13. Budget Tier Interactive Buttons
     ========================================================================== */
  const budgetPills = document.querySelectorAll('.budget-pill');
  const budgetInput = document.getElementById('budgetInput');

  budgetPills.forEach((pill) => {
    pill.addEventListener('click', function () {
      budgetPills.forEach((p) => p.classList.remove('active'));
      this.classList.add('active');
      const val = this.getAttribute('data-budget') || 'Starter / MVP';
      if (budgetInput) budgetInput.value = val;
    });
  });

  /* ==========================================================================
     14. Toast Notification Engine
     ========================================================================== */
  const toastContainer = document.getElementById('toastContainer');

  function showToast(message, icon = '✦') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span style="color: var(--gold-primary);">${icon}</span><span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }

  /* ==========================================================================
     15. Copy Email to Clipboard
     ========================================================================== */
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  copyEmailBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      showToast('Official email copied to clipboard!', '✓');
    } catch {
      // Fallback
      showToast(CONTACT_EMAIL, '✉');
    }
  });

  /* ==========================================================================
     16. Contact Form Handlers (Email Dispatch & WhatsApp Transmission)
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const whatsappSubmitBtn = document.getElementById('whatsappSubmitBtn');

  function getFormData() {
    if (!contactForm) return null;
    const formData = new FormData(contactForm);
    return {
      name: formData.get('name')?.toString().trim() || '',
      email: formData.get('email')?.toString().trim() || '',
      phone: formData.get('phone')?.toString().trim() || '',
      service: formData.get('service')?.toString().trim() || 'General Project Consultation',
      budget: formData.get('budget')?.toString().trim() || 'Flexible / TBD',
      message: formData.get('message')?.toString().trim() || ''
    };
  }

  // Email Submit Handler
  contactForm?.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = getFormData();
    if (!data) return;

    const subject = encodeURIComponent(`Project Brief from ${data.name}: ${data.service}`);
    const bodyContent = 
`PROJECT INITIATION BRIEF
-----------------------------------------
Client Name / Org : ${data.name}
Email Address     : ${data.email}
Phone / WhatsApp  : ${data.phone || 'Not specified'}
Required Scope    : ${data.service}
Budget Tier       : ${data.budget}

PROJECT REQUIREMENTS & VISION:
${data.message}

-----------------------------------------
Transmitted to A & A Tech Consultancy
Founders: Asutosh Sahu & Ananta Kishore Swain`;

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${encodeURIComponent(bodyContent)}`;
    window.location.href = mailtoUrl;

    showToast('Opening your email application with structured brief...', '✉');
  });

  // WhatsApp Instant Brief Button
  whatsappSubmitBtn?.addEventListener('click', function () {
    const data = getFormData();
    if (!data) return;

    if (!data.name) {
      showToast('Please enter your name first.', '⚠');
      document.getElementById('userName')?.focus();
      return;
    }

    const waText = 
`*NEW PROJECT BRIEF — A&A TECH*
-----------------------------------------
*Client:* ${data.name}
*Email:* ${data.email || 'N/A'}
*Service:* ${data.service}
*Budget:* ${data.budget}
*Overview:* ${data.message || 'Ready to discuss requirements'}`;

    const waUrl = `https://wa.me/917606915439?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    showToast('Redirecting to WhatsApp conversation...', '💬');
  });

  /* ==========================================================================
     17. Live IST Clock (Odisha, India) & Year Update
     ========================================================================== */
  const istClock = document.getElementById('istClock');
  const currentYear = document.getElementById('currentYear');

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear().toString();
  }

  function updateISTClock() {
    if (!istClock) return;
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formatter = new Intl.DateTimeFormat([], options);
      istClock.textContent = `${formatter.format(now)} IST`;
    } catch {
      istClock.textContent = 'ODISHA (IST)';
    }
  }
  updateISTClock();
  setInterval(updateISTClock, 1000);

  /* ==========================================================================
     18. Active Navigation Highlighting on Scroll (ScrollSpy) & Mascot Advisor
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links .nav-item');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 160;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id') || '';
      }
    });

    navItems.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    if (current && typeof updateSpeechBubble === 'function') {
      updateSpeechBubble(current);
    }
  }, { passive: true });

  /* ==========================================================================
     19. Intelligent AI Assistant, Mascot Companion & Knowledge Base
     ========================================================================== */
  const botTrigger = document.getElementById('botTrigger');
  const wavingArm = document.getElementById('wavingArm');
  const aaChatbotWindow = document.getElementById('aaChatbotWindow');
  const chatCloseBtn = document.getElementById('chatCloseBtn');
  const chatResetBtn = document.getElementById('chatResetBtn');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');
  const botSpeechBubble = document.getElementById('botSpeechBubble');
  const bubbleText = document.getElementById('bubbleText');
  const bubbleEmoji = document.getElementById('bubbleEmoji');
  const bubbleCloseBtn = document.getElementById('bubbleCloseBtn');
  const chatChips = document.querySelectorAll('.chat-chip');

  // Section advisor prompts
  const sectionAdvisorData = {
    hero: {
      emoji: '👋',
      text: "Hello! Looking to engineer an ambitious website, CRM, or AI system? Let's talk!"
    },
    about: {
      emoji: '💡',
      text: "Wondering what makes our independent studio different? Ask me why direct founder access matters!"
    },
    services: {
      emoji: '⚡',
      text: "Exploring our 8 core capabilities? Ask me which architecture fits your business!"
    },
    work: {
      emoji: '🚀',
      text: "Reviewing CADLAB? Ask me about its sub-0.6s loading benchmarks and custom frontend!"
    },
    process: {
      emoji: '🛠',
      text: "Curious how our 4-phase execution blueprint guarantees timely delivery?"
    },
    founders: {
      emoji: '🤝',
      text: "Meet Asutosh Sahu & Ananta Kishore Swain! Ask me about their technical backgrounds and vision."
    },
    faq: {
      emoji: '❓',
      text: "Got questions about code ownership, timelines, or pricing? I have the answers!"
    },
    contact: {
      emoji: '✨',
      text: "Ready to discuss your project? I can help you draft your brief or connect on WhatsApp!"
    }
  };

  let currentAdvisorSection = 'hero';
  let isBubbleDismissed = false;
  let isChatOpen = false;

  function triggerMascotWave() {
    if (!wavingArm) return;
    wavingArm.style.animation = 'none';
    void wavingArm.offsetWidth;
    wavingArm.style.animation = 'handWaveAnim 1.2s ease-in-out 3';
    setTimeout(() => {
      wavingArm.style.animation = 'handWaveAnim 2.5s ease-in-out infinite';
    }, 3600);
  }

  function updateSpeechBubble(sectionId) {
    if (!botSpeechBubble || isBubbleDismissed || isChatOpen) return;
    if (sectionAdvisorData[sectionId] && sectionId !== currentAdvisorSection) {
      currentAdvisorSection = sectionId;
      const data = sectionAdvisorData[sectionId];

      botSpeechBubble.classList.add('bubble-hidden');
      setTimeout(() => {
        if (bubbleEmoji) bubbleEmoji.textContent = data.emoji;
        if (bubbleText) bubbleText.textContent = data.text;
        botSpeechBubble.classList.remove('bubble-hidden');
        triggerMascotWave();
      }, 350);
    }
  }

  bubbleCloseBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    isBubbleDismissed = true;
    botSpeechBubble?.classList.add('bubble-hidden');
  });

  botSpeechBubble?.addEventListener('click', () => {
    openChatWindow();
  });

  function openChatWindow() {
    isChatOpen = true;
    aaChatbotWindow?.classList.add('open');
    aaChatbotWindow?.setAttribute('aria-hidden', 'false');
    botTrigger?.classList.add('chat-open');
    botTrigger?.setAttribute('aria-expanded', 'true');
    botSpeechBubble?.classList.add('bubble-hidden');
    if (chatInput) {
      setTimeout(() => chatInput.focus(), 250);
    }
  }

  function closeChatWindow() {
    isChatOpen = false;
    aaChatbotWindow?.classList.remove('open');
    aaChatbotWindow?.setAttribute('aria-hidden', 'true');
    botTrigger?.classList.remove('chat-open');
    botTrigger?.setAttribute('aria-expanded', 'false');
  }

  botTrigger?.addEventListener('click', () => {
    if (isChatOpen) {
      closeChatWindow();
    } else {
      openChatWindow();
    }
  });

  chatCloseBtn?.addEventListener('click', closeChatWindow);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isChatOpen) {
      closeChatWindow();
    }
  });

  // Action Click Handler inside Bot Messages
  function handleActionClick(actionType, val) {
    if (actionType === 'scroll') {
      const targetEl = document.querySelector(val);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
        // Close on small mobile screens to show the section
        if (window.innerWidth < 768) {
          closeChatWindow();
        }
      }
    } else if (actionType === 'cadlab') {
      window.open('https://cadlab.co.in', '_blank', 'noopener,noreferrer');
    } else if (actionType === 'link') {
      window.open(val, '_blank', 'noopener,noreferrer');
    } else if (actionType === 'whatsapp') {
      const text = encodeURIComponent("Hello A&A Tech Consultancy, I would like to discuss a project.");
      window.open(`https://wa.me/917606915439?text=${text}`, '_blank', 'noopener,noreferrer');
    } else if (actionType === 'service') {
      const sel = document.getElementById('userService');
      if (sel && val) {
        sel.value = val;
      }
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
      if (window.innerWidth < 768) {
        closeChatWindow();
      }
    } else if (actionType === 'query') {
      handleUserSubmit(val);
    }
  }

  // Append Message Helper
  function appendMessage(sender, text, actions = []) {
    if (!chatMessages) return;

    const msgEl = document.createElement('div');
    msgEl.className = `chat-msg ${sender}`;

    const avatarHtml = sender === 'bot'
      ? `<div class="msg-avatar">A&amp;A</div>`
      : `<div class="msg-avatar">YOU</div>`;

    let actionsHtml = '';
    if (actions && actions.length > 0) {
      actionsHtml = '<div class="msg-actions-row">';
      actions.forEach(act => {
        actionsHtml += `<button type="button" class="msg-action-btn ${act.isWa ? 'wa-btn' : ''}" data-act="${act.action}" data-val="${act.value || ''}">${act.label}</button>`;
      });
      actionsHtml += '</div>';
    }

    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');

    msgEl.innerHTML = `
      ${avatarHtml}
      <div class="msg-bubble">
        <div>${formattedText}</div>
        ${actionsHtml}
      </div>
    `;

    chatMessages.appendChild(msgEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    msgEl.querySelectorAll('.msg-action-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const actionType = this.getAttribute('data-act');
        const val = this.getAttribute('data-val');
        handleActionClick(actionType, val);
      });
    });
  }

  // Typing Indicator Helper
  function showTypingIndicator() {
    if (!chatMessages) return null;
    const indicator = document.createElement('div');
    indicator.className = 'chat-msg bot typing-wrapper';
    indicator.id = 'botTypingIndicator';
    indicator.innerHTML = `
      <div class="msg-avatar">A&amp;A</div>
      <div class="bot-typing-dots">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return indicator;
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById('botTypingIndicator');
    indicator?.remove();
  }

  // Comprehensive Knowledge Base
  const knowledgeBase = [
    {
      keywords: ['hello', 'hi', 'hey', 'namaste', 'good morning', 'good evening', 'who are you', 'what are you', 'about you'],
      reply: "Hello! I am the **A & A Tech Digital Assistant** — your interactive guide to our independent engineering studio. Founded by **Asutosh Sahu** and **Ananta Kishore Swain**, we craft bespoke high-performance websites, custom CRM systems, AI-powered automation, and native Android apps.\n\nHow can I help engineer your vision today?",
      actions: [
        { label: '⚡ Our Capabilities', action: 'scroll', value: '#services' },
        { label: '🚀 CADLAB Case Study', action: 'cadlab' },
        { label: '👤 Meet Founders', action: 'scroll', value: '#founders' },
        { label: '💬 Chat on WhatsApp', action: 'whatsapp', isWa: true }
      ]
    },
    {
      keywords: ['service', 'services', 'capabilities', 'what do you do', 'what can you do', 'offer', 'disciplines', 'build'],
      reply: "We offer 8 core engineering disciplines designed for performance and scale:\n\n• **01. Website Architecture**: High-speed, luxury, conversion-tuned websites.\n• **02. Executive Portfolios**: Distinctive digital footprints for industry leaders.\n• **03. Custom CRM & ERP**: Tailored business workflow engines without monthly SaaS fees.\n• **04. AI Dashboards**: Real-time KPI control rooms with predictive analytics.\n• **05. Autonomous AI Chatbots**: 24/7 intelligent domain-trained agents.\n• **06. Enterprise Software**: Inventory, operations, and custom internal SaaS.\n• **07. Android Applications**: Native touch UI with offline sync resilience.\n• **08. Bespoke R&D**: Custom MVP prototyping and architecture audits.",
      actions: [
        { label: 'View Capabilities Grid ↗', action: 'scroll', value: '#services' },
        { label: 'Start Project Enquiry ✍️', action: 'scroll', value: '#contact' },
        { label: 'Direct WhatsApp 💬', action: 'whatsapp', isWa: true }
      ]
    },
    {
      keywords: ['website', 'web design', 'landing page', 'redesign', 'frontend', 'responsive', 'seo'],
      reply: "Our websites are engineered with semantic HTML5, modern CSS3, and hardware-accelerated JavaScript. We guarantee:\n\n• **Sub-second loading speeds** (< 0.6s FCP)\n• **100/100 Lighthouse performance** & SEO A+ rating\n• **Bespoke luxury aesthetics** (no off-the-shelf templates)\n• **100% fluid mobile & desktop responsiveness**",
      actions: [
        { label: 'Select Website Service ✍️', action: 'service', value: 'Website design & development' },
        { label: 'Inspect CADLAB Case Study ↗', action: 'cadlab' }
      ]
    },
    {
      keywords: ['crm', 'erp', 'software', 'business software', 'inventory', 'management', 'workflow', 'pipeline'],
      reply: "Instead of paying \$50/month per user for generic CRMs that don't match how your team works, we engineer **custom CRM and ERP software** shaped exactly to your operations.\n\n• **Zero recurring per-user license fees**\n• **Automated lead routing & pipeline tracking**\n• **Custom invoicing, GST & inventory sync**\n• **Role-based security permissions & full data privacy**",
      actions: [
        { label: 'Select Custom CRM ✍️', action: 'service', value: 'Custom CRM system' },
        { label: 'Discuss Your Workflow 💬', action: 'whatsapp', isWa: true }
      ]
    },
    {
      keywords: ['ai', 'chatbot', 'bot', 'artificial intelligence', 'llm', 'gemini', 'openai', 'agent', 'automation'],
      reply: "We build state-of-the-art AI into everyday business tools:\n\n• **Domain-Trained Chatbots** (just like me!) that handle support & qualify leads 24/7\n• **Autonomous Workflow Agents** for document processing & data entry\n• **AI Analytics Dashboards** powered by Gemini and custom vector databases\n• **WhatsApp AI Bots** integrated into your company database",
      actions: [
        { label: 'Select AI Integration ✍️', action: 'service', value: 'AI chatbot' },
        { label: 'Chat with Founders 💬', action: 'whatsapp', isWa: true }
      ]
    },
    {
      keywords: ['portfolio', 'personal website', 'creator', 'executive', 'personal brand'],
      reply: "We design commanding, cinematic portfolio platforms for consultants, founders, and creative directors looking to establish undeniable industry authority with fluid typography and interactive 3D physics.",
      actions: [
        { label: 'Select Portfolio Service ✍️', action: 'service', value: 'Portfolio website' }
      ]
    },
    {
      keywords: ['android', 'app', 'apps', 'mobile', 'apk', 'play store', 'ios', 'smartphone'],
      reply: "We develop high-performance Android applications featuring intuitive interfaces, smooth native gestures, background data synchronization, and resilient offline capabilities.",
      actions: [
        { label: 'Select Android Service ✍️', action: 'service', value: 'Android application' }
      ]
    },
    {
      keywords: ['cadlab', 'case study', 'portfolio work', 'proof', 'past project', 'client'],
      reply: "Our featured flagship project is **CADLAB** ([cadlab.co.in](https://cadlab.co.in)), where we engineered the complete corporate web architecture, brand positioning, and sub-0.6s loading performance.\n\nWe also have upcoming enterprise ERPs and AI domain assistants currently incubating in our studio pipeline.",
      actions: [
        { label: 'Visit CADLAB Live ↗', action: 'cadlab' },
        { label: 'Jump to Case Studies Section', action: 'scroll', value: '#work' }
      ]
    },
    {
      keywords: ['founder', 'founders', 'asutosh', 'ananta', 'sahu', 'swain', 'team', 'who made', 'leadership', 'engineers', 'profiles', 'github', 'linkedin'],
      reply: "**A & A Tech Consultancy** is led directly by two founding partners:\n\n• **Asutosh Sahu** (Co-Founder & Lead Engineer) — Full-stack architecture, business software, and high-performance frontend engines.\n  Profiles: [LinkedIn](https://www.linkedin.com/in/asutosh-sahu-b3219426b/) · [GitHub](https://github.com/Asutosh-0/)\n\n• **Ananta Kishore Swain** (Co-Founder & Systems Architect) — Systems engineering, AI pipelines, operations architecture, and client delivery.\n  Profiles: [LinkedIn](https://www.linkedin.com/in/ananta-kishore-swain-6282472bb/) · [GitHub](https://github.com/ananta12-d)\n\nYou collaborate directly with the founders from day one — zero junior account managers.",
      actions: [
        { label: 'Meet Founders Section ↗', action: 'scroll', value: '#founders' },
        { label: "Ananta's LinkedIn ↗", action: 'link', value: 'https://www.linkedin.com/in/ananta-kishore-swain-6282472bb/' },
        { label: "Ananta's GitHub ↗", action: 'link', value: 'https://github.com/ananta12-d' },
        { label: "Asutosh's LinkedIn ↗", action: 'link', value: 'https://www.linkedin.com/in/asutosh-sahu-b3219426b/' },
        { label: "Asutosh's GitHub ↗", action: 'link', value: 'https://github.com/Asutosh-0/' }
      ]
    },
    {
      keywords: ['time', 'timeline', 'how long', 'duration', 'weeks', 'delivery', 'schedule', 'turnaround', 'fast'],
      reply: "Our typical execution timelines:\n\n• **High-Impact Corporate Websites**: 2 to 4 weeks\n• **Custom CRM & Enterprise Software**: 4 to 8 weeks\n• **AI Chatbots & Integrations**: 2 to 5 weeks\n• **Rapid MVPs & Prototypes**: 2 to 3 weeks\n\nWe provide weekly milestone demonstrations and live staging links throughout the build.",
      actions: [
        { label: 'Our 4-Phase Blueprint ↗', action: 'scroll', value: '#process' },
        { label: 'Book Kickoff Call 💬', action: 'whatsapp', isWa: true }
      ]
    },
    {
      keywords: ['price', 'pricing', 'cost', 'how much', 'budget', 'quote', 'rate', 'fee', 'charges', 'packages'],
      reply: "Because all our builds are tailored to your exact requirements, our pricing is shaped by scope, complexity, and timeline. We offer transparent, milestone-based pricing with zero hidden fees:\n\n• **Starter / MVP Tier**: For high-impact websites & landing pages\n• **Growth / Custom Tier**: For custom CRM software & automated workflows\n• **Enterprise Scale**: For full-stack platforms with AI integration\n\nShare a few details in our project form or on WhatsApp, and we will send a formal proposal within 12 hours!",
      actions: [
        { label: 'Open Project Builder ✍️', action: 'scroll', value: '#contact' },
        { label: 'Quick WhatsApp Quote 💬', action: 'whatsapp', isWa: true }
      ]
    },
    {
      keywords: ['ownership', 'intellectual property', 'ip', 'code', 'license', 'lock-in', 'contract', 'rights'],
      reply: "**You retain 100% intellectual property ownership.** Upon final project completion, all source code, database architectures, and design assets belong entirely to you with zero vendor lock-in.",
      actions: [
        { label: 'Read FAQ Section ↗', action: 'scroll', value: '#faq' }
      ]
    },
    {
      keywords: ['contact', 'email', 'phone', 'whatsapp', 'call', 'address', 'location', 'office', 'where are you', 'odisha', 'angul'],
      reply: "Direct founder communication channels:\n\n• **Email**: aandatechconsultancy@gmail.com\n• **Call / WhatsApp**: +91 76069 15439\n• **Studio Hub**: Balaramprasad, Angul, Odisha, India – 759128\n\nWe guarantee a direct founder response within 12 business hours!",
      actions: [
        { label: 'Chat on WhatsApp 💬', action: 'whatsapp', isWa: true },
        { label: 'Fill Inquiry Form ✍️', action: 'scroll', value: '#contact' }
      ]
    },
    {
      keywords: ['hire', 'start', 'book', 'collaborate', 'work with you', 'proposal', 'kickoff', 'meet'],
      reply: "We are currently accepting select commissions for this quarter! Let's get started:\n\n1. Use our Project Initiation Suite on this page to share your scope\n2. Message the founders directly on WhatsApp at **+91 76069 15439** for an immediate response.",
      actions: [
        { label: 'Go to Project Form ✍️', action: 'scroll', value: '#contact' },
        { label: 'WhatsApp Instant Brief 💬', action: 'whatsapp', isWa: true }
      ]
    }
  ];

  function findBotReply(userQuery) {
    const q = userQuery.toLowerCase().trim();

    for (const item of knowledgeBase) {
      for (const kw of item.keywords) {
        if (q.includes(kw)) {
          return { reply: item.reply, actions: item.actions || [] };
        }
      }
    }

    return {
      reply: "That sounds like a distinctive and intriguing project requirement! While I am trained on A & A Tech Consultancy's core disciplines, our founders **Asutosh Sahu** and **Ananta Kishore Swain** specialize in solving custom technical puzzles.\n\nWould you like me to connect you with them directly on WhatsApp or prepare a project brief?",
      actions: [
        { label: 'Connect on WhatsApp 💬', action: 'whatsapp', isWa: true },
        { label: 'Fill Project Form ✍️', action: 'scroll', value: '#contact' },
        { label: 'Explore Capabilities ↗', action: 'scroll', value: '#services' }
      ]
    };
  }

  function handleUserSubmit(queryText) {
    const text = queryText || chatInput?.value?.trim();
    if (!text) return;

    if (chatInput) chatInput.value = '';

    // Append user message
    appendMessage('user', text);

    // Show typing indicator
    showTypingIndicator();

    // Natural bot response delay
    const responseDelay = Math.floor(Math.random() * 250) + 400;

    setTimeout(() => {
      removeTypingIndicator();
      const botResponse = findBotReply(text);
      appendMessage('bot', botResponse.reply, botResponse.actions);
    }, responseDelay);
  }

  chatForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    handleUserSubmit();
  });

  // Quick Chips click handler
  chatChips.forEach(chip => {
    chip.addEventListener('click', function () {
      const chipKey = this.getAttribute('data-chip');
      const chipQueries = {
        services: "What services do you offer?",
        cadlab: "Tell me about your CADLAB project",
        timelines: "What is your project timeline?",
        pricing: "How does your pricing work?",
        founders: "Who are the founders?",
        ai: "Can you build AI agents for our business?",
        whatsapp: "I want to chat with the founders on WhatsApp"
      };

      const query = chipQueries[chipKey] || this.textContent.trim();
      handleUserSubmit(query);
    });
  });

  // Reset Conversation
  function initChatConversation() {
    if (!chatMessages) return;
    chatMessages.innerHTML = '';
    appendMessage(
      'bot',
      "Hello! I am the **A & A Tech Digital Assistant** — the direct intelligence layer of our studio. We specialize in bespoke website design, enterprise CRM systems, autonomous AI integrations, and mobile applications.\n\nHow can I help engineer your vision today?",
      [
        { label: '⚡ Explore Capabilities', action: 'scroll', value: '#services' },
        { label: '🚀 CADLAB Case Study', action: 'cadlab' },
        { label: '👤 Meet Founders', action: 'scroll', value: '#founders' },
        { label: '💬 Chat on WhatsApp', action: 'whatsapp', isWa: true }
      ]
    );
  }

  chatResetBtn?.addEventListener('click', initChatConversation);

  // Initialize conversation once on load
  initChatConversation();

})();

