/* ==========================================================================
   LuminaForge — Interactions & rendering
   Renders content from data.js, wires nav, reveal, image fallbacks and form.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Inline icon set (stroke SVG, no emoji) ---------- */
  var ICONS = {
    layout: '<path d="M3 4.5h18v15H3z"/><path d="M3 9h18M9 9v10.5"/>',
    code: '<path d="M8 6 3 12l5 6M16 6l5 6-5 6"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
    user: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.5"/>',
    gauge: '<path d="M4 18a8 8 0 1 1 16 0"/><path d="M12 18l4-5"/>',
    chat: '<path d="M4 5h16v11H9l-4 3.5V16H4z"/>',
    mail: '<path d="M3 6h18v12H3z"/><path d="m3 7 9 6 9-6"/>',
    whatsapp: '<path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.6-1.2A9 9 0 1 0 12 3Z"/><path d="M8.5 8.8c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.5s.7 1.7.7 1.8-.1.3-.2.4l-.4.5c-.1.1-.2.3-.1.5s.5.9 1.1 1.4c.8.7 1.4.9 1.6 1s.3 0 .4-.1l.6-.7c.2-.2.3-.2.5-.1s1.3.6 1.5.8.4.2.4.3 0 .8-.3 1.2c-.3.4-1.1.8-1.5.8-.8.1-1.5 0-3.3-.9-2.2-1.1-3.5-3.4-3.6-3.6s-.8-1.1-.8-2.1.5-1.5.7-1.7Z" fill="currentColor" stroke="none"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    external: '<path d="M14 5h5v5M19 5l-8 8"/><path d="M19 13.5V19H5V5h5.5"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    location: '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
  };
  function icon(name) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function initial(name) { return esc((name || "?").trim().charAt(0).toUpperCase()); }
  var $ = function (s, r) { return (r || document).querySelector(s); };

  /* ---------- Placeholder figure (used when a screenshot is missing) ---------- */
  function placeholder(name) {
    return '<div class="ph-figure" role="img" aria-label="' + esc(name) + ' preview — screenshot coming soon">' +
      '<div><div class="initial">' + initial(name) + '</div>' +
      '<div class="hint">Preview coming soon</div></div></div>';
  }

  /* ---------- Render: Projects ---------- */
  function renderProjects() {
    var grid = $("#projects-grid");
    if (!grid) return;
    if (!Array.isArray(PROJECTS) || PROJECTS.length === 0) {
      grid.innerHTML = '<p class="project-status">Selected work is being added here soon.</p>';
      return;
    }
    grid.innerHTML = PROJECTS.map(function (p) {
      var coming = p.status === "comingSoon";
      var media = p.image
        ? '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + ' website preview" loading="lazy" ' +
          'onerror="this.style.display=\'none\';this.insertAdjacentHTML(\'afterend\', window.__phFor(this))" data-name="' + esc(p.name) + '">'
        : placeholder(p.name);

      var badge = coming
        ? '<span class="badge">In progress</span>'
        : '<span class="badge">Live</span>';

      var hoverCta = (!coming && p.liveUrl)
        ? '<a class="hover-cta-link" href="' + esc(p.liveUrl) + '" target="_blank" rel="noopener" aria-label="View ' + esc(p.name) + ' live demo"></a>'
        : "";

      var features = (p.features || []).map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("");

      var actions;
      if (coming) {
        actions =
          '<span class="btn btn-ghost btn-sm" aria-disabled="true">Coming soon</span>';
      } else {
        actions =
          '<a class="btn btn-primary btn-sm" href="' + esc(p.liveUrl || "#") + '" target="_blank" rel="noopener">View Live Demo ' + icon("external") + "</a>" +
          '<a class="btn btn-ghost btn-sm" href="' + esc(p.projectUrl || p.liveUrl || "#") + '" target="_blank" rel="noopener">View Project</a>';
      }

      return (
        '<article class="project-card reveal">' +
          '<div class="project-preview">' + badge + hoverCta + media + '</div>' +
          '<div class="project-body">' +
            '<span class="type">' + esc(p.type) + "</span>" +
            "<h3>" + esc(p.name) + "</h3>" +
            '<p class="desc">' + esc(p.description) + "</p>" +
            (features ? '<ul class="project-features">' + features + "</ul>" : "") +
            '<div class="project-actions">' + actions + "</div>" +
          "</div>" +
        "</article>"
      );
    }).join("");
  }
  // Exposed so inline onerror can build a matching placeholder
  window.__phFor = function (imgEl) { return placeholder(imgEl.getAttribute("data-name")); };

  /* ---------- Render: Services ---------- */
  function renderServices() {
    var grid = $("#services-grid");
    if (!grid || typeof SERVICES === "undefined") return;
    grid.innerHTML = SERVICES.map(function (s) {
      var pts = (s.points || []).map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("");
      return (
        '<article class="service reveal">' +
          '<div class="ic">' + icon(s.icon) + "</div>" +
          "<h3>" + esc(s.title) + "</h3>" +
          "<p>" + esc(s.text) + "</p>" +
          (pts ? "<ul>" + pts + "</ul>" : "") +
        "</article>"
      );
    }).join("");
  }

  /* ---------- Render: Process ---------- */
  function renderProcess() {
    var grid = $("#process-grid");
    if (!grid || typeof PROCESS === "undefined") return;
    grid.innerHTML = PROCESS.map(function (s) {
      return '<article class="step reveal"><h3>' + esc(s.title) + "</h3><p>" + esc(s.text) + "</p></article>";
    }).join("");
  }

  /* ---------- Render: Why ---------- */
  function renderWhy() {
    var grid = $("#why-grid");
    if (!grid || typeof WHY === "undefined") return;
    grid.innerHTML = WHY.map(function (w) {
      return (
        '<article class="why-item reveal">' +
          '<div class="ic">' + icon(w.icon) + "</div>" +
          "<div><h3>" + esc(w.title) + "</h3><p>" + esc(w.text) + "</p></div>" +
        "</article>"
      );
    }).join("");
  }

  /* ---------- Render: Testimonials ---------- */
  function renderTestimonials() {
    var grid = $("#testimonials-grid");
    if (!grid || typeof TESTIMONIALS === "undefined") return;
    if (!TESTIMONIALS.length) {
      grid.innerHTML = '<p class="project-status" style="grid-column:1/-1">Client testimonials will appear here as projects wrap up.</p>';
      return;
    }
    grid.innerHTML = TESTIMONIALS.map(function (t) {
      return (
        '<figure class="quote reveal">' +
          '<div class="mark" aria-hidden="true">&ldquo;</div>' +
          "<blockquote><p>" + esc(t.quote) + "</p></blockquote>" +
          '<figcaption class="who">' +
            '<span class="avatar" aria-hidden="true">' + initial(t.name) + "</span>" +
            "<span><span class=\"n\">" + esc(t.name) + '</span><br><span class="r">' + esc(t.role) + "</span></span>" +
          "</figcaption>" +
        "</figure>"
      );
    }).join("");
  }

  /* ---------- Contact details injection ---------- */
  function renderContact() {
    if (typeof SITE === "undefined") return;
    var mail = $("#c-email");
    if (mail) { mail.textContent = SITE.email; mail.closest("a").href = "mailto:" + SITE.email; }
    var wa = $("#c-whatsapp");
    if (wa) {
      wa.textContent = "+" + SITE.whatsapp.replace(/^\+/, "");
      wa.closest("a").href = "https://wa.me/" + SITE.whatsapp.replace(/[^\d]/g, "");
    }
    var loc = $("#c-location"); if (loc) loc.textContent = SITE.location;
    // Header + hero + footer CTAs to WhatsApp
    document.querySelectorAll("[data-whatsapp]").forEach(function (a) {
      a.href = "https://wa.me/" + SITE.whatsapp.replace(/[^\d]/g, "") + "?text=" +
        encodeURIComponent("Hi Saima — I'd like to talk about a website.");
    });
    document.querySelectorAll("[data-email]").forEach(function (a) { a.href = "mailto:" + SITE.email; });
    document.querySelectorAll("[data-studio]").forEach(function (a) { a.href = SITE.social.studio; });
    document.querySelectorAll("[data-github]").forEach(function (a) { a.href = SITE.social.github; });
    var yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();
  }

  /* ---------- Header scroll state ---------- */
  function initHeader() {
    var header = $("#site-header");
    if (!header) return;
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 12); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile nav ---------- */
  function initNav() {
    var toggle = $("#nav-toggle"), menu = $("#nav-menu");
    if (!toggle || !menu) return;
    function set(open) {
      menu.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.innerHTML = icon(open ? "close" : "menu");
    }
    set(false);
    toggle.addEventListener("click", function () { set(!menu.classList.contains("open")); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
    window.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Contact form: validation + loading/success/error ---------- */
  function initForm() {
    var form = $("#contact-form");
    if (!form) return;
    var status = $("#form-status"), btn = $("#submit-btn"), btnLabel = btn.innerHTML;

    function fail(field, msg) {
      var f = field.closest(".field");
      f.classList.add("invalid");
      var e = f.querySelector(".error"); if (e && msg) e.textContent = msg;
      field.setAttribute("aria-invalid", "true");
    }
    function clear(field) { field.closest(".field").classList.remove("invalid"); field.removeAttribute("aria-invalid"); }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.textContent = ""; status.className = "form-status";
      var name = form.name, email = form.email, message = form.message;
      [name, email, message].forEach(clear);

      var ok = true;
      if (!name.value.trim()) { fail(name, "Please tell me your name."); ok = false; }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value.trim())) { fail(email, "Please enter a valid email."); ok = false; }
      if (message.value.trim().length < 10) { fail(message, "A little more detail helps (10+ characters)."); ok = false; }
      if (!ok) {
        status.textContent = "Please fix the highlighted fields.";
        status.className = "form-status err";
        var firstInvalid = form.querySelector(".field.invalid input, .field.invalid textarea");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Loading state
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner" aria-hidden="true"></span> Sending…';
      status.textContent = "Sending your message…"; status.className = "form-status";

      var payload = { name: name.value.trim(), email: email.value.trim(), message: message.value.trim() };

      function succeed() {
        form.reset();
        status.textContent = "Thanks — your message is on its way. I'll reply within a day or two.";
        status.className = "form-status ok";
        btn.disabled = false; btn.innerHTML = btnLabel;
      }
      function errored() {
        status.className = "form-status err";
        var mail = "mailto:" + SITE.email + "?subject=" + encodeURIComponent("Website enquiry from " + payload.name) +
          "&body=" + encodeURIComponent(payload.message + "\n\n— " + payload.name + " (" + payload.email + ")");
        status.innerHTML = 'Something went wrong sending that. <a href="' + mail + '" style="color:var(--violet);text-decoration:underline">Email me directly instead</a>.';
        btn.disabled = false; btn.innerHTML = btnLabel;
      }

      if (SITE.formEndpoint) {
        fetch(SITE.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        }).then(function (r) { r.ok ? succeed() : errored(); }).catch(errored);
      } else {
        // No backend configured: open the visitor's email client, prefilled.
        var mail = "mailto:" + SITE.email + "?subject=" + encodeURIComponent("Website enquiry from " + payload.name) +
          "&body=" + encodeURIComponent(payload.message + "\n\n— " + payload.name + " (" + payload.email + ")");
        window.location.href = mail;
        setTimeout(succeed, 600);
      }
    });
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    renderContact();
    renderServices();
    renderProjects();
    renderProcess();
    renderWhy();
    renderTestimonials();
    initHeader();
    initNav();
    initForm();
    initReveal();
  });
})();
