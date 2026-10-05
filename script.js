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

// Close the menu when any navigation link is clicked.
navbarLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    toggleButton.classList.remove("active");
    navbarLinks.classList.remove("active");

    menuBars.forEach((bar) => bar.classList.remove("active"));
  });
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

const swiper = new Swiper(".swiper", {
  direction: "horizontal",

  slidesPerView: "auto",
  slidesPerGroup: 1,
  spaceBetween: 1,

  loop: true,

  loopAddBlankSlides: true,

  speed: 600,
  grabCursor: true,
  watchOverflow: false,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const items = document.querySelectorAll(".accordion button");

function toggleAccordion() {
  const itemToggle = this.getAttribute("aria-expanded");

  for (i = 0; i < items.length; i++) {
    items[i].setAttribute("aria-expanded", "false");
  }

  if (itemToggle == "false") {
    this.setAttribute("aria-expanded", "true");
  }
}

items.forEach((item) => item.addEventListener("click", toggleAccordion));

const track = document.querySelector(".strip-track");

let currentX = 0;
let targetX = 0;
let lastScroll = window.scrollY;
let limit = 0;

function calculateLimit() {
  // Half because the content is duplicated
  limit = track.scrollWidth / 2;
}

calculateLimit();

window.addEventListener("resize", calculateLimit);

window.addEventListener("scroll", () => {
  const delta = window.scrollY - lastScroll;

  // Adjust speed
  targetX -= delta * 0.8;

  lastScroll = window.scrollY;
});

function animate() {
  // Smooth interpolation
  currentX += (targetX - currentX) * 0.08;

  // Infinite loop
  if (currentX <= -limit) {
    currentX += limit;
    targetX += limit;
  }

  if (currentX >= 0) {
    currentX -= limit;
    targetX -= limit;
  }

  track.style.transform = `translate3d(${currentX}px,0,0)`;

  requestAnimationFrame(animate);
}

animate();
