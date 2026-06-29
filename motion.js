(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (reducedMotion.matches) {
    document.documentElement.classList.add("reduced-motion");
    return;
  }

  const selectors = [
    ".hero-copy > *",
    ".signal-figure",
    ".status-band > div",
    ".section-heading",
    ".entry",
    ".project-row",
    ".research-body",
    ".skills-list div",
    ".site-footer > div"
  ];

  const targets = [...document.querySelectorAll(selectors.join(","))];

  if (!targets.length) {
    return;
  }

  targets.forEach((target, index) => {
    target.dataset.animate = "";
    target.style.setProperty("--motion-delay", `${Math.min(index * 42, 210)}ms`);
  });

  document.documentElement.classList.add("motion-enabled");

  const reveal = (target) => target.classList.add("is-visible");

  if (!("IntersectionObserver" in window)) {
    targets.forEach(reveal);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.12
    }
  );

  targets.forEach((target) => observer.observe(target));
})();
