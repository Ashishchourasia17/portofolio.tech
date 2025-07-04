document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");
  const skillSection = document.querySelector("#skills");
  const skillBars = document.querySelectorAll(".progress-bar");

  // 🟦 Update navbar active link based on scroll
  function updateActiveNav() {
    let currentSection = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      const target = link.getAttribute("href").replace("#", "");
      link.classList.toggle("active", target === currentSection);
    });
  }

  // 🟦 Smooth scroll & active class on click
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      const sectionID = this.getAttribute("href");
      const section = document.querySelector(sectionID);

      if (section) {
        e.preventDefault(); // prevent default jump
        section.scrollIntoView({ behavior: "smooth" });
      }

      // Optional: manually set active class on click (for instant feedback)
      navLinks.forEach(nav => nav.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // 🟦 Animate skill bars only once when in view
  let skillsAnimated = false;
  function animateSkills() {
    if (skillsAnimated) return;

    const rect = skillSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight - 100) {
      skillBars.forEach(bar => {
        const targetWidth = bar.dataset.width || bar.style.width;
        bar.style.width = "0%";
        setTimeout(() => {
          bar.style.transition = "width 1.2s ease-in-out";
          bar.style.width = targetWidth;
        }, 100);
      });

      skillsAnimated = true;
    }
  }

  // Initial run
  updateActiveNav();
  animateSkills();

  // Event listeners
  window.addEventListener("scroll", () => {
    updateActiveNav();
    animateSkills();
  });
});
