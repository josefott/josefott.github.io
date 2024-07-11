document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;
  const menu = document.getElementById("menu");
  const menuToggle = document.getElementById("menuToggle");
  const navbar = document.getElementById("navbar");

  // Dark mode toggle
  darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", body.classList.contains("dark-mode"));
  });

  // Check for saved dark mode preference
  if (localStorage.getItem("darkMode") === "true") {
    body.classList.add("dark-mode");
  }

  // Smooth scroll function
  function adjustScrollPosition(target) {
    var navbarHeight = navbar ? navbar.offsetHeight : 0;
    var targetOffset = target.offsetTop - navbarHeight;

    window.scrollTo({
      top: targetOffset,
      behavior: "smooth",
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        adjustScrollPosition(targetSection);
      }

      // Close the menu if it's open
      menu.classList.remove("show");
    });
  });

  // Toggle menu
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("show");
  });
});
