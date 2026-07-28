const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

const toggleButton = document.getElementById("toggle_button");
const navbarLinks = document.querySelector(".nav-list");
const menuBars = document.querySelectorAll(".bar");

toggleButton.addEventListener("click", () => {
  toggleButton.classList.toggle("active");
  navbarLinks.classList.toggle("active");

  menuBars.forEach((bar) => bar.classList.toggle("active"));
});

const cards = document.querySelectorAll(".sticky-card");

function animateCards() {
  const viewportHeight = window.innerHeight;

  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();

    const start = viewportHeight;
    const end = 100;

    let progress = (start - rect.top) / (start - end);
    progress = Math.min(Math.max(progress, 0), 1);

    const scale = 1 - progress * 0.08;
    const rotate = progress * (index % 2 === 0 ? -3 : 3);

    card.style.transform = `
      scale(${scale})
      rotate(${rotate}deg)
    `;
  });

  requestAnimationFrame(animateCards);
}

requestAnimationFrame(animateCards);
