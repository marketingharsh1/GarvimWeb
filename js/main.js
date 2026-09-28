// ===================================================================
// GARVIM ENERGY — shared site behaviour
// ===================================================================
(function () {
  "use strict";

  /* ---- Page-enter veil wipe ---- */
  document.body.classList.add("veil-enter");
  window.addEventListener("load", () => {
    setTimeout(() => document.body.classList.remove("veil-enter"), 550);
  });

  /* ---- Intercept internal link clicks for a tap/page-wipe transition ---- */
  function isInternalNav(a) {
    if (!a || !a.href) return false;
    if (a.target === "_blank" || a.hasAttribute("download")) return false;
    if (a.hostname !== window.location.hostname) return false;
    if (a.getAttribute("href").startsWith("#")) return false;
    return true;
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!isInternalNav(a)) return;
    e.preventDefault();
    const dest = a.href;
    const veil = document.getElementById("page-veil");
    if (veil) {
      veil.classList.add("leaving");
      setTimeout(() => { window.location.href = dest; }, 380);
    } else {
      window.location.href = dest;
    }
  });

  /* ---- Light / dark theme toggle ---- */
  const themeBtn = document.querySelector(".theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const root = document.documentElement;
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("garvim-theme", next); } catch (e) {}
    });
  }

  /* ---- Mobile nav toggle ---- */
  const burger = document.querySelector(".burger");
  const nav = document.querySelector("nav.primary");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("open");
      nav.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        burger.classList.remove("open");
        nav.classList.remove("open");
      })
    );
  }

  /* ---- Active nav link ---- */
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav.primary a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });

  /* ---- Header hide on scroll down / show on scroll up ---- */
  const header = document.querySelector("header.site");
  let lastY = window.scrollY;
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (header) {
      if (y > lastY && y > 140) header.classList.add("hide");
      else header.classList.remove("hide");
    }
    lastY = y;
  }, { passive: true });

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll(".reveal, .reveal-stagger");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ---- Button tap ripple ---- */
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
      ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---- Contact form (Formspree/Web3Forms-ready) ---- */
  const form = document.querySelector("form.contact-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      const status = form.querySelector(".form-status");
      const keyField = form.querySelector('input[name="access_key"]');
      if (keyField && keyField.value.includes("YOUR_WEB3FORMS_ACCESS_KEY")) {
        e.preventDefault();
        if (status) status.textContent = "Add your free Web3Forms access key — see the README.";
        return;
      }
      e.preventDefault();
      const btn = form.querySelector("button[type=submit]");
      const original = btn.textContent;
      btn.textContent = "Sending…";
      btn.disabled = true;
      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          form.reset();
          if (status) { status.textContent = "Thanks — we'll get back to you shortly."; status.style.color = "#2f4a2f"; }
        } else {
          if (status) { status.textContent = "Something went wrong. Please try again or call us directly."; status.style.color = "#a33"; }
        }
      } catch (err) {
        if (status) { status.textContent = "Network error — please try again or call us directly."; status.style.color = "#a33"; }
      }
      btn.textContent = original;
      btn.disabled = false;
    });
  }
})();
