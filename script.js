/* Kaustov Gogoi Portfolio — main JavaScript */

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");
  const year = document.getElementById("year");

  // Automatically update the copyright year
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Mobile navigation
  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("is-open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
    });

    // Close menu after clicking a navigation link
    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      history.pushState(null, "", targetId);
    });
  });

  // Scroll reveal animation
  const revealItems = document.querySelectorAll(
    ".section-heading, .about-grid, .venture-card, .interest-card, .contact-card"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealItems.forEach((item) => {
      item.classList.add("reveal");
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => {
      item.classList.add("revealed");
    });
  }
});
