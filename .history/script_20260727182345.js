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

const cards = document.querySelectorAll(".service-card");

function updateCards() {
  cards.forEach((card, index) => {
    const nextCard = cards[index + 1];

    // Keep the last card unchanged
    if (!nextCard) {
      card.style.transform = "scale(1) rotate(0deg)";
      return;
    }

    const nextRect = nextCard.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    /*
      Animation starts only when the next card
      begins entering the viewport.
    */
    const animationStart = viewportHeight;
    const animationEnd = 100;

    let progress =
      (animationStart - nextRect.top) / (animationStart - animationEnd);

    progress = Math.min(Math.max(progress, 0), 1);

    const scale = 1 - progress * 0.08;
    const rotationDirection = index % 2 === 0 ? -1 : 1;
    const rotation = progress * 2 * rotationDirection;

    card.style.transform = `
      scale(${scale})
      rotate(${rotation}deg)
    `;
  });
}

let ticking = false;

function handleScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateCards();
      ticking = false;
    });

    ticking = true;
  }
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("resize", updateCards);

updateCards();
